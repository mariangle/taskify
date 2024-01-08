'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import type { List } from '@/types';
import ListForm from '@/components/list-form';

interface ModalProps {
  list?: List;
  children: React.ReactNode;
}

export default function ListModal({ list, children }: ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dialogRef = React.useRef(null);

  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent ref={dialogRef} className="p-6">
        <DialogHeader>
          <DialogTitle>
            {list ? `Edit ${list.name}` : 'Create list'}
          </DialogTitle>
          {!list && (
            <DialogDescription>
              Use lists to categorize and manage your tasks.
            </DialogDescription>
          )}
        </DialogHeader>
        <ListForm list={list} onClose={close} />
      </DialogContent>
    </Dialog>
  );
}
