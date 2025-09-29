import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";

export const getMyTasks = async () => {
  const { user } = await userRequired();

  const tasks = await db.task.findMany({
    where: {
      assigneeId: user!.id,
    },
    include: {
      Project: {
        select: {
          id: true,
          name: true,
          workspaceId: true,
        },
      },
      attachments: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return tasks;
};
