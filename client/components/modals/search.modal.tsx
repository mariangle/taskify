"use client"

import Search from "@/components/search";
import { LuSearch } from "react-icons/lu";
import { Modal, ModalContent, useDisclosure} from "@nextui-org/react";

export default function SearchModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
        <div onClick={onOpen} className="cursor-pointer flex-gap text-default-500">
            <LuSearch className="mb-0.5 pointer-events-none flex-shrink-0 w-4 h-4" />
            <span className="text-sm hidden sm:block">Search</span>
        </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' size={'3xl'} placement="center" className="m-6">
        <ModalContent className="dark:text-white">
          {onClose => <Search onClose={onClose}/>}
        </ModalContent>
      </Modal>
    </>
  );
}