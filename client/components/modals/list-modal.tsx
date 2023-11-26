"use client"
import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ListResponse } from "@/types";
import { MoreHorizontal, Plus } from "lucide-react"

import useClickOutside from "@/hooks/use-click-outside";
import ListForm from "../../app/(platform)/components/list-form";

interface ModalProps {
    list: ListResponse | null
}

export default function ListModal({
    list
} : ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const icon = list ? <MoreHorizontal className="w-3 h-3 text-background" /> : <Plus className="w-3 h-3 text-background" />
  const dialogRef = React.useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  useClickOutside(dialogRef, () => setIsOpen(false));

  return (
    <>
      <div onClick={open} className="cursor-pointer bg-border p-1 rounded-full block bg-foreground-700">
        {icon}
      </div>
      <Dialog open={isOpen}>
        <DialogContent ref={dialogRef} className="p-4">
          <ListForm list={list} onClose={close}/>
        </DialogContent>
      </Dialog>
    </>
  );
}