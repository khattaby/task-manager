import { User } from "@prisma/client";
import { AppSidebarDataProps } from "./app-sidebar-container";
import { ProjectProps, workspaceMembersProps } from "@/utils/types";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { WorkspaceSelector } from "./workspace-selector";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-project-list";

export const AppSidebar = ({
  data,
  projects,
  workspaceMembers,
  user,
}: {
  data: AppSidebarDataProps;
  projects: ProjectProps[];
  workspaceMembers: workspaceMembersProps[];
  user: User;
}) => {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="bg-background">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={"/fix-svgrepo-com.svg"} />
            </Avatar>
            <SidebarGroupLabel>
              <span className="text-xl font-bold">DailyTM</span>
            </SidebarGroupLabel>
          </div>
          <div className="flex justify-between mb-0">
            <SidebarGroupLabel className="mb-2 text-sm font-semibold text-muted-foreground uppercase">
              Workspace
            </SidebarGroupLabel>
            <Button asChild size={"icon"} className="size-5">
              <Link href="/create-workspace">
                <Plus />
              </Link>
            </Button>
          </div>
          <WorkspaceSelector workspaces={data.workspaces} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain />
          <NavProjects projects={projects} workspaceMembers={workspaceMembers} />
        </SidebarContent>
      </Sidebar>
    </>
  );
};
