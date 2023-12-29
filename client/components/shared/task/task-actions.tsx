import * as React from 'react'
import toast from 'react-hot-toast'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'
import AlertModal from '@/components/modals/alert-modal'

import type { TaskResponse } from '@/types'
import { useMounted } from '@/hooks/use-mounted'
import { useRouter } from 'next/navigation'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/util/cn'

import { TaskService } from '@/services/task-service'
import { handleError } from '@/lib/util'

interface TaskActionsProps {
  task: TaskResponse
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TaskActions({ task, setOpen }: TaskActionsProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const isMounted = useMounted()
  const router = useRouter()

  const onEdit = () => setOpen(true)

  const onDelete = async (taskId: string) => {
    setIsLoading(true)
    try {
      await TaskService.deleteTask(taskId)

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

  const onClose = () => {
    setShowModal(false)
    setIsOpen(false)
  }

  if (!isMounted) return null

  return (
    <>
      <AlertModal isOpen={showModal} onClose={onClose} onConfirm={async () => onDelete(task.id)} loading={isLoading} />
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'} className="w-5 h-5 rounded-full">
            <Icons.more className="w-5 h-5 p-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onEdit} onSelect={(e) => e.preventDefault()}>
            <Icons.pencil className="mr-2 h-3 w-3 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => onDelete(task.id)}
            onSelect={(e) => e.preventDefault()}
            className="text-destructive"
          >
            <Icons.trash className="mr-2 h-3 w-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
