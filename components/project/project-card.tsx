import { useProjectId } from "@/hooks/use-project-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { ProjectTasksProps } from "@/utils/types";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Card } from "../ui/card";
import Link from "next/link";
import { ProjectAvatar } from "./project-avatar";
import { Badge } from "../ui/badge";
import { ProfileAvatar } from "../profile-avatar";

interface DataProps {
  ref: (element?: HTMLElement | null) => void;
  task: ProjectTasksProps;
  provided: DraggableProvided;
}

export const ProjectCard = ({ ref, task, provided }: DataProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="mb-2 p-3 bg-white dark:bg-gray-900 shadow-sm"
    >
      <Link
        href={`/workspace/${workspaceId}/projects/${projectId}/tasks/${task.id}`}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {task.title}
        </h3>
      </Link>
      {task.description && (
        <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-2">
          <ProjectAvatar name={(task as any).Project?.name ?? ""} className="!size-6" />
          <p className="text-sm text-muted-foreground">{(task as any).Project?.name ?? ""}</p>
        </div>
        <Badge variant={task.priority} className="text-sm">
          {task.priority}
        </Badge>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {task.assignedTo && (
          <>
            <ProfileAvatar
              url={task.assignedTo?.image || ""}
              name={task.assignedTo?.name || ""}
              className="!size-6"
            />
            <p className="text-sm text-muted-foreground">{task.assignedTo?.name}</p>
          </>
        )}
      </div>
    </Card>
  );
};
