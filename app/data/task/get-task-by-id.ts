import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";
import { includes } from "zod";

export const getTaskById = async (
  taskId: string,
  workspaceId: string,
  projectId: string
) => {
  const { user } = await userRequired();
  
  const isUserMember = await db.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: user!.id,
        workspaceId,
      },
    },
  });
  
  if (!isUserMember) {
    throw new Error("User is not a member of the workspace");
  }

  const projectAccess = await db.projectAccess.findUnique({
    where: {
      workspaceMemberId_projectId: {
        workspaceMemberId: isUserMember.id,
        projectId,
      },
    },
  });
  
  if (!projectAccess) {
    throw new Error("User does not have access to the project");
  }

  const [task, comment] = await Promise.all([
    db.task.findUnique({
      where: {
        id: taskId,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        attachments: {
          select: {
            id: true,
            name: true,
            url: true,
          },
        },
        Project: {
          include: {
            projectAccess: {
              include: {
                workspaceMember: {
                  include: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        image: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }),
    db.comment.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
  ]);
  
  const project = {
    ...task?.Project,
    members: task?.Project.projectAccess.map(
      (access) => access.workspaceMember
    ),
  };

  return {
    task: {
      ...task,
      project,
    },
    project,
    comment,
  };
};
