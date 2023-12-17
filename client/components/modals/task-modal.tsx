'use client'

import * as React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { LabelResponse, ListResponse, TaskResponse } from '@/types'
import TaskForm from '../../app/(platform)/_components/task-form'
import { useRouter } from 'next/navigation'

interface ModalProps {
  task: TaskResponse | null
  lists: ListResponse[] | []
  labels: LabelResponse[] | []
}

export default function TaskModal({ task, lists, labels }: ModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  const close = () => {
    setIsOpen(false)

    router.back()
    router.refresh()
  }

  React.useEffect(() => {
    setIsOpen(true)
  }, [])

  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="p-4">
        <TaskForm task={task} labels={labels} lists={lists} onClose={close} />
      </DialogContent>
    </Dialog>
  )
}
