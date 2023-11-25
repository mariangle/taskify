"use client"
import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ListResponse } from "@/types";
import { MoreHorizontal, Plus } from "lucide-react"

import useClickOutside from "@/helpers/hooks/use-click-outside";
import ListForm from "../../app/(protected)/components/list-form";

interface ModalProps {
    list: ListResponse | null
}

export default function ListModal({
    list
} : ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const icon = list ? <MoreHorizontal className="w-3 h-3" /> : <Plus className="w-3 h-3" />
  const dialogRef = React.useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  useClickOutside(dialogRef, () => setIsOpen(false));

  return (
    <>
      <div onClick={open} className="cursor-pointer bg-border p-1 rounded-full block">
        {icon}
      </div>
      <Dialog open={isOpen}>
        <DialogContent ref={dialogRef}>
          <ListForm list={list} onClose={close}/>
        </DialogContent>
      </Dialog>
    </>
  );
}