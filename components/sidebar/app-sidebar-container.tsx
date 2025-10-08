import { getWorkspaceProjectByWorkspaceId } from "@/app/data/projects/get-workspace-projects";
import { getUserById } from "@/app/data/user/get-user";
import { AccessLevel, User } from "@prisma/client";
import { AppSidebar } from "./app-sidebar";
import { ProjectProps, workspaceMembersProps } from "@/utils/types";

export interface AppSidebarDataProps extends User {
  workspaces: {
    id: string;
    name: string;
    createdAt: Date;
    userId: string;
    workspaceId: string;
    accessLevel: AccessLevel;
    Workspace: { name: string };
  }[];
}

export const AppSidebarContainer = async ({
  data,
  workspaceId,
}: {
  data: AppSidebarDataProps;
  workspaceId: string;
}) => {
  const { projects, workspaceMembers, currentUserAccessLevel } =
    await getWorkspaceProjectByWorkspaceId(workspaceId);
  const user = await getUserById();

  return (
    <AppSidebar
      data={data}
      projects={projects as ProjectProps[]}
      workspaceMembers={workspaceMembers as workspaceMembersProps[]}
      user={user as User}
      currentUserAccessLevel={currentUserAccessLevel}
    />
  );
};
