"use client"
import * as React from "react";
import { TaskResponse } from "@/types";
import { cn } from "@nextui-org/react";
import { formatDistanceToNow } from "@/util/format";
import { isOverdue } from "@/util/format";
import TaskCheckbox from "../../tasks/components/task-checkbox";

interface ListTasksProps {
  task: TaskResponse;
  isLast: boolean;
}

function ListTask({ task, isLast }: ListTasksProps) {

  return (
    <li
      className={cn(
        isLast ? "" : "border-b dark:border-zinc-800",
        "list-none flex flex-col space-y-1 py-2"
      )}
    >
      <div className="text-base">
        <TaskCheckbox task={task} />
        <span className={isOverdue({ date: task.dueDate, status: task.status}) ? "text-destructive" : ""}>{task.name}</span>
      </div>
      {task.dueDate && task.status !== "Completed" && (
        <p className={cn("text-xs text-muted-foreground")}>
          Due {formatDistanceToNow({ date: new Date(task.dueDate) })}
        </p>
      )}
    </li>
  );
}

export default ListTask;
