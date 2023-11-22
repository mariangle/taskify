"use client";

import { useEffect, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import { Button } from "@/components/shared";

interface AlertModalProps {
  title?: string,
  description?: string,
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
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

  const modalTitle = title ? title : 'Are you sure?'
  const modalDescription = description ? description : 'This action cannot be undone.'; 

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onClose}
      backdrop='blur'>
        <ModalContent className="dark:text-white">
            <ModalHeader>
              <div className="flex flex-col">
                <p className="text-md">{modalTitle}</p>
                <p className="text-small text-default-500">{modalDescription}</p>
              </div>
            </ModalHeader>
            <ModalBody className="p-4">
                <div className="flex-gap">
                    <Button disabled={loading} onClick={onConfirm} variant="shadow" color="danger">
                        Yes
                    </Button>
                    <Button disabled={loading} onClick={onClose} variant="flat">Cancel</Button>
                </div>
            </ModalBody>
        </ModalContent>
    </Modal>
  );
};

export default AlertModal;