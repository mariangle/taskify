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

import { TaskResponse } from '@/types'
import { useMounted } from '@/hooks/use-mounted'
import { useRouter } from 'next/navigation'

import TaskService from '@/services/task-service'
import { handleError } from '@/lib/util'

interface DropdownProps {
  task: TaskResponse
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function TaskOptionsDropdown({ task, setOpen }: DropdownProps) {
  const isMounted = useMounted()
  const router = useRouter()

  const onEdit = () => setOpen(true)

  const onDelete = async (taskId: string) => {
    try {
      await TaskService.deleteTask(taskId)

      router.refresh()
      toast.success('Task deleted.')
    } catch (err) {
      handleError(err)
    }
  }

  if (!isMounted) return null

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'ghost'} className="w-5 h-5 rounded-full">
          <Icons.more className="w-4 h-4 p-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onEdit}>
          <Icons.pencil className="mr-2 h-3 w-3 text-muted-foreground" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => onDelete(task.id)} className="text-destructive">
          <Icons.trash className="mr-2 h-3 w-3" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
