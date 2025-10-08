"use server";

import { ProjectDataType } from "@/components/project/create-project-form";
import { userRequired } from "../data/user/is-authenticated";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/schema";
import { canModifyContent } from "@/utils/access-control";

export const createNewProject = async (data: ProjectDataType) => {
  const { user } = await userRequired();
  const workspace = await db.workspace.findUnique({
    where: {
      id: data.workspaceId as string,
    },
    include: {
      projects: { select: { id: true } },
    },
  });

  const validatedData = projectSchema.parse(data);

  const workspaceMembers = await db.workspaceMember.findMany({
    where: {
      workspaceId: data.workspaceId as string,
    },
  });

  const isUserMember = workspaceMembers.some(
    (member) => member.userId === user?.id
  );

  if (!isUserMember) {
    throw new Error("User is not a member of the workspace");
  }

  // Check if user can modify content (MEMBER or OWNER only)
  const canModify = await canModifyContent(user?.id as string, data.workspaceId as string);
  if (!canModify) {
    throw new Error("Only members and owners can create projects");
  }

  if (!validatedData.memberAccess?.length) {
    validatedData.memberAccess = [user?.id!];
  } else if (!validatedData.memberAccess.includes(user?.id!)) {
    validatedData.memberAccess.push(user?.id!);
  }

  await db.project.create({
    data: {
      name: validatedData.name,
      description: validatedData.description,
      workspaceId: validatedData.workspaceId as string,
      projectAccess: {
        create: validatedData.memberAccess.map((memberId) => ({
          workspaceMemberId: workspaceMembers.find(
            (member) => member.userId === memberId
          )?.id!,
          hasAccess: true,
        })),
      },
      activities: {
        create: {
          type: "PROJECT_CREATED",
          description: `Project ${validatedData.name} created`,
          userId: user?.id!,
        },
      },
    },
  });

  return { success: true };
};

export const postComment = async (
  workspaceId: string,
  projectId: string,
  content: string,
  taskId?: string
) => {
  const { user } = await userRequired();
  const isMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user?.id!,
        workspaceId,
      },
    },
  });

  if (!isMember) {
    throw new Error("User is not a member of the workspace");
  }

  // Check if user can modify content (MEMBER or OWNER only)
  const canModify = await canModifyContent(user?.id as string, workspaceId);
  if (!canModify) {
    throw new Error("Only members and owners can post comments");
  }

  const projectAccess = await db.projectAccess.findUnique({
    where: {
      workspaceMemberId_projectId: {
        workspaceMemberId: isMember.id!,
        projectId,
      },
    },
  });

  if (!projectAccess?.hasAccess) {
    throw new Error("User does not have access to the project");
  }

  const comment = await db.comment.create({
    data: {
      content,
      projectId,
      taskId,
      userId: user?.id!,
    },
  });
};
