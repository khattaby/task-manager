import { getUserWorkspaces } from "@/app/data/workspace/get-user-workspaces";
import { Navbar } from "@/components/navbar";
import { AppSidebarContainer } from "@/components/sidebar/app-sidebar-container";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

  // ✅ redirect logic refined
  if (data?.onboardingCompleted && (!data?.workspaces || data.workspaces.length === 0)) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider>
      <div className="w-full flex bg-background h-screen">
        {/* ✅ sidebar container that reads open/close state from provider */}
        <AppSidebarContainer data={data as any} workspaceId={workspaceId} />

        {/* ✅ main area */}
        <main className="w-full overflow-y-auto min-h-screen">
          <div className="flex items-start">
            {/* ✅ toggle button connected to provider */}
            <SidebarTrigger className="pt-3" />
            <Navbar
              id={data?.id || ""}
              name={data?.name || ""}
              email={data?.email || ""}
              image={data?.image || ""}
            />
          </div>

          <div className="p-0 md:p-4 pt-2">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default WorkspaceIdLayout;
