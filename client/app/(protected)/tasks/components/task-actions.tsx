"use client"
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi"
  
import * as React from "react"
import { useRouter } from "next/navigation";
import TaskService from "@/helpers/services/task-service";
import toast from "react-hot-toast";

interface TaskActionsProps {
    id: string,
}

const TaskActions = ({ id } : TaskActionsProps) => {
    const router = useRouter();

    const onDelete = async () => {    
        try {
          await TaskService.deleteTask(id);
          router.refresh();
          toast.success('Task deleted');
        } catch (error) {
          console.error(error);
        } 
      };

    const onEdit = () => {
        router.push(`/tasks/${id}`)
    }

  return (
    <Dropdown>
        <DropdownTrigger>
        <Button isIconOnly className="rounded-md" size='sm'>
            <HiDotsHorizontal />
        </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="dark:text-white">
            <DropdownItem key="edit" onClick={onEdit}>Edit</DropdownItem>
            <DropdownItem key="delete" onClick={onDelete} className="text-danger" color="danger">Delete</DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}

export default TaskActions