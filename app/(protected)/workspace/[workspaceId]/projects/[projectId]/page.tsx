import { getProjectDetails } from "@/app/data/projects/get-project-details";
import { ProjectDashboard } from "@/components/project/project-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentProps } from "@/utils/types";
import Link from "next/link";
import React from "react";

interface ProjectPageProps {
  params: Promise<{ workspaceId: string; projectId: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const ProjectPage = async (props: ProjectPageProps) => {
  const { workspaceId, projectId } = await props.params;
  const searchParams = await props.searchParams;

  const { project, tasks, activities, comments, totalWorkspaceMembers } =
    await getProjectDetails(workspaceId, projectId);

  return (
    <div className="flex flex-col gap-6 pt-6 pb-3 px-3">
      <Tabs
        defaultValue={(searchParams?.view as string) || "dashboard"}
        className="w-full"
      >
        <TabsList className="mb-4">
          <Link href="?view=dashboard">
            <TabsTrigger value="dashboard" className="px-1.5 md:px-3">
              Dashboard
            </TabsTrigger>
          </Link>
          <Link href="?view=table">
            <TabsTrigger value="table" className="px-1.5 md:px-3">
              Table
            </TabsTrigger>
          </Link>
          <Link href="?view=kanban">
            <TabsTrigger value="kanban" className="px-1.5 md:px-3">
              Kanban
            </TabsTrigger>
          </Link>
        </TabsList>

        <TabsContent value="dashboard">
          <ProjectDashboard
            project={project as any}
            tasks={
              tasks || {
                completed: 0,
                inProgress: 0,
                overDue: 0,
                total: 0,
                items: [],
              }
            }
            activities={activities as any}
            totalWorkspaceMembers={totalWorkspaceMembers || 0}
            comments={comments as any}
          />
        </TabsContent>
        <TabsContent value="table">
          <div>Table View - Coming Soon</div>
        </TabsContent>
        <TabsContent value="kanban">
          <div>Kanban View - Coming Soon</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
