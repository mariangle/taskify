import * as React from 'react'

import { TaskEntry, TaskResponse } from '@/types'

import { revalidate } from '@/lib/_actions/revalidate-path'

import TaskService from '@/services/task-service'
import { handleError } from '@/util'
import toast from 'react-hot-toast'
import { useParams, usePathname } from 'next/navigation'

export const useTaskForm = (initialData?: TaskResponse) => {
  const [isSaving, setIsSaving] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const params = useParams()
  const pathname = usePathname()

  const labelIds = initialData?.labels?.map((label) => label.id)

  const [taskEntry, setTaskEntry] = React.useState<TaskEntry | undefined>({
    ...initialData,
    name: initialData?.name || '',
    listId: initialData?.listId || (params.listId as string) || undefined,
    labelIds: labelIds || undefined,
  })

  const deleteTask = async (taskId: string) => {
    try {
      await TaskService.deleteTask(taskId)
      toast.success('Task deleted!')
      revalidate({ path: `/lists/${params.listId}` })
    } catch (e) {
      handleError(e)
    }
  }

  const submitTask = async (data: TaskEntry) => {
    setIsLoading(true)
    try {
      if (initialData) {
        await TaskService.updateTask(initialData.id, { ...initialData, ...data })

        if (!data.labelIds) return

        const labelsToRemove = initialData.labels?.filter((initialLabel) => !data.labelIds?.includes(initialLabel.id))
        const labelsToAdd = data.labelIds?.filter(
          (labelId) => !initialData.labels?.some((initialLabel) => initialLabel.id === labelId),
        )

        for (const labelToAdd of labelsToAdd || []) {
          await TaskService.addLabel({ taskId: initialData.id, labelId: labelToAdd })
        }
        for (const labelToRemove of labelsToRemove || []) {
          await TaskService.removeLabel({ taskId: initialData.id, labelId: labelToRemove.id })
        }

        toast.success('Changes saved!')
      } else {
        const createdTask = await TaskService.createTask(data)

        if (data.labelIds?.length) {
          for (const labelId of data.labelIds) await TaskService.addLabel({ taskId: createdTask.id, labelId })
        }

        toast.success('Task created!')
      }
      revalidate({ path: pathname })
    } catch (e) {
      console.error('Error saving task:', e)
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isOpen,
    isSaving,
    taskEntry,
    setTaskEntry,
    open,
    close,
    submitTask,
    deleteTask,
    setIsSaving,
    isLoading,
    params,
  }
}
