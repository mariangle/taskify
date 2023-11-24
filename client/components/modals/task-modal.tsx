"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import { ListResponse, TaskResponse } from "@/types";
import TaskForm from "../../app/(protected)/components/task-form";
import { useRouter } from "next/navigation";

interface ModalProps {
    task: TaskResponse | null,
    lists: ListResponse[] | [],
}

export default function TaskModal({
    task,
    lists,
} : ModalProps ) {
    const router = useRouter();
    const [isOpen, setIsOpen] = React.useState(false);

    const close = () => {
      setIsOpen(false);
      
      router.back();
      router.refresh();
    };

    React.useEffect(() => {
      setIsOpen(true)
    }, [])

    if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
          <TaskForm task={task} lists={lists} onClose={close}/>
        </DialogContent>
    </Dialog>
  );
}