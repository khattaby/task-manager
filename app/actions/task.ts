"use server";

import { TaskFormValues } from "@/components/task/create-task-dialog";
import { userRequired } from "../data/user/is-authenticated";
import { taskFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { TaskStatus } from "@prisma/client";
import { canModifyContent } from "@/utils/access-control";

export const createNewTask = async (
  data: TaskFormValues,
  projectId: string,
  workspaceId: string
) => {
  try {
    const { user } = await userRequired();
    const validatedData = taskFormSchema.parse(data);

    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user?.id as string,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      return { success: false, error: "User is not a member of the workspace" };
    }

    // Check if user can modify content (MEMBER or OWNER only)
    const canModify = await canModifyContent(user?.id as string, workspaceId);
    if (!canModify) {
      return { success: false, error: "Only members and owners can create tasks" };
    }

    const tasks = await db.task.findMany({
      where: {
        projectId,
      },
    });

    // Calculate position for the new task
    const lastTask = tasks
      ?.filter((task) => task.status === data.status)
      .sort(
        (a: { position: number }, b: { position: number }) =>
          b.position - a.position
      )[0];

    const position = lastTask ? lastTask.position + 1000 : 1000;

    const task = await db.task.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        startDate: validatedData.startDate,
        dueDate: validatedData.dueDate,
        projectId: projectId,
        assigneeId: validatedData.assignees || null,
        status: validatedData.status,
        priority: validatedData.priority,
        position,
        attachments: validatedData.attachments ? {
          create: validatedData.attachments.map((attachment) => ({
            name: attachment.name,
            url: attachment.url,
            type: attachment.type,
          }))
        } : undefined,
      },
      include: {
        Project: true,
        attachments: true,
      },
    });

    await db.activity.create({
      data: {
        type: "TASK_CREATED",
        description: `Created task ${validatedData.title}`,
        projectId: projectId,
        userId: user?.id as string,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task" };
  }
};

export const deleteTask = async (taskId: string, projectId: string, workspaceId: string) => {
  try {
    const { user } = await userRequired();

    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user?.id as string,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      return { success: false, error: "User is not a member of the workspace" };
    }

    // Check if user can modify content (MEMBER or OWNER only)
    const canModify = await canModifyContent(user?.id as string, workspaceId);
    if (!canModify) {
      return { success: false, error: "Only members and owners can delete tasks" };
    }

    const projectAccess = await db.projectAccess.findUnique({
      where: {
        workspaceMemberId_projectId: {
          workspaceMemberId: isUserMember.id,
          projectId,
        },
      },
    });

    if (!projectAccess?.hasAccess) {
      return {
        success: false,
        error: "User does not have access to the project",
      };
    }

    // Get task details before deletion for activity log
    const task = await db.task.findUnique({
      where: { id: taskId },
      select: { title: true },
    });

    if (!task) {
      return { success: false, error: "Task not found" };
    }

    // Delete the task (this will cascade delete attachments and comments)
    await db.task.delete({
      where: { id: taskId },
    });

    // Create activity log
    await db.activity.create({
      data: {
        type: "TASK_DELETED",
        description: `Deleted task ${task.title}`,
        projectId: projectId,
        userId: user?.id as string,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: "Failed to delete task" };
  }
};

export const updateTaskPosition = async (
  taskId: string,
  newPosition: number,
  newStatus: TaskStatus
) => {
  await userRequired();

  try {
    return await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        position: newPosition,
        status: newStatus,
      },
    });
  } catch (error) {
    console.error("Error updating task position:", error);
    throw error;
  }
};
export const updateTask = async (
  taskId: string,
  data: TaskFormValues,
  projectId: string,
  workspaceId: string
) => {
  try {
    const { user } = await userRequired();
    const validatedData = taskFormSchema.parse(data);

    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user?.id as string,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      return { success: false, error: "User is not a member of the workspace" };
    }

    // Check if user can modify content (MEMBER or OWNER only)
    const canModify = await canModifyContent(user?.id as string, workspaceId);
    if (!canModify) {
      return { success: false, error: "Only members and owners can edit tasks" };
    }

    const projectAccess = await db.projectAccess.findUnique({
      where: {
        workspaceMemberId_projectId: {
          workspaceMemberId: isUserMember.id,
          projectId,
        },
      },
    });

    if (!projectAccess?.hasAccess) {
      return {
        success: false,
        error: "User does not have access to the project",
      };
    }

    const task = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        startDate: validatedData.startDate,
        dueDate: validatedData.dueDate,
        assigneeId: validatedData.assignees || null,
        status: validatedData.status,
        priority: validatedData.priority,
      },
      include: {
        attachments: true,
      },
    });

    // Handle attachments separately
    if (validatedData.attachments) {
      // Delete existing attachments
      await db.file.deleteMany({
        where: {
          taskId: taskId,
        },
      });

      // Create new attachments
      if (validatedData.attachments.length > 0) {
        await db.file.createMany({
          data: validatedData.attachments.map((attachment) => ({
            name: attachment.name,
            url: attachment.url,
            type: attachment.type,
            taskId: taskId,
          })),
        });
      }
    }

    await db.activity.create({
      data: {
        type: "TASK_UPDATED",
        description: `Updated task ${validatedData.title}`,
        projectId: projectId,
        userId: user?.id as string,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task" };
  }
};
