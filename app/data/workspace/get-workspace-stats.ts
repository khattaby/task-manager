import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";
import { TaskStatus } from "@prisma/client";

export const getWorkspaceStats = async (workspaceId: string) => {
  try {
    const { user } = await userRequired();
    
    // Check user membership in the workspace
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

    // Fetch workspace statistics
    const [
      totalProjects,
      totalMembers,
      allTasks,
      workspace
    ] = await Promise.all([
      // Number of projects
      db.project.count({
        where: { workspaceId }
      }),
      
      // Number of members
      db.workspaceMember.count({
        where: { workspaceId }
      }),
      
      // All tasks in the workspace
      db.task.findMany({
        where: {
          Project: {
            workspaceId
          }
        },
        select: {
          status: true,
          dueDate: true
        }
      }),
      
      // Workspace information
      db.workspace.findUnique({
        where: { id: workspaceId },
        select: { name: true }
      })
    ]);

    // Calculate task statistics
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(task => task.status === TaskStatus.COMPLETED).length;
    const inProgressTasks = allTasks.filter(task => task.status === TaskStatus.IN_PROGRESS).length;
    
    // Calculate overdue tasks
    const now = new Date();
    const overdueTasks = allTasks.filter(task => 
      task.status !== TaskStatus.COMPLETED && 
      task.dueDate && 
      new Date(task.dueDate) < now
    ).length;

    return {
      success: true,
      data: {
        workspaceName: workspace?.name || "Workspace",
        workspaceStats: {
          totalProjects,
          totalMembers,
          totalTasks,
          completedTasks,
          inProgressTasks,
          overdueTasks
        }
      }
    };
  } catch (error) {
    console.log("Error fetching workspace stats:", error);
    return {
      success: false,
      error: "Failed to fetch workspace statistics",
      data: {
        workspaceName: "Workspace",
        workspaceStats: {
          totalProjects: 0,
          totalMembers: 0,
          totalTasks: 0,
          completedTasks: 0,
          inProgressTasks: 0,
          overdueTasks: 0
        }
      }
    };
  }
};