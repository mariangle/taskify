"use client"
import * as React from "react"
import { TaskResponse } from "@/types";
import { Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import TaskService from "@/services/task-service";

interface TaskCheckboxProps {
    task: TaskResponse
}

export default function TaskCheckbox({
    task
}: TaskCheckboxProps){
    const [isSelected, setIsSelected] = React.useState(task.status === "Completed");
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        setIsSelected(task.status === "Completed");
      }, [task.status]);
    
      const updateStatus = async () => {
        setIsLoading(true)
        const statusToString = !isSelected ? "Completed" : "Incomplete";
        const updatedTask = { ...task, status: statusToString };
        try {
          await TaskService.updateTask(task.id, updatedTask);
          router.refresh();
        } catch (error) {
          alert("Something went wrong.");
        } finally {
          setIsLoading(false)
        }
      };

    return (
        <Checkbox
            isSelected={isSelected}
            onValueChange={setIsSelected}
            lineThrough
            radius="full"
            color="default"
            onClick={updateStatus}
        >
      </Checkbox>
    )
}