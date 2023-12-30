import * as React from 'react'
import toast from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LabelColor } from '@/components/ui/label-badge'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { ListEnd } from 'lucide-react'
import { DatePicker } from './date-picker'
import { PriorityPicker } from './priority-picker'
import AlertModal from '@/components/modals/alert-modal'

import type { LabelResponse, ListResponse, TaskResponse } from '@/types'
import { useMounted } from '@/hooks/use-mounted'
import { useRouter } from 'next/navigation'
import { TaskService } from '@/services/task-service'
import { handleError } from '@/lib/util'

interface TaskActionsProps {
  task: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
  setOpen: () => void
  openSubtasks: () => void
}

export default function TaskActions({ task, lists, labels, setOpen, openSubtasks }: TaskActionsProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const isMounted = useMounted()
  const router = useRouter()

  const onEdit = () => setOpen()

  const onOpenSubtasks = () => openSubtasks()

  const onDelete = async (taskId: string) => {
    setIsLoading(true)
    try {
      await TaskService.deleteTask(taskId)
      // ! Might have to trigger signal here right sidebar
      router.refresh()
      toast.success('Task deleted.')
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
      setShowModal(false)
      setIsOpen(false)
    }
  }

  const onMoveTo = async (list: ListResponse) => {
    setIsLoading(true)
    try {
      await TaskService.updateTask(task.id, { ...task, listId: list.id })

      router.refresh()
      toast.success(`Task has been moved to ${list.name}`)
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
      setShowModal(false)
      setIsOpen(false)
    }
  }

  const isLabelApplied = (labelId: string) => {
    return task.labels?.some((label) => label.id === labelId) || false
  }

  const onSelectLabel = async (labelId: string) => {
    setIsLoading(true)
    try {
      if (isLabelApplied(labelId)) {
        await TaskService.removeLabel({ taskId: task.id, labelId: labelId })
      } else {
        await TaskService.addLabel({ taskId: task.id, labelId: labelId })
      }
      router.refresh()
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
      setShowModal(false)
      setIsOpen(false)
    }
  }

  if (!isMounted) return null

  return (
    <>
      <AlertModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => onDelete(task.id)}
        loading={isLoading}
      />
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'} className="rounded-full">
            <Icons.more className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onSelect={() => setIsOpen(false)} className="w-48 overflow-y-auto">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onEdit} onSelect={(e) => e.preventDefault()}>
              <Icons.pencil className="mr-2 h-3 w-3 text-muted-foreground" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenSubtasks} onSelect={(e) => e.preventDefault()}>
              <Icons.subtask className="mr-2 h-3 w-3 text-muted-foreground" />
              Add subtask
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icons.tags className="mr-2 h-3 w-3" />
                Apply label
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {labels.map((label) => (
                    <DropdownMenuItem onSelect={() => onSelectLabel(label.id)}>
                      <LabelColor color={label.color} className="mr-2" />
                      {label.name}
                      {isLabelApplied(label.id) && <Icons.check className="w-3 h-3 ml-auto" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Due Date</DropdownMenuLabel>
            <DatePicker variant={{ type: 'dropdown', task }} defaultValue={task.dueDate} />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Priority</DropdownMenuLabel>
            <PriorityPicker variant={{ type: 'dropdown', task }} defaultValue={task.priority} />
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ListEnd className="mr-2 h-3 w-3" />
                Move to...
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {lists.map((list) => (
                    <DropdownMenuItem onSelect={() => onMoveTo(list)}>
                      <span>{list.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() => {
                setShowModal(true)
                setIsOpen(false) // Manually close dropdown or overlay stays
              }}
              className="text-destructive"
            >
              <Icons.trash className="mr-2 h-3 w-3" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
