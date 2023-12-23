import * as React from 'react'
import toast from 'react-hot-toast'
import AlertModal from '@/components/modals/alert-modal'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'

import { LabelResponse } from '@/types'
import { useMounted } from '@/hooks/use-mounted'
import { useRouter } from 'next/navigation'

import LabelService from '@/services/label-service'
import { handleError } from '@/lib/util'
import { useSignal } from '@/hooks/use-signal'

interface DropdownProps {
  label: LabelResponse
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LabelActionsdropDown({ label, setOpen }: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const isMounted = useMounted()
  const router = useRouter()
  const { triggerSignal } = useSignal()

  const onEdit = () => setOpen(true)

  const onDelete = async (labelId: string) => {
    try {
      await LabelService.deleteLabel(labelId)

      triggerSignal()
      router.refresh()
      toast.success('Label removed.')
    } catch (err) {
      handleError(err)
    }
  }

  if (!isMounted) return null

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async () => onDelete(label.id)}
        loading={isLoading}
        description="The label will be deleted and all labels associated to a task will be removed."
      />
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
          <DropdownMenuItem onClick={() => setIsOpen(true)} className="text-destructive">
            <Icons.trash className="mr-2 h-3 w-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
