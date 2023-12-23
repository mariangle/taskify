import * as React from 'react'

import { LabelResponse, ListResponse } from '@/types'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

import ListService from '@/services/list-service'
import LabelService from '@/services/label-service'
import TaskForm from '@/components/shared/task/task-form'

import { useLayoutStore } from '@/store/layout-store'
import { useSignal } from '@/hooks/use-signal'
import { useMediaQuery } from '@/hooks/use-media-query'

export default function TaskOverlay() {
  const [isOpen, setOpen] = React.useState(false)
  const [lists, setLists] = React.useState<ListResponse[]>([])
  const [labels, setLabels] = React.useState<LabelResponse[]>([])
  const { signal } = useSignal()
  const { showTask, toggleTask, setTask } = useLayoutStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  React.useEffect(() => {
    showTask ? setOpen(true) : setOpen(false)
  }, [showTask])

  React.useEffect(() => {
    const subscribe = async () => {
      const lists = await ListService.getLists()
      const labels = await LabelService.getLabels()
      setLists(lists)
      setLabels(labels)
    }
    if (showTask) subscribe()
  }, [signal, showTask])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleTask()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [toggleTask])

  if (isDesktop) {
    return (
      <Dialog open={showTask} onOpenChange={toggleTask} modal>
        <DialogContent className="max-w-xl h-fit overflow-y-auto max-h-screen">
          <TaskForm lists={lists} labels={labels} />
        </DialogContent>
      </Dialog>
    )
  }

  // A workaround to manage open state and tasks
  const onOpenChange = () => {
    setOpen(!isOpen)
    if (!isOpen) {
      setTask(false)
    }
  }

  return (
    <Drawer open={showTask} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="max-h-screen overflow-y-auto">
          <TaskForm lists={lists} labels={labels} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
