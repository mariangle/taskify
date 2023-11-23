"use client"

import TaskPrompt from "@/components/task-prompt";
import { Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";

export default function PromptModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" disableAnimation className="text-white font-semibold">🚀 New Task</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' size={'3xl'}>
        <ModalContent className="dark:text-white">
          {onClose => <TaskPrompt onClose={onClose}/>}
        </ModalContent>
      </Modal>
    </>
  );
}