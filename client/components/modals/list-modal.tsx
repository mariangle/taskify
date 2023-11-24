"use client"
import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ListResponse } from "@/types";
import { CircleEllipsis, PlusCircle } from "lucide-react"

import useClickOutside from "@/helpers/hooks/use-click-outside";
import ListForm from "../../app/(protected)/components/list-form";

interface ListModalProps {
    list: ListResponse | null
}

export default function ListModal({
    list
} : ListModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const icon = list ? <CircleEllipsis className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />
  const dialogRef = React.useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  useClickOutside(dialogRef, () => setIsOpen(false));

  return (
    <>
      <div onClick={open} className="cursor-pointer">
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