import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
  params: Promise<{
    workspaceId: string;
  }>;
}

const WorkspaceIdLayout = async ({ children, params }: Props) => {
  const { data } = await getUserWorkspaces();
  const { workspaceId } = await params;

  if (data?.onboardingCompleted && !data?.workspaces) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }
  return <SidebarProvider>WorkspaceIdLayout</SidebarProvider>;
};

export default WorkspaceIdLayout;
