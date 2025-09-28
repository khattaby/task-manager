"use client";

import { ProjectProps, workspaceMembersProps } from "@/utils/types";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CreateWorkspaceForm from "../workspace/create-workspace-form";
import { CreateProjectForm } from "../project/create-project-form";

export const NavProjects = ({
  projects,
  workspaceMembers,
}: {
  projects: ProjectProps[];
  workspaceMembers: workspaceMembersProps[];
}) => {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="flex justify-between">
          <span className="text-sm font-semibold text-muted-foreground uppercase">
            Projects
          </span>

          <CreateProjectForm workspaceMembers={workspaceMembers} />
        </SidebarGroupLabel>
        <SidebarMenu>
          {projects?.map((proj) => {
            const href = `/workspace/${proj.workspaceId}/projects/${proj.id}`;
            return (
              <SidebarMenuItem key={proj.id}>
                <SidebarMenuButton>
                  <a
                    href={href}
                    className={
                      isClient && pathname === href
                        ? "text-blue-500 font-semibold"
                        : "text-muted-foreground "
                    }
                  >
                    {proj.name}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};
