import { Prisma, TaskStatus } from "@prisma/client";
import { userRequired } from "../user/is-authenticated";
import { db } from "@/lib/db";

export const getProjectDetails = async (
  workspaceId: string,
  projectId: string
) => {
  try {
    const user = await userRequired();
    const [isUserMember, totalWorkspaceMembers] = await Promise.all([
      db.workspaceMember.findUnique({
        where: {
          userId_workspaceId: {
            userId: user.user?.id as string,
            workspaceId,
          },
        },
      }),
      db.workspaceMember.count({
        where: {
          workspaceId,
        },
      }),
    ]);

    if (!isUserMember) {
      return { success: false, error: "User is not a member of the workspace" };
    }
    const [project, comments] = await Promise.all([
      db.project.findUnique({
        where: {
          id: projectId,
        },
        include: {
          projectAccess: {
            include: {
              workspaceMember: {
                select: {
                  id: true,
                  userId: true,
                  workspaceId: true,
                  accessLevel: true,
                  createdAt: true,
                  user: {
                    select: { name: true, id: true, image: true, email: true },
                  },
                },
              },
            },
          },
          tasks: {
            include: {
              assignedTo: {
                select: { name: true, id: true, image: true },
              },
              Project: {
                select: { name: true, id: true },
              },
            },
          },
          activities: {
            include: {
              user: {
                select: { name: true, id: true, image: true },
              },
            },
            orderBy: {
              createdAt: "desc",
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
            select: { name: true, id: true, image: true },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

    const tasks = {
      total: (project as any)?.tasks?.length || 0,
      completed:
        (project as any)?.tasks?.filter(
          (task: any) => task.status === "COMPLETED"
        ).length || 0,
      inProgress:
        (project as any)?.tasks?.filter(
          (task: any) => task.status === "IN_PROGRESS"
        ).length || 0,
      overDue:
        (project as any)?.tasks?.filter(
          (task: any) =>
            task.status !== TaskStatus.COMPLETED &&
            task.dueDate &&
            new Date(task.dueDate) < new Date()
        ).length || 0,
      items: (project as any)?.tasks || [],
    };

    return {
      success: true,
      project: {
        ...project,
        members: (project as any)?.projectAccess?.map(
          (access: any) => ({
            id: access.workspaceMember.id,
            userId: access.workspaceMember.userId,
            workspaceId: access.workspaceMember.workspaceId,
            accessLevel: access.workspaceMember.accessLevel,
            createdAt: access.workspaceMember.createdAt,
            user: access.workspaceMember.user,
          })
        ),
      },
      tasks,
      activities: (project as any)?.activities || [],
      comments,
      totalWorkspaceMembers,
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch project details" };
  }
};
