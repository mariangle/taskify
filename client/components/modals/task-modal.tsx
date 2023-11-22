"use client"

import { ListResponse, TaskResponse } from "@/types";
import TaskForm from "../forms/task-form";
import { Modal, ModalContent, ModalBody, ModalHeader} from "@nextui-org/react";
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
    const action = task ? 'Edit Task' : 'Create Task'

    const onBack = () => {
        router.back();
    }

  return (
    <Modal isOpen={true} onOpenChange={onBack} backdrop='blur' size={'3xl'}>
        <ModalContent className="dark:text-white">
            <ModalHeader onClick={onBack}>{action}</ModalHeader>
            <ModalBody>
                <TaskForm task={task} lists={lists} isModal={true}/>
            </ModalBody>
            <ModalHeader></ModalHeader>
        </ModalContent>
    </Modal>
  );
}