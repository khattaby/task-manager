import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, CheckSquare, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  description: string | null;
  updatedAt: Date;
  workspaceId: string;
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
}

interface RecentProjectsProps {
  projects: Project[];
  workspaceId: string;
}

const RecentProjects = ({ projects, workspaceId }: RecentProjectsProps) => {
  const getProjectStats = (project: Project) => {
    const tasks = project.tasks || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'COMPLETED').length;
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS').length;
    const overdueTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED'
    ).length;
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      overdueTasks,
      completionRate
    };
  };

  const getActivityStatus = (project: Project) => {
    const now = new Date();
    const lastUpdate = new Date(project.updatedAt);
    
    // Check if the date is valid
    if (isNaN(lastUpdate.getTime())) {
      return { status: "Unknown", color: "text-gray-600" };
    }
    
    const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceUpdate === 0) return { status: "Very Active", color: "text-green-600" };
    if (daysSinceUpdate <= 3) return { status: "Active", color: "text-blue-600" };
    if (daysSinceUpdate <= 7) return { status: "Moderate", color: "text-yellow-600" };
    return { status: "Inactive", color: "text-red-600" };
  };

  // Sort projects by most recently updated and take top 6
  const recentProjects = projects
    .filter(project => {
      // Filter out projects with invalid dates
      const date = new Date(project.updatedAt);
      return !isNaN(date.getTime());
    })
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6);

  if (recentProjects.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Recent & Active Projects</CardTitle>
            <CardDescription>
              Projects with recent activity and ongoing work
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/workspace/${workspaceId}/projects`}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => {
            const stats = getProjectStats(project);
            const activity = getActivityStatus(project);
            const memberCount = project.members?.length || 0;
            
            return (
              <div key={project.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium truncate">
                      <Link 
                        href={`/workspace/${workspaceId}/projects/${project.id}`}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </h3>
                    <Badge variant="secondary" className={activity.color}>
                      {activity.status}
                    </Badge>
                  </div>
                  
                  {project.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                      {project.description}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{memberCount} members</span>
                    </div>
                    
                    <div className="flex items-center">
                      <CheckSquare className="h-3 w-3 mr-1 text-green-600" />
                      <span>{stats.completedTasks} done</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-blue-600" />
                      <span>{stats.inProgressTasks} active</span>
                    </div>
                    
                    {stats.overdueTasks > 0 && (
                      <div className="flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1 text-red-600" />
                        <span className="text-red-600">{stats.overdueTasks} overdue</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <span>Updated {
                        (() => {
                          const date = new Date(project.updatedAt);
                          return isNaN(date.getTime()) 
                            ? "Unknown" 
                            : formatDistanceToNow(date, { addSuffix: true });
                        })()
                      }</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2 min-w-0">
                  <div className="text-sm font-medium">
                    {stats.completionRate}%
                  </div>
                  <Progress value={stats.completionRate} className="w-20 h-2" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentProjects;