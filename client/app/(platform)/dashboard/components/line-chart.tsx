"use client"
import { useTheme } from "next-themes"
import { Line, LineChart as RechartsChart, ResponsiveContainer, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TaskResponse } from "@/types";
type GroupedData = { [key: string]: number };

export default function LineChart({ tasks }: { tasks: TaskResponse[] | [] }) {
  // Filter tasks with due dates
  const tasksWithDueDate = tasks.filter((task) => task.dueDate !== null && task.dueDate !== undefined);

  // Format the data for analysis
  const formattedData = tasksWithDueDate.map((task) => {
    return {
      date: new Date(task.dueDate!).toLocaleDateString(),
      completed: task.status === "Completed" ? 1 : 0,
    };
  });

  // Group data by date and calculate total completed tasks each day
  const groupedData: GroupedData = formattedData.reduce((accumulator, currentValue) => {
    const date = currentValue.date;
    accumulator[date] = (accumulator[date] || 0) + currentValue.completed;
    return accumulator;
  }, {} as GroupedData);

  // Create final data for the chart
  const chartData = Object.keys(groupedData).reverse().map((date) => ({
    date,
    completed: groupedData[date],
  }));
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Trend</CardTitle>
          <CardDescription>
            Visualizing the trend of completed tasks over time.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsChart
                data={chartData} 
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Date
                              </span>
                              <span className="font-bold text-muted-foreground">
                                {payload[0].payload.date}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Completed Tasks
                              </span>
                              <span className="font-bold">
                                {payload[0].payload.completed}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                    />
                <Line
                    type="monotone"
                    strokeWidth={2}
                    dataKey="completed"
                    dot={{ fill: 'hsl(var(--primary))' }}
                    activeDot={{ r: 8, fill: 'hsl(var(--card))' }}
                    stroke="hsl(var(--primary))"
                />
              </RechartsChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    );
  }