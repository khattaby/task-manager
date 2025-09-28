"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Pie, PieChart, Label } from "recharts";

interface TaskDistributionProps {
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
}

const chartConfig = {
  tasks: {
    label: "Tasks",
  },
  completed: {
    label: "Completed",
    color: "#22c55e",
  },
  inProgress: {
    label: "In Progress",
    color: "#f59e0b",
  },
  overdue: {
    label: "Overdue",
    color: "#ef4444",
  },
  todo: {
    label: "To Do",
    color: "#93c5fd",
  },
} as const;

export const TaskDistributionChart = ({ tasks }: TaskDistributionProps) => {
  // Calculate remaining tasks (To Do)
  const todoTasks = Math.max(0, tasks.total - tasks.completed - tasks.inProgress - tasks.overdue);
  
  const data = [
    {
      name: "Completed",
      value: tasks.completed,
      fill: "#22c55e",
    },
    {
      name: "In Progress",
      value: tasks.inProgress,
      fill: "#f59e0b",
    },
    {
      name: "Overdue",
      value: tasks.overdue,
      fill: "#ef4444",
    },
    {
      name: "To Do",
      value: todoTasks,
      fill: "#93c5fd",
    },
  ].filter((item) => item.value > 0);

  // If no data, show a placeholder
  const chartData = data.length > 0 ? data : [
    {
      name: "No Tasks",
      value: 1,
      fill: "#e5e7eb",
    },
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Task Distribution</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {tasks.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        <p className="w-full">Showing total task count for the project</p>
      </CardFooter>
    </Card>
  );
};
