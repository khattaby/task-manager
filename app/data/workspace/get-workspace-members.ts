import { db } from "@/lib/db";
import { userRequired } from "../user/is-authenticated";

export const getWorkspaceMembers = async (workspaceId: string) => {
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

    // Fetch workspace members with user details
    const members = await db.workspaceMember.findMany({
      where: { workspaceId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            country: true,
            createdAt: true,
          }
        },
        Workspace: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    // Get workspace information
    const workspace = await db.workspace.findUnique({
      where: { id: workspaceId },
      select: {
        name: true,
        description: true,
      }
    });

    return {
      success: true,
      data: {
        members,
        workspaceName: workspace?.name || "Workspace",
        workspaceDescription: workspace?.description,
        totalMembers: members.length,
        currentUserAccessLevel: isUserMember.accessLevel,
      }
    };

  } catch (error) {
    console.error("Error fetching workspace members:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch workspace members",
      data: {
        members: [],
        workspaceName: "Workspace",
        workspaceDescription: null,
        totalMembers: 0,
        currentUserAccessLevel: null,
      }
    };
  }
};