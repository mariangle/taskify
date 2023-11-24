"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { LuSearch } from "react-icons/lu";

import useClickOutside from "@/helpers/hooks/use-click-outside";
import Search from "@/components/search";

export default function SearchModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const dialogRef = React.useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  useClickOutside(dialogRef, close);

  return (
    <>
      <div onClick={open} className="cursor-pointer flex-gap text-default-500">
          <LuSearch className="mb-0.5 pointer-events-none flex-shrink-0 w-4 h-4" />
          <span className="text-sm hidden sm:block">Search</span>
      </div>
      <Dialog open={isOpen}>
        <DialogContent ref={dialogRef}>
          <Search onClose={close}/>
        </DialogContent>
      </Dialog>
    </>
  );
}