"use server";

import { CreateWorkspaceDataType } from "@/components/workspace/create-workspace-form";
import { userRequired } from "../data/user/is-authenticated";
import { workspaceSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { generateInviteCode } from "@/utils/get-invite-code";

export const createNewWorkspace = async (data: CreateWorkspaceDataType) => {
  try {
    const { user } = await userRequired();

    if (!user?.id) {
      throw new Error("User ID is required");
    }

    const validatedData = workspaceSchema.parse(data);

    const res = await db.workspace.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        ownerId: user.id,
        inviteCode: generateInviteCode(),
        members: {
          create: {
            userId: user.id,
            accessLevel: "OWNER",
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Failed to create workspace",
    };
  }
};

export const updateWorkspace = async (
  workspaceId: string,
  data: CreateWorkspaceDataType
) => {
  try {
    const { user } = await userRequired();

    if (!user?.id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const validatedData = workspaceSchema.parse(data);
    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user?.id as string,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      return {
        success: false,
        message: "User is not a member of the workspace",
      };
    }

    await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        name: validatedData.name,
        description: validatedData.description,
      },
    });

    return {
      success: true,
      message: "Workspace updated successfully",
    };
  } catch (error) {
    console.log("Error updating workspace:", error);
    return {
      success: false,
      message: "Failed to update workspace",
    };
  }
};

export const inviteUserToWorkspace = async (
  workspaceId: string,
  email: string
) => {
  try {
    const { user } = await userRequired();

    if (!user?.id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    // Validate email format
    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Please provide a valid email address",
      };
    }

    // Check if the current user is a member of the workspace
    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      return {
        success: false,
        message: "You are not a member of this workspace",
      };
    }

    // Check if user has permission to invite (only OWNER and ADMIN can invite)
    if (isUserMember.accessLevel === "MEMBER") {
      return {
        success: false,
        message: "You don't have permission to invite users to this workspace",
      };
    }

    // Check if the user to be invited exists
    const invitedUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!invitedUser) {
      return {
        success: false,
        message: "User with this email address not found. They need to sign up first.",
      };
    }

    // Check if user is already a member
    const existingMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: invitedUser.id,
          workspaceId,
        },
      },
    });

    if (existingMember) {
      return {
        success: false,
        message: "User is already a member of this workspace",
      };
    }

    // Add user to workspace
    await db.workspaceMember.create({
      data: {
        userId: invitedUser.id,
        workspaceId: workspaceId,
        accessLevel: "MEMBER",
      },
    });

    return {
      success: true,
      message: `Successfully invited ${invitedUser.name || email} to the workspace`,
    };
  } catch (error) {
    console.log("Error inviting user to workspace:", error);
    return {
      success: false,
      message: "Failed to invite user to workspace",
    };
  }
};

export const regenerateInviteCode = async (workspaceId: string) => {
  try {
    const { user } = await userRequired();

    if (!user?.id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    // Check if the current user is a member of the workspace
    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      return {
        success: false,
        message: "You are not a member of this workspace",
      };
    }

    // Check if user has permission to regenerate invite code (only OWNER and ADMIN)
    if (isUserMember.accessLevel === "MEMBER") {
      return {
        success: false,
        message: "You don't have permission to regenerate the invite code",
      };
    }

    // Generate new invite code and update workspace
    const newInviteCode = generateInviteCode();
    await db.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        inviteCode: newInviteCode,
      },
    });

    return {
      success: true,
      message: "Invite code regenerated successfully",
      inviteCode: newInviteCode,
    };
  } catch (error) {
    console.log("Error regenerating invite code:", error);
    return {
      success: false,
      message: "Failed to regenerate invite code",
    };
  }
};

export const updateMemberAccessLevel = async (
  workspaceId: string,
  memberId: string,
  newAccessLevel: "OWNER" | "MEMBER" | "VIEWER"
) => {
  try {
    const { user } = await userRequired();

    if (!user?.id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    // Check if the current user is a member of the workspace
    const currentUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    });

    if (!currentUserMember) {
      return {
        success: false,
        message: "You are not a member of this workspace",
      };
    }

    // Check if user has permission to update member access levels (only OWNER)
    if (currentUserMember.accessLevel !== "OWNER") {
      return {
        success: false,
        message: "Only workspace owners can change member access levels",
      };
    }

    // Get the member to be updated
    const memberToUpdate = await db.workspaceMember.findUnique({
      where: {
        id: memberId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!memberToUpdate) {
      return {
        success: false,
        message: "Member not found",
      };
    }

    // Prevent owner from changing their own access level
    if (memberToUpdate.userId === user.id) {
      return {
        success: false,
        message: "You cannot change your own access level",
      };
    }

    // Update the member's access level
    await db.workspaceMember.update({
      where: {
        id: memberId,
      },
      data: {
        accessLevel: newAccessLevel,
      },
    });

    return {
      success: true,
      message: `Successfully updated ${memberToUpdate.user.name || memberToUpdate.user.email}'s access level to ${newAccessLevel}`,
    };
  } catch (error) {
    console.log("Error updating member access level:", error);
    return {
      success: false,
      message: "Failed to update member access level",
    };
  }
};

export const deleteWorkspace = async (workspaceId: string) => {
  try {
    const { user } = await userRequired();

    if (!user?.id) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    // Check if the current user is a member of the workspace
    const isUserMember = await db.workspaceMember.findUnique({
      where: {
        userId_workspaceId: {
          userId: user.id,
          workspaceId,
        },
      },
    });

    if (!isUserMember) {
      return {
        success: false,
        message: "You are not a member of this workspace",
      };
    }

    // Check if user has permission to delete workspace (only OWNER)
    if (isUserMember.accessLevel !== "OWNER") {
      return {
        success: false,
        message: "Only workspace owners can delete the workspace",
      };
    }

    // Delete workspace and all related data (cascade delete should handle this)
    await db.workspace.delete({
      where: {
        id: workspaceId,
      },
    });

    return {
      success: true,
      message: "Workspace deleted successfully",
    };
  } catch (error) {
    console.log("Error deleting workspace:", error);
    return {
      success: false,
      message: "Failed to delete workspace",
    };
  }
};
