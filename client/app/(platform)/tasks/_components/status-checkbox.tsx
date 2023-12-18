import * as React from 'react'

import { SubtaskResponse, TaskResponse } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { handleError } from '@/util'
import toast from 'react-hot-toast'

import TaskService from '@/services/task-service'
import SubtaskService from '@/services/subtask-service'
import { useRouter } from 'next/navigation'

interface StatusCheckboxProps {
  task?: TaskResponse
  subtask?: SubtaskResponse
}

export default function StatusCheckbox({ task, subtask }: StatusCheckboxProps) {
  const [isCompleted, setIsCompleted] = React.useState(task?.status === 'Completed' || subtask?.isCompleted || false)
  const router = useRouter()

  React.useEffect(() => {
    setIsCompleted(task?.status === 'Completed' || subtask?.isCompleted || false)
  }, [task, subtask])

  if (!task && !subtask) return <Checkbox disabled />

  const onToggleStatus = async () => {
    try {
      const updatedStatus = !isCompleted

      if (task) {
        const updatedTask = { ...task, status: updatedStatus ? 'Completed' : 'Incomplete' }
        await TaskService.updateTask(task.id, updatedTask)
      } else if (subtask) {
        const updatedSubtask = { ...subtask, isCompleted: updatedStatus }
        await SubtaskService.updateSubtask(subtask.id, updatedSubtask)
      }

      if (!isCompleted) {
        toast.success(task ? 'Task completed!' : 'Subtask completed!')
      }

      setIsCompleted(updatedStatus)
      router.refresh()
    } catch (error) {
      handleError(error)
    }
  }

  return <Checkbox checked={isCompleted} onCheckedChange={onToggleStatus} disabled={!task && !subtask} />
}
