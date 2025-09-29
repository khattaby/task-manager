"use client";

import { cn } from "@/lib/utils";
import { taskStatusVariant } from "@/utils";
import { Column, ProjectTasksProps } from "@/utils/types";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { $Enums, Task, TaskStatus } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ProjectCard } from "./project-card";
import { updateTaskPosition } from "@/app/actions/task";

const COLUMN_TITLE: Record<$Enums.TaskStatus, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  IN_REVIEW: "In Review",
};

export const ProjectKanban = ({
  initialTasks,
}: {
  initialTasks?: ProjectTasksProps[];
}) => {
  // ALL hooks must be declared at the top before any conditional logic
  const router = useRouter();
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (initialTasks && initialTasks.length > 0) {
      const todoTasks = initialTasks
        .filter((task) => task.status === "TODO")
        .sort((a, b) => a.position - b.position);

      const inProgressTasks = initialTasks
        .filter((task) => task.status === "IN_PROGRESS")
        .sort((a, b) => a.position - b.position);

      const reviewTasks = initialTasks
        .filter((task) => task.status === "IN_REVIEW")
        .sort((a, b) => a.position - b.position);

      const completedTasks = initialTasks
        .filter((task) => task.status === "COMPLETED")
        .sort((a, b) => a.position - b.position);

      setColumns([
        {
          id: "TODO" as TaskStatus,
          title: COLUMN_TITLE.TODO,
          tasks: todoTasks,
        },
        {
          id: "IN_PROGRESS" as TaskStatus,
          title: COLUMN_TITLE.IN_PROGRESS,
          tasks: inProgressTasks,
        },
        {
          id: "IN_REVIEW" as TaskStatus,
          title: COLUMN_TITLE.IN_REVIEW,
          tasks: reviewTasks,
        },
        {
          id: "COMPLETED" as TaskStatus,
          title: COLUMN_TITLE.COMPLETED,
          tasks: completedTasks,
        },
      ]);
    }
  }, [initialTasks]);

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { destination, source } = result;
      if (!destination) return;
      const newColumns = [...columns];

      const sourceColumn = newColumns.find(
        (col) => col.id === source.droppableId
      );

      const destColumn = newColumns.find(
        (column) => column.id === destination.droppableId
      );

      if (!sourceColumn || !destColumn) return;

      const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
      const destinationTasks = destColumn.tasks;

      let newPosition: number;
      if (destinationTasks.length === 0) {
        newPosition = 1000;
      } else if (destination.index === 0) {
        newPosition = destinationTasks[0].position - 1000;
      } else if (destination.index === destinationTasks.length) {
        newPosition =
          destinationTasks[destinationTasks.length - 1].position + 1000;
      } else {
        newPosition =
          (destinationTasks[destination.index - 1].position +
            destinationTasks[destination.index].position) /
          2;
      }
      const updatedTask = {
        ...movedTask,
        position: newPosition,
        status: destination.droppableId as TaskStatus,
      };

      destColumn.tasks.splice(destination.index, 0, updatedTask);
      setColumns(newColumns);

      try {
        await updateTaskPosition(
          movedTask.id,
          newPosition,
          destination.droppableId as TaskStatus
        );
      } catch (error) {
        console.log(error);
      }
    },
    [columns]
  );

  // Handle null initialTasks case with conditional rendering instead of early return
  if (!initialTasks || initialTasks.length === 0) {
    return (
      <div className="flex gap-6 h-full md:px-4 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(COLUMN_TITLE).map(([status, title]) => (
            <div
              key={status}
              className="flex flex-col min-w-60 w-80 bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 mb-4 pl-3">
                  <div
                    className={cn("size-4 rounded")}
                    style={{
                      background: taskStatusVariant[status as TaskStatus],
                    }}
                  />
                  <h2 className="font-semibold">{title}</h2>
                </div>
              </div>
              <Separator className="mb-2" />
              <Droppable droppableId={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    className="flex-1 rounded-lg p-2"
                    ref={provided.innerRef}
                  >
                    <div className="text-center text-gray-500 py-4">
                      No tasks in this column
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    );
  }

  return (
    <div className="flex gap-6 h-full md:px-4 overflow-x-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col min-w-60 w-80 bg-gray-50 dark:bg-gray-900"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mb-4 pl-3">
                <div
                  className={cn("size-4 rounded")}
                  style={{
                    background: taskStatusVariant[column.id] as TaskStatus,
                  }}
                />
                <h2 className="font-semibold">{column.title}</h2>
              </div>
            </div>

            <Separator className="mb-2" />
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  className="flex-1 rounded-lg p-2"
                  ref={provided.innerRef}
                >
                  {column.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <ProjectCard
                          ref={provided.innerRef}
                          provided={provided}
                          task={task}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};
