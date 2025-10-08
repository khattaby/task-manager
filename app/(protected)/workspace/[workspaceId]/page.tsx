import { getWorkspaceStats } from "@/app/data/workspace/get-workspace-stats";
import { getWorkspaceProjectByWorkspaceId } from "@/app/data/projects/get-workspace-projects";
import ProjectsList from "@/components/workspace/projects-list";

interface WorkspacePageProps {
  params: Promise<{
    workspaceId: string;
  }>;
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspaceId } = await params;

  // Fetch workspace data in parallel
  const [workspaceStatsResult, projectsData] = await Promise.all([
    getWorkspaceStats(workspaceId),
    getWorkspaceProjectByWorkspaceId(workspaceId),
  ]);

  // Extract workspace stats and name from the result
  const workspaceStats = workspaceStatsResult.data.workspaceStats;
  const workspaceName = workspaceStatsResult.data.workspaceName;

  return (
    <div className="flex flex-col space-y-8 p-8">
      {/* Workspace Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to {workspaceName}</h1>
          <p className="text-muted-foreground">
            Great to have you here! Manage your projects and track progress in your workspace.
          </p>
        </div>
      </div>

      {/* Projects List */}
      <ProjectsList 
        projects={projectsData.projects} 
        workspaceId={workspaceId}
      />
    </div>
  );
}