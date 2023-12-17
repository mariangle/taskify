'use client'

import * as React from 'react'

import { TaskResponse } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { handleError } from '@/util'
import toast from 'react-hot-toast'

import TaskService from '@/services/task-service'
import { useRouter } from 'next/navigation'

export default function TaskCheckbox({ task }: { task?: TaskResponse }) {
  const [isCompleted, setIsCompleted] = React.useState(task?.status === 'Completed')
  const router = useRouter()

  React.useEffect(() => {
    setIsCompleted(task?.status === 'Completed')
  }, [task])

  if (!task) return <Checkbox disabled />

  const onToggleStatus = async () => {
    try {
      const updatedTask = { ...task, status: isCompleted ? 'Incomplete' : 'Completed' }

      await TaskService.updateTask(task.id, updatedTask)

      if (!isCompleted) {
        toast.success('Task completed!')
      }

      setIsCompleted((prev) => !prev)
      router.refresh()
    } catch (error) {
      handleError(error)
    }
  }

  return <Checkbox checked={isCompleted} onCheckedChange={onToggleStatus} disabled={!task} />
}
