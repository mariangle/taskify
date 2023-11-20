"use client"

import TaskPrompt from "@/components/task-prompt";
import { Modal, ModalContent, Button, useDisclosure, Card, CardHeader} from "@nextui-org/react";

export default function CommandModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="bordered" disableAnimation>Create Command</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' size={'3xl'}>
        <ModalContent className="dark:text-white">
          {onClose => <TaskPrompt onClose={onClose}/>}
        </ModalContent>
      </Modal>
    </>
  );
}