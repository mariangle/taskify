"use client"

import React from "react";
import {Modal, ModalContent, Button, useDisclosure } from "@nextui-org/react";

import AuthForm from "@/app/(auth)/components/auth-form";
export default function AuthModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <AuthForm variant="login"/>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
