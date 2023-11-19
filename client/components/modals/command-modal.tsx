"use client"

import CommandLine from "@/app/(protected)/tasks/components/command-line";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Divider} from "@nextui-org/react";

export default function CommandModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={'blur'}>
        <ModalContent className="dark:text-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Write your command</ModalHeader>
              <ModalBody>
              <Divider />
                <CommandLine onClose={onClose}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}