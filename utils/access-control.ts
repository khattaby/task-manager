import { db } from "@/lib/db";

export type AccessLevel = "OWNER" | "MEMBER" | "VIEWER";

/**
 * Check if a user has the required access level for a workspace
 */
export async function checkWorkspaceAccess(
  userId: string,
  workspaceId: string,
  requiredLevel: AccessLevel
): Promise<{ hasAccess: boolean; userLevel?: AccessLevel }> {
  try {
    const member = await db.workspaceMember.findFirst({
      where: {
        userId,
        workspaceId,
      },
      select: {
        accessLevel: true,
      },
    });

    if (!member) {
      return { hasAccess: false };
    }

    const userLevel = member.accessLevel as AccessLevel;
    const hasAccess = hasRequiredAccess(userLevel, requiredLevel);

    return { hasAccess, userLevel };
  } catch (error) {
    console.error("Error checking workspace access:", error);
    return { hasAccess: false };
  }
}

/**
 * Check if user's access level meets the required level
 * OWNER > MEMBER > VIEWER
 */
function hasRequiredAccess(userLevel: AccessLevel, requiredLevel: AccessLevel): boolean {
  const levels = { OWNER: 3, MEMBER: 2, VIEWER: 1 };
  return levels[userLevel] >= levels[requiredLevel];
}

/**
 * Check if user can modify content (OWNER or MEMBER only)
 */
export async function canModifyContent(userId: string, workspaceId: string): Promise<boolean> {
  const { hasAccess } = await checkWorkspaceAccess(userId, workspaceId, "MEMBER");
  return hasAccess;
}

/**
 * Check if user is workspace owner
 */
export async function isWorkspaceOwner(userId: string, workspaceId: string): Promise<boolean> {
  const { hasAccess } = await checkWorkspaceAccess(userId, workspaceId, "OWNER");
  return hasAccess;
}

/**
 * Get user's access level for a workspace
 */
export async function getUserAccessLevel(userId: string, workspaceId: string): Promise<AccessLevel | null> {
  const { userLevel } = await checkWorkspaceAccess(userId, workspaceId, "VIEWER");
  return userLevel || null;
}