"use client"
import React, { useState, useEffect } from "react";
import { TaskResponse } from "@/types";
import { cn, Checkbox } from "@nextui-org/react";
import { formatDistanceToNow } from "@/helpers/util/format";
import TaskService from "@/helpers/services/task-service";
import { useRouter } from "next/navigation";

interface ListTasksProps {
  task: TaskResponse;
  isLast: boolean;
}

function ListTask({ task, isLast }: ListTasksProps) {
  const [isSelected, setIsSelected] = useState(task.status === "Completed");
  const isOverdue = task.status !== "Completed" && task?.dueDate && new Date(task.dueDate) < new Date();
  const router = useRouter();

  useEffect(() => {
    setIsSelected(task.status === "Completed");
  }, [task.status]);

  const onUpdateStatus = async () => {
    const statusToString = !isSelected ? "Completed" : "Incomplete";
    const updatedTask = { ...task, status: statusToString };
    try {
      await TaskService.updateTask(task.id, updatedTask);
      router.refresh();
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <li
      className={cn(
        isLast ? "pt-4" : "border-b dark:border-zinc-800 py-4",
        "list-none flex flex-col space-y-1"
      )}
    >
      <Checkbox
        isSelected={isSelected}
        onValueChange={setIsSelected}
        lineThrough
        radius="full"
        color="default"
        onClick={onUpdateStatus}
        className="w-full"
      >
        {task.name}
      </Checkbox>
      {task.dueDate && task.status !== "Completed" && (
        <p className={cn("text-default-500 text-xs font-medium", isOverdue ? "text-red-500" : "")}>
          Due {formatDistanceToNow({ date: new Date(task.dueDate) })}
        </p>
      )}
    </li>
  );
}

export default ListTask;
