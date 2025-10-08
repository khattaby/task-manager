import { getWorkspaceMembers } from "@/app/data/workspace/get-workspace-members";
import MembersList from "@/components/workspace/members-list";
import RolePermissionsCard from "@/components/workspace/role-permissions-card";

interface MembersPageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function MembersPage({ params }: MembersPageProps) {
  const { workspaceId } = await params;

  // Fetch workspace members
  const membersData = await getWorkspaceMembers(workspaceId);

  // Handle error case
  if (!membersData.success) {
    return (
      <div className="flex flex-col space-y-8 p-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground text-red-600">
            {membersData.error || "Failed to load workspace members"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 p-8">
      {/* Members Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
        <p className="text-muted-foreground">
          Manage workspace members and their permissions
        </p>
      </div>

      {/* Role Permissions Card */}
      <RolePermissionsCard />

      {/* Members List */}
      <MembersList 
        members={membersData.data.members} 
        workspaceId={workspaceId}
        currentUserAccessLevel={membersData.data.currentUserAccessLevel}
      />
    </div>
  );
}