"use client";

import { useEffect, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import { Button } from "@/components/common";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onClose}
      backdrop='blur'>
        <ModalContent className="dark:text-white">
            <ModalHeader>
                Are you sure?
            </ModalHeader>
            <ModalBody className="p-4">
                <div className="flex-gap">
                    <Button disabled={loading} onClick={onConfirm} variant="shadow">
                        Yes
                    </Button>
                    <Button disabled={loading} onClick={onClose} variant="bordered">Cancel</Button>
                </div>
            </ModalBody>
        </ModalContent>
    </Modal>
  );
};

export default AlertModal;