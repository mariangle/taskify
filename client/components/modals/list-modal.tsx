"use client"

import { ListResponse } from "@/types";
import { Modal, ModalContent, ModalHeader, useDisclosure, Divider, ModalBody } from "@nextui-org/react";
import { HiPlus, HiDotsHorizontal } from "react-icons/hi"
import Icon from "@/components/ui/icon";
import ListForm from "../../app/(protected)/components/list-form";

interface ListModalProps {
    list: ListResponse | null
}

export default function ListModal({
    list
} : ListModalProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const icon = list ? <HiDotsHorizontal className="w-3 h-3"/> : <HiPlus className="w-3 h-3"/> 
  const action = list ? 'Edit' : 'Create'

  return (
    <>
    { /* ! WARN: A component changed from uncontrolled to controlled. */}
      <Icon icon={icon} onClick={onOpen}/>
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