'use client'

import * as React from 'react'
import * as z from 'zod'
import toast from 'react-hot-toast'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/ui/icons'

import AlertModal from '@/components/modals/alert-modal'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { handleError } from '@/lib/util'
import { ListService } from '@/services/list-service'
import { useSignal } from '@/hooks/use-signal'
import type { ListResponse } from '@/types'

interface FormProps {
  list?: ListResponse
  onClose: () => void
}

export const listFormSchema = z.object({
  name: z.string().min(2).max(10),
})

export type ListFormValues = z.infer<typeof listFormSchema>

const ListForm = ({ list, onClose }: FormProps) => {
  const defaultValues: Partial<ListFormValues> = {
    name: list?.name,
  }

  const form = useForm<ListFormValues>({
    resolver: zodResolver(listFormSchema),
    defaultValues,
  })

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const router = useRouter()
  const { triggerSignal } = useSignal()

  const closeDialog = () => setIsOpen(false)
  const openDialog = () => setIsOpen(true)

  const onSubmit = async (data: ListFormValues) => {
    try {
      setIsLoading(true)

      if (list) {
        ListService.updateList(list.id, { id: list.id, ...data })
        toast.success('List updated!')
      } else {
        await ListService.createList(data)
        toast.success('List created!')
      }
      triggerSignal()
      router.refresh()
      onClose()
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async (listId: string) => {
    try {
      await ListService.deleteList(listId)
      router.refresh()
      toast.success('List deleted!')
      triggerSignal()
      onClose()
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {list && (
          <AlertModal
            isOpen={isOpen}
            description="All tasks in this list will be deleted."
            onClose={closeDialog}
            onConfirm={() => onDelete(list.id)}
            loading={isLoading}
          />
        )}
        <Input {...form.register('name')} placeholder="Work" />
        <div className="flex justify-between pt-4">
          <div>
            {list && (
              <Button type="button" variant={'secondary'} onClick={openDialog}>
                <Icons.trash className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="flex-gap">
            <Button variant={'secondary'} onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" variant={'default'}>
              {list ? 'Save Changes' : 'Create List'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ListForm
