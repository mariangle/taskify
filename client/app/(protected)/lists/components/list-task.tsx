"use client"
import * as React from "react";
import { TaskResponse } from "@/types";
import { cn } from "@nextui-org/react";
import { formatDistanceToNow } from "@/helpers/util/format";
import TaskCheckbox from "../../tasks/components/task-checkbox";

interface ListTasksProps {
  task: TaskResponse;
  isLast: boolean;
}

function ListTask({ task, isLast }: ListTasksProps) {
  return (
    <li
      className={cn(
        isLast ? "pt-4" : "border-b dark:border-zinc-800 py-4",
        "list-none flex flex-col space-y-1"
      )}
    >
      <TaskCheckbox task={task}/>
      {task.dueDate && task.status !== "Completed" && (
        <p className={cn("text-xs text-muted-foreground")}>
          Due {formatDistanceToNow({ date: new Date(task.dueDate) })}
        </p>
      )}
    </li>
  );
}

export default ListTask;
