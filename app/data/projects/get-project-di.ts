import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";

export const getProjectById = async (projectId: string) => {
  const { user } = await userRequired();

  const tasks = await db.task.findMany({
    where: {
      projectId,
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Project: {
        select: {
          id: true,
          name: true,
          workspaceId: true,
        },
      },
      attachments: true,
    },
  });
  return { tasks };
};
