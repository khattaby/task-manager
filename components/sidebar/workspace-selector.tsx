"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { WorkspaceProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WorkspaceAvatar } from "../workspace/workspace-avatar";
import { Check, ChevronsUpDown } from "lucide-react";

export const WorkspaceSelector = ({
  workspaces,
}: {
  workspaces: WorkspaceProps[];
}) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const [selectedWorkspace, setSelectedWorkspace] = useState<
    WorkspaceProps | undefined
  >(undefined);
  const [isClient, setIsClient] = useState(false);

  const onSelect = (id: string) => {
    setSelectedWorkspace(workspaces.find((workspace) => workspace.id === id));
    router.push(`/workspace/${id}`);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (workspaceId && workspaces) {
      setSelectedWorkspace(
        workspaces.find((workspace) => workspace.id === workspaceId)
      );
    }
  }, [workspaceId, workspaces]);

  if (!isClient) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div className="size-6 2xl:size-8 rounded-md bg-gray-200 animate-pulse" />
            <div className="font-semibold">Loading...</div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <WorkspaceAvatar
                  name={selectedWorkspace?.Workspace?.name}
                ></WorkspaceAvatar>
                <div className="font-semibold">
                  {selectedWorkspace?.Workspace?.name}
                </div>
                <ChevronsUpDown className="ml-auto"></ChevronsUpDown>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-[--radix-dropdown-menu-trigger-width]"
            >
              {workspaces?.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onSelect={() => onSelect(workspace.workspaceId)}
                >
                  <div className="flex flex-row items-center">
                    <WorkspaceAvatar
                      name={workspace?.Workspace?.name as string}
                    />
                    <p>{workspace?.Workspace?.name}</p>
                  </div>
                  {workspace.workspaceId === workspaceId && (
                    <Check className="ml-auto" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};
