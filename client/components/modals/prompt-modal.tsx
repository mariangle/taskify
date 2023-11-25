"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import useClickOutside from "@/hooks/use-click-outside";
import TaskPrompt from "@/components/task-prompt";

export default function PromptModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const dialogRef = React.useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  useClickOutside(dialogRef, close);

  return (
    <>
      <Button onClick={open} size={'sm'}>🚀 New Task</Button>
      <Dialog open={isOpen}>
        <DialogContent ref={dialogRef}>
          <TaskPrompt onClose={close}/>
        </DialogContent>
      </Dialog>
    </>
  );
}