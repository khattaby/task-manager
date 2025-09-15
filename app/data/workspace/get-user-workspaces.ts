import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";

export const getUserWorkspaces = async () => {
  try {
    const { user } = await userRequired();

    const workspaces = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      include: {
        workspaces: {
          select: {
            id: true,
            userId: true,
            workspaceId: true,
            accessLevel: true,
            createdAt: true,
            Workspace: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return { data: workspaces };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
      message: "Field to fetch workspaces",
      status: 500,
    };
  }
};
