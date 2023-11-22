"use client"
import React, { useState, useEffect } from "react";
import { TaskResponse } from "@/types";
import { cn, Checkbox } from "@nextui-org/react";
import TaskService from "@/helpers/services/task-service";
import { useRouter } from "next/navigation";

interface ListTasksProps {
  task: TaskResponse;
  isLast: boolean;
}

function ListTask({ task, isLast }: ListTasksProps) {
  const [isSelected, setIsSelected] = useState(task.status === "Completed");
  const router = useRouter();

  useEffect(() => {
    setIsSelected(task.status === "Completed");
  }, [task.status]);

  const onUpdateStatus = async () => {
    const statusToString = !isSelected ? "Completed" : "Incomplete"; // ? Had to use !isSelected
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
      key={task.id}
      className={cn("flex-gap p-2", isLast ? "" : "border-b dark:border-zinc-800")}
    >
      <Checkbox
        isSelected={isSelected}
        onValueChange={setIsSelected}
        lineThrough
        radius="full"
        color="default"
        onClick={onUpdateStatus}
      >
        {task.name}
      </Checkbox>
    </li>
  );
}

export default ListTask;
