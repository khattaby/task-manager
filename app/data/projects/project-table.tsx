"use client";

import { DataTable } from "@/components/data-table";
import { columns, getColumns } from "@/components/project/columns";
import { File, Project, Task, User } from "@prisma/client";

export interface TaskProps extends Omit<Task, "projectId"> {
  assignedTo?: User;
  projectId: Project;
  attachedTo?: File[];
}

export const ProjectTable = ({ 
  tasks, 
  currentUserAccessLevel 
}: { 
  tasks: TaskProps[];
  currentUserAccessLevel?: string;
}) => {
  const tableColumns = getColumns(currentUserAccessLevel);
  return <DataTable columns={tableColumns} data={tasks as any} />;
};

export const MyTasksTable = ({ tasks }: { tasks: TaskProps[] }) => {
  return <DataTable columns={columns} data={tasks as any} />;
};
