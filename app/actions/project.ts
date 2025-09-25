"use server";

import { ProjectDataType } from "@/components/project/create-project-form";
import { userRequired } from "../data/user/is-authenticated";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/schema";

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
