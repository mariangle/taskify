"use client"
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";
import { HiDotsHorizontal } from "react-icons/hi"
  
import React from "react"
import { useRouter } from "next/navigation";
import TaskService from "@/helpers/services/task-service";

interface TaskActionsProps {
    id: string,
}

const TaskActions = ({ id } : TaskActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false); 

    const onDelete = async () => {    
        try {
          setIsLoading(true)
          await TaskService.deleteTask(id);
          router.refresh();
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false)
        }
      };

    const onEdit = () => {
        router.push(`/tasks/${id}`)
    }

  return (
    <>
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
    </>

  )
}

export default TaskActions