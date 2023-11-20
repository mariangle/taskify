"use client"

import CommandLine from "@/app/(protected)/tasks/components/command-line";
import { Modal, ModalContent, Button, useDisclosure, Card, CardHeader} from "@nextui-org/react";

export default function CommandModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} variant="bordered" disableAnimation>Create Command</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' size={'3xl'}>
        <ModalContent className="dark:text-white">
          {onClose => (
            <Card className="p-4 space-y-4">
              <CommandLine onClose={onClose}/>
            </Card>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}