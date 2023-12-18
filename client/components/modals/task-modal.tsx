'use client'

import * as React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Icons } from '@/components/icons'

import { LabelResponse, ListResponse, TaskResponse } from '@/types'
import TaskForm from '../../app/(platform)/_components/task-form'

interface ModalProps {
  task?: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
}

export default function TaskOverlay({ task, lists, labels }: ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <button className="rounded-full p-1 hover:bg-accent" onClick={open}>
        <Icons.more className="w-4 h-4 rotate-90" />
      </button>
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="p-4">
          <TaskForm task={task} labels={labels} lists={lists} onClose={close} />
        </DialogContent>
      </Dialog>
    </>
  )
}
