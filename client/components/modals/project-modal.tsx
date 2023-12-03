"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { ProjectResponse } from "@/types";
import { Icons } from "@/components/icons";

import { useClickOutside } from "@/hooks/use-click-outside";
import ProjectForm from "@/app/(platform)/components/project-form";

interface ModalProps {
    project?: ProjectResponse
}

export default function ProjectModal({
    project
} : ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const icon = project ? <Icons.more className="w-3 h-3 text-background" /> : <Icons.add className="w-3 h-3 text-background" />
  const dialogRef = React.useRef(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  useClickOutside(dialogRef, close);

  return (
    <>
      <div onClick={open} className="cursor-pointer bg-border p-1 rounded-full block bg-foreground-700">
        {icon}
      </div>
      <Dialog open={isOpen}>
        <DialogContent ref={dialogRef} className="p-4">
          <ProjectForm project={project} close={close}/>
        </DialogContent>
      </Dialog>
    </>
  );
}