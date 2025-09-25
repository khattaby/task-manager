import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";

export const getUserWorkspaces = async () => {
  try {
    const { user } = await userRequired();

    const workspaces = await db.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        about: true,
        country: true,
        industryType: true,
        role: true,
        image: true,
        onboardingCompleted: true,
        createdAt: true,
        updatedAt: true,
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

    // If user doesn't exist in database yet (new user), return default values
    if (!workspaces) {
      return {
        data: {
          id: user?.id,
          name: user?.given_name && user?.family_name ? `${user.given_name} ${user.family_name}` : null,
          email: user?.email,
          about: null,
          country: null,
          industryType: null,
          role: null,
          image: user?.picture || null,
          onboardingCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          workspaces: [],
        },
      };
    }

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
