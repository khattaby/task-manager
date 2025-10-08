"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Calendar, CheckSquare, Clock, AlertCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Project {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  workspaceId: string;
  tasks?: {
    id: string;
    status: string;
    dueDate: Date | null;
  }[];
  members?: {
    id: string;
    workspaceMember: {
      user: {
        name: string | null;
        email: string;
      };
    };
  }[];
}

interface ProjectsListProps {
  projects: Project[];
  workspaceId: string;
}

const ProjectsList = ({ projects, workspaceId }: ProjectsListProps) => {
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

  const getStatusColor = (completionRate: number, overdueTasks: number) => {
    if (overdueTasks > 0) return "text-red-600";
    if (completionRate === 100) return "text-green-600";
    if (completionRate > 50) return "text-blue-600";
    return "text-yellow-600";
  };

  const getStatusText = (completionRate: number, overdueTasks: number, totalTasks: number) => {
    if (totalTasks === 0) return "No tasks";
    if (overdueTasks > 0) return "Has overdue tasks";
    if (completionRate === 100) return "Completed";
    if (completionRate > 50) return "On track";
    return "Needs attention";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">
            Manage and track your workspace projects
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">No projects yet</h3>
                <p className="text-muted-foreground max-w-sm">
                  This workspace doesn't have any projects yet.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const stats = getProjectStats(project);
            
            return (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="space-y-1">
                    <CardTitle className="text-lg line-clamp-1">
                      <Link 
                        href={`/workspace/${workspaceId}/projects/${project.id}`}
                        className="hover:underline"
                      >
                        {project.name}
                      </Link>
                    </CardTitle>
                    {project.description && (
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    )}
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;