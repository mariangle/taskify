'use client'

import React from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { ListResponse } from '@/types'
import { FaTrash } from 'react-icons/fa'
import { handleError } from '@/lib/util'
import AlertModal from '@/components/modals/alert-modal'
import ListService from '@/services/list-service'
import { ListFormValues, listFormSchema } from '@/lib/validations/list'
import toast from 'react-hot-toast'
import { useSignalStore } from '@/store/signal-store'

interface FormProps {
  list?: ListResponse
  onClose: () => void
}

const ListForm = ({ list, onClose }: FormProps) => {
  const defaultValues: Partial<ListFormValues> = {
    name: list?.name,
  }

  const form = useForm<ListFormValues>({
    resolver: zodResolver(listFormSchema),
    defaultValues,
  })

  const action = list ? 'Save Changes' : 'Create List'

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const router = useRouter()
  const { triggerSignal } = useSignalStore()

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
      router.push('/lists')
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
                <FaTrash />
              </Button>
            )}
          </div>
          <div className="flex-gap">
            <Button variant={'ghost'} onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" variant={'default'}>
              {action}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ListForm
