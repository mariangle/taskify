import * as React from 'react'

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

import type { SubtaskResponse } from '@/types'
import { useMounted } from '@/hooks/use-mounted'
import { useRouter } from 'next/navigation'

import { SubtaskService } from '@/services/subtask-service'
import { handleError } from '@/lib/util'

interface SubtaskActionsProps {
  subtask: SubtaskResponse
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SubtaskActions({ subtask, setOpen }: SubtaskActionsProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const isMounted = useMounted()
  const router = useRouter()

  const onEdit = () => setOpen(true)

  const onDelete = async (labelId: string) => {
    setIsLoading(true)
    try {
      await SubtaskService.deleteSubtask(labelId)

      router.refresh()
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async () => onDelete(subtask.id)}
        loading={isLoading}
        description="Deleting the Subtask will result in the removal of all labels associated with a task."
      />
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button size={'icon'} variant={'ghost'} className="w-5 h-5 rounded-full">
            <Icons.more className="w-5 h-5 p-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onSelect={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={onEdit}>
            <Icons.pencil className="mr-2 h-3 w-3 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => onDelete(subtask.id)}
            className="text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Icons.trash className="mr-2 h-3 w-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
