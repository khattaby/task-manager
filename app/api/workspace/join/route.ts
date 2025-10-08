import { NextRequest, NextResponse } from "next/server";
import { userRequired } from "@/app/data/user/is-authenticated";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const { user } = await userRequired();
    
    if (!user?.id) {
      return NextResponse.redirect(new URL("/api/auth/login", request.url));
    }

    // Get form data
    const formData = await request.formData();
    const workspaceId = formData.get("workspaceId") as string;
    const inviteCode = formData.get("inviteCode") as string;

    if (!workspaceId || !inviteCode) {
      return NextResponse.json(
        { error: "Missing workspace ID or invite code" },
        { status: 400 }
      );
    }

    // Verify workspace exists and invite code is valid
    const workspace = await db.workspace.findUnique({
      where: {
        id: workspaceId,
        inviteCode: inviteCode,
      },
      select: {
        id: true,
        name: true,
        members: {
          select: {
            userId: true,
          },
        },
        projects: {
          select: {
            id: true,
          },
          take: 1,
        },
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: "Invalid workspace or invite code" },
        { status: 404 }
      );
    }

    // Check if user is already a member
    const existingMember = workspace.members.find(member => member.userId === user.id);
    
    if (existingMember) {
      // User is already a member, redirect to workspace
      return NextResponse.redirect(new URL(`/workspace/${workspaceId}`, request.url));
    }

    // Add user to workspace
    await db.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId: workspaceId,
        accessLevel: "MEMBER",
      },
    });

    // Create activity log for the workspace join
    await db.activity.create({
      data: {
        type: "MEMBER_JOINED",
        description: `${user.given_name || user.email} joined the workspace`,
        projectId: workspace.projects[0]?.id || "", // Use first project or empty string
        userId: user.id,
      },
    });

    // Redirect to the workspace
    return NextResponse.redirect(new URL(`/workspace/${workspaceId}`, request.url));

  } catch (error) {
    console.error("Error joining workspace:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}