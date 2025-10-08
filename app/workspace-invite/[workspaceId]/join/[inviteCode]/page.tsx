import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkspaceAvatar } from "@/components/workspace/workspace-avatar";
import { Users, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface InvitePageProps {
  params: Promise<{
    workspaceId: string;
    inviteCode: string;
  }>;
}

export default async function WorkspaceInvitePage({ params }: InvitePageProps) {
  const { workspaceId, inviteCode } = await params;

  // Check if user is authenticated
  const { isAuthenticated, getUser } = getKindeServerSession();
  
  const isUserAuthenticated = await isAuthenticated();
  
  if (!isUserAuthenticated) {
    // Redirect to login with the current invite URL as post_login_redirect_url
    const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/workspace-invite/${workspaceId}/join/${inviteCode}`;
    redirect(`/api/auth/login?post_login_redirect_url=${encodeURIComponent(currentUrl)}`);
  }
  
  const user = await getUser();
  
  if (!user?.id) {
    const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/workspace-invite/${workspaceId}/join/${inviteCode}`;
    redirect(`/api/auth/login?post_login_redirect_url=${encodeURIComponent(currentUrl)}`);
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
      description: true,
      inviteCode: true,
      members: {
        select: {
          userId: true,
          accessLevel: true,
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
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Invalid Invite</CardTitle>
            <CardDescription>
              This invite link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">
                Go to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is already a member
  const existingMember = workspace.members.find(member => member.userId === user.id);
  
  if (existingMember) {
    // User is already a member, redirect to workspace
    redirect(`/workspace/${workspaceId}`);
  }

  // Check if user exists in our database, if not create them
  let dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // User doesn't exist in our database yet, create them
    try {
      dbUser = await db.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: user.given_name && user.family_name 
            ? `${user.given_name} ${user.family_name}` 
            : user.email!,
          about: null,
          country: null,
          industryType: "Technology", // Default value
          role: "Developer", // Default value
          image: user.picture || "",
          onboardingCompleted: false, // They'll complete onboarding later
          subscription: {
            create: {
              plan: "FREE",
              status: "ACTIVE",
              currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
              cancelAtPeriodEnd: false,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-red-600">Error</CardTitle>
              <CardDescription>
                Something went wrong. Please try again later.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/">
                <Button className="w-full">
                  Go to Home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  try {
    // Automatically add user to workspace
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
  } catch (error) {
    console.error("Error adding user to workspace:", error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>
              Something went wrong. Please try again later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">
                Go to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect to workspace after successful join
  redirect(`/workspace/${workspaceId}`);
}