"use server";

import { TaskFormValues } from "@/components/task/create-task-dialog";
import { userRequired } from "../data/user/is-authenticated";
import { taskFormSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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

    // Revalidate the project page to update the task distribution chart
    revalidatePath(`/workspace/${workspaceId}/projects/${projectId}`);

    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task" };
  }
};
