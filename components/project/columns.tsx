"use client";

import { Project } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ArrowUpDown, Paperclip, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProjectAvatar } from "./project-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteTask } from "@/app/actions/task";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type TaskTableItem = {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: Date;
  dueDate: Date;
  assignedTo: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  attachments: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  Project: {
    id: string;
    name: string;
    workspaceId: string;
  };
};

// Function to generate columns based on user access level
export const getColumns = (currentUserAccessLevel?: string): ColumnDef<TaskTableItem>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Task Title <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const title = row.getValue("title");
      return (
        <Link
          href={`/workspace/${row.original.Project.workspaceId}/projects/${row.original.Project.id}/${row.original.id}`}
        >
          <div className="flex items-center gap-2">
            <ProjectAvatar name={title as string} />
            <span className="text-sm font-medium xl:text-base capitalize">
              {title as string}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const status = row.getValue("status") as string;
      const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
          case "todo":
            return "secondary";
          case "in_progress":
            return "default";
          case "completed":
            return "default";
          case "in_review":
            return "outline";
          default:
            return "secondary";
        }
      };

      const getStatusLabel = (status: string) => {
        switch (status.toLowerCase()) {
          case "todo":
            return "To Do";
          case "in_progress":
            return "In Progress";
          case "completed":
            return "Completed";
          case "in_review":
            return "In Review";
          default:
            return status;
        }
      };

      return (
        <Badge variant={status as any}>
          {status === "IN_PROGRESS" ? "In Progress" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const priority = row.getValue("priority") as string;
      const getPriorityVariant = (priority: string) => {
        switch (priority.toLowerCase()) {
          case "low":
            return "secondary";
          case "medium":
            return "default";
          case "high":
            return "destructive";
          case "critical":
            return "destructive";
          default:
            return "secondary";
        }
      };

      const getPriorityLabel = (priority: string) => {
        switch (priority.toLowerCase()) {
          case "low":
            return "Low";
          case "medium":
            return "Medium";
          case "high":
            return "High";
          case "critical":
            return "Critical";
          default:
            return priority;
        }
      };

      return (
        <Badge variant={getPriorityVariant(priority) as any}>
          {getPriorityLabel(priority)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const createdAt = row.getValue("createdAt") as Date;
      return (
        <div className="text-sm">
          {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due Date <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const dueDate = row.getValue("dueDate") as Date;
      const today = new Date();
      const due = new Date(dueDate);
      const isOverdue = due < today;
      const isToday = due.toDateString() === today.toDateString();

      return (
        <div
          className={`text-sm ${
            isOverdue ? "text-red-600" : isToday ? "text-orange-600" : ""
          }`}
        >
          {due.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
          {isToday && <span className="ml-1 text-xs">(Today)</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "assignedTo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Assigned To <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const assignedTo = row.getValue("assignedTo") as any;

      if (!assignedTo) {
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">Unassigned</span>
          </div>
        );
      }

      const initials = assignedTo.name
        ? assignedTo.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
            .toUpperCase()
        : "?";

      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            {assignedTo.image && (
              <AvatarImage src={assignedTo.image} alt={assignedTo.name} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{assignedTo.name}</span>
            <span className="text-xs text-muted-foreground">
              {assignedTo.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "attachments",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Attachments <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const attachments = row.getValue("attachments") as any[];

      if (!attachments || attachments.length === 0) {
        return (
          <div className="flex items-center gap-2">
            <Paperclip className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">None</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4" />
          <Badge variant="secondary">
            {attachments.length}
          </Badge>
        </div>
      );
    },
  },
  // Conditionally include actions column based on access level
  ...(currentUserAccessLevel !== "VIEWER" ? [{
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const task = row.original;

      const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete the task "${task.title}"? This action cannot be undone.`)) {
          return;
        }

        try {
          const result = await deleteTask(task.id, task.Project.id, task.Project.workspaceId);
          if (result.success) {
            toast.success("Task deleted successfully");
            // Refresh the page to update the task list
            window.location.reload();
          } else {
            toast.error(result.error || "Failed to delete task");
          }
        } catch (error) {
          console.error("Error deleting task:", error);
          toast.error("An unexpected error occurred");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/workspace/${task.Project.workspaceId}/projects/${task.Project.id}/${task.id}`}
              >
                Show Task
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600 focus:text-red-600"
            >
              Delete task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  }] : [])
];

// Keep the original columns export for backward compatibility
export const columns: ColumnDef<TaskTableItem>[] = getColumns();

export const myTaskColumns: ColumnDef<TaskTableItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllRowsSelected() ||
          (table.getIsSomeRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        My Task <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const title = row.getValue("title");
      return (
        <Link
          href={`/workspace/${row.original.Project.workspaceId}/projects/${row.original.Project.id}/${row.original.id}`}
        >
          <div className="flex items-center gap-2">
            <ProjectAvatar name={title as string} />
            <div className="flex flex-col">
              <span className="text-sm font-medium xl:text-base capitalize">
                {title as string}
              </span>
              <span className="text-xs text-muted-foreground">
                {row.original.Project.name}
              </span>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status as any}>
          {status === "IN_PROGRESS" ? "In Progress" : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const priority = row.getValue("priority") as string;
      const getPriorityVariant = (priority: string) => {
        switch (priority.toLowerCase()) {
          case "low":
            return "secondary";
          case "medium":
            return "default";
          case "high":
            return "destructive";
          case "critical":
            return "destructive";
          default:
            return "secondary";
        }
      };

      const getPriorityLabel = (priority: string) => {
        switch (priority.toLowerCase()) {
          case "low":
            return "Low";
          case "medium":
            return "Medium";
          case "high":
            return "High";
          case "critical":
            return "Critical";
          default:
            return priority;
        }
      };

      return (
        <Badge variant={getPriorityVariant(priority) as any}>
          {getPriorityLabel(priority)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Due Date <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const dueDate = row.getValue("dueDate") as Date;
      const today = new Date();
      const due = new Date(dueDate);
      const isOverdue = due < today;
      const isToday = due.toDateString() === today.toDateString();

      return (
        <div
          className={`text-sm ${
            isOverdue ? "text-red-600" : isToday ? "text-orange-600" : ""
          }`}
        >
          {due.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          {isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
          {isToday && <span className="ml-1 text-xs">(Today)</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "attachments",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Files <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const attachments = row.getValue("attachments") as any[];

      if (!attachments || attachments.length === 0) {
        return (
          <div className="flex items-center gap-2">
            <Paperclip className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">None</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2">
          <Paperclip className="h-4 w-4" />
          <Badge variant="secondary">
            {attachments.length}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: Row<TaskTableItem> }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                href={`/workspace/${task.Project.workspaceId}/projects/${task.Project.id}/${task.id}`}
              >
                View Task
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              Mark Complete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
