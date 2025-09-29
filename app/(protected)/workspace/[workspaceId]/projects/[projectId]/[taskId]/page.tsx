import { getTaskById } from "@/app/data/task/get-task-by-id";
import { userRequired } from "@/app/data/user/is-authenticated";
import { TaskComment } from "@/components/task/task-comment";
import { TaskDetails } from "@/components/task/task-details";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    taskId: string;
    workspaceId: string;
    projectId: string;
  };
}

const TaskIdPage = async ({ params }: PageProps) => {
  await userRequired();
  const { taskId, workspaceId, projectId } = await params;

  const { task, comment } = await getTaskById(taskId, workspaceId, projectId);

  if (!task) {
    redirect("/not-found");
  }
  return (
    <div className="flex flex-col lg:flex-row gap-6 vmd:px-6 pb-6">
      <div className="flex-1">
        <TaskDetails task={task as any} />
      </div>
      <div className="w-full lg:w-[400px]">
        <TaskComment taskId={taskId} comments={comment as any} />
      </div>
    </div>
  );
};

export default TaskIdPage;
