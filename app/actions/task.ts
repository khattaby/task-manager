"use server";

import { TaskFormValues } from "@/components/task/create-task-dialog";
import { userRequired } from "../data/user/is-authenticated";
import { taskFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { TaskStatus } from "@prisma/client";

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
      },
      include: {
        Project: true,
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
