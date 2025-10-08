import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckSquare, 
  AlertCircle,
  Calendar,
  Users
} from "lucide-react";

interface ProjectStatsProps {
  projects: Array<{
    id: string;
    name: string;
    tasks?: {
      id: string;
      status: string;
      dueDate: Date | null;
    }[];
    members?: {
      id: string;
      user: {
        name: string | null;
        email: string;
      };
    }[];
  }>;
}

const ProjectStats = ({ projects }: ProjectStatsProps) => {
  const calculateProjectMetrics = () => {
    const metrics = projects.map(project => {
      const tasks = project.tasks || [];
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
      const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS').length;
      const overdueTasks = tasks.filter(task => 
        task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED'
      ).length;
      
      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      const memberCount = project.members?.length || 0;
      
      return {
        id: project.id,
        name: project.name,
        totalTasks,
        completedTasks,
        inProgressTasks,
        overdueTasks,
        completionRate,
        memberCount
      };
    });

    return metrics;
  };

  const getTopPerformingProjects = () => {
    const metrics = calculateProjectMetrics();
    return metrics
      .filter(project => project.totalTasks > 0)
      .sort((a, b) => b.completionRate - a.completionRate)
      .slice(0, 5);
  };

  const getProjectsNeedingAttention = () => {
    const metrics = calculateProjectMetrics();
    return metrics
      .filter(project => project.overdueTasks > 0 || (project.totalTasks > 0 && project.completionRate < 30))
      .sort((a, b) => b.overdueTasks - a.overdueTasks)
      .slice(0, 5);
  };

  const getMostActiveProjects = () => {
    const metrics = calculateProjectMetrics();
    return metrics
      .filter(project => project.inProgressTasks > 0)
      .sort((a, b) => b.inProgressTasks - a.inProgressTasks)
      .slice(0, 5);
  };

  const topPerforming = getTopPerformingProjects();
  const needingAttention = getProjectsNeedingAttention();
  const mostActive = getMostActiveProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Top Performing Projects */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">Top Performing</CardTitle>
          </div>
          <CardDescription>
            Projects with highest completion rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {topPerforming.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects with tasks yet</p>
          ) : (
            topPerforming.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{project.name}</span>
                  <Badge variant="secondary" className="text-green-600">
                    {project.completionRate}%
                  </Badge>
                </div>
                <Progress value={project.completionRate} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                  <span>{project.memberCount} members</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Projects Needing Attention */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <CardTitle className="text-lg">Needs Attention</CardTitle>
          </div>
          <CardDescription>
            Projects with overdue tasks or low progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {needingAttention.length === 0 ? (
            <p className="text-sm text-muted-foreground">All projects are on track!</p>
          ) : (
            needingAttention.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{project.name}</span>
                  <div className="flex items-center space-x-2">
                    {project.overdueTasks > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {project.overdueTasks} overdue
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-red-600">
                      {project.completionRate}%
                    </Badge>
                  </div>
                </div>
                <Progress value={project.completionRate} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                  <span>{project.memberCount} members</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Most Active Projects */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Most Active</CardTitle>
          </div>
          <CardDescription>
            Projects with most tasks in progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {mostActive.length === 0 ? (
            <p className="text-sm text-muted-foreground">No active projects</p>
          ) : (
            mostActive.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{project.name}</span>
                  <Badge variant="secondary" className="text-blue-600">
                    {project.inProgressTasks} active
                  </Badge>
                </div>
                <Progress value={project.completionRate} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{project.completedTasks}/{project.totalTasks} tasks</span>
                  <span>{project.memberCount} members</span>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStats;