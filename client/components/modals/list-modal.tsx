"use client"

import { ListResponse } from "@/types";
import { Modal, ModalContent, ModalHeader, Button, useDisclosure, Card, CardHeader, CardBody, Divider, ModalBody } from "@nextui-org/react";
import { HiPlus, HiDotsHorizontal } from "react-icons/hi"

import ListForm from "../forms/list-form";

interface ListModalProps {
    list: ListResponse | null
}

export default function ListModal({
    list
} : ListModalProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const icon = list ? <HiDotsHorizontal /> :  <HiPlus /> 
  const action = list ? 'Edit' : 'Create'

  return (
    <>
    { /* ! WARN: A component changed from uncontrolled to controlled. */}
      <Button onPress={onOpen} variant="bordered" disableAnimation isIconOnly className="rounded-full p-0" size='sm'>
        {icon}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' placement="center">
        <ModalContent className="dark:text-white">
          {onClose => (
            <>
              <ModalHeader className="pb-2 pt-4 px-4 flex-col items-start">
                  <p className="text-tiny uppercase font-bold">{action} list</p>
                  <small className="text-default-500">12 tasks</small>
              </ModalHeader>
              <Divider />
              <ModalBody className="p-4">
                <ListForm onClose={onClose} list={list}/>
              </ModalBody>
            </>
            )}
        </ModalContent>
      </Modal>
    </>
  );
}