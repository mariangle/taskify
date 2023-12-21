import * as React from 'react'

import { LabelResponse, ListResponse } from '@/types'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import TaskForm from '@/components/task/task-form'

import { useLayoutStore } from '@/store/layout-store'
import { useSignalStore } from '@/store/signal-store'
import ListService from '@/services/list-service'
import LabelService from '@/services/label-service'

export default function TaskOverlay() {
  const { showTask, toggleTask } = useLayoutStore()

  const { signal } = useSignalStore()

  const [lists, setLists] = React.useState<ListResponse[]>([])
  const [labels, setLabels] = React.useState<LabelResponse[]>([])

  React.useEffect(() => {
    const getLists = async () => {
      const lists = await ListService.getLists()
      const labels = await LabelService.getLabels()
      setLists(lists)
      setLabels(labels)
    }
    getLists()
  }, [signal])

  // ! BUG: if popover with prop modal true dialog cannot be opened again

  return (
    <Dialog open={showTask} onOpenChange={toggleTask} modal={true}>
      <DialogContent className="max-w-screen-md h-fit overflow-y-auto max-h-screen">
        <TaskForm lists={lists} labels={labels} />
      </DialogContent>
    </Dialog>
  )
}
