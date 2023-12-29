import * as React from 'react'

import type { SubtaskResponse, TaskResponse } from '@/types'
import { cn } from '@/lib/util/cn'
import { Checkbox } from '@/components/ui/checkbox'
import { handleError } from '@/lib/util'
import toast from 'react-hot-toast'

import { TaskService } from '@/services/task-service'
import { SubtaskService } from '@/services/subtask-service'
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

  if (!task && !subtask) return <Checkbox disabled className="hover:cursor-default" />

  const onToggleStatus = async () => {
    try {
      const updatedStatus = !isCompleted

      if (task) {
        // Ensure a complete task with subtasks doesn't have completed subtasks
        const hasCompletedSubtasks =
          task.subtasks && task.subtasks.length > 0 && task.subtasks.every((subtask) => subtask.isCompleted)

        if (isCompleted && hasCompletedSubtasks) {
          throw new Error('To mark this task as incomplete, uncheck a subtask.')
        }

        // Ensure an incomplete task with incomplete tasks doesn't get marked as done
        const hasIncompleteSubtasks = task.subtasks?.some((subtask) => !subtask.isCompleted)

        if (!isCompleted && hasIncompleteSubtasks) {
          throw new Error('Complete all subtasks to mark as done.')
        }

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

  const className =
    task?.priority === 'Low'
      ? 'border-sky-500 bg-sky-500/10'
      : task?.priority === 'Medium'
      ? 'border-yellow-500 bg-yellow-500/10'
      : task?.priority === 'High'
      ? 'border-red-500 bg-red-500/10'
      : ''

  return <Checkbox checked={isCompleted} onCheckedChange={onToggleStatus} className={className} />
}
