'use client'

import * as React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { useClickOutside } from '@/hooks/use-click-outside'
import TaskForm from '@/app/(platform)/_components/task-form'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'
import { LabelResponse, ListResponse } from '@/types'

export default function PromptModal() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [lists, setLists] = React.useState<ListResponse[]>([])
  const [labels, setLabels] = React.useState<LabelResponse[]>([])
  const dialogRef = React.useRef(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  useClickOutside(dialogRef, close)

  React.useEffect(() => {
    const fetchData = async () => {
      const labels = await LabelService.getLabels()
      const lists = await ListService.getLists()

      setLabels(labels)
      setLists(lists)
    }
    fetchData()
  }, [])

  return (
    <>
      <Button onClick={open} size={'sm'}>
        🚀 New Task
      </Button>
      <Dialog open={isOpen}>
        <DialogContent ref={dialogRef} className="p-4">
          <TaskForm lists={lists} labels={labels} onClose={close} />
        </DialogContent>
      </Dialog>
    </>
  )
}
