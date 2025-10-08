"use client";

import { ProjectProps, workspaceMembersProps } from "@/utils/types";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { CreateProjectForm } from "../project/create-project-form";
import Link from "next/link";
import { useParams } from "next/navigation";

export const NavProjects = ({
  projects,
  workspaceMembers,
  currentUserAccessLevel,
}: {
  projects: ProjectProps[];
  workspaceMembers: workspaceMembersProps[];
  currentUserAccessLevel?: string;
}) => {
  const { workspaceId } = useParams();
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between">
        Projects
        {currentUserAccessLevel !== "VIEWER" && (
          <CreateProjectForm workspaceMembers={workspaceMembers} />
        )}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton asChild>
                <Link href={`/workspace/${workspaceId}/projects/${project.id}`}>
                  {project.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
