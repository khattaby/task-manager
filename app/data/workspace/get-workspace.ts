import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";

export const getWorkspaceById = async (workspaceId: string) => {
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
    throw new Error("User is not a member of the workspace");
  }

  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    include: {
      members: {
        select: {
          userId: true,
          accessLevel: true,
        },
      },
    },
  });

  return {
    data: workspace,
    currentUserAccessLevel: isUserMember.accessLevel
  };
};
