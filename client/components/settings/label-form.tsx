'use client'

import * as React from 'react'

import AlertModal from '@/components/modals/alert-modal'
import FormInput from '@/components/common/form-input'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LabelResponse } from '@/types/label'
import { useRouter } from 'next/navigation'
import { handleError } from '@/lib/util'
import { LabelSchemaType, LabelSchema } from '@/lib/validations/label'
import LabelService from '@/services/label-service'
import { useSignalStore } from '@/store/signal-store'

interface FormProps {
  label?: LabelResponse
}

export default function LabelForm({ label }: FormProps) {
  const action = label ? 'Save' : 'Create'
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const openDialog = () => setIsOpen(true)
  const { triggerSignal } = useSignalStore()
  const closeDialog = () => setIsOpen(false)

  const form = useForm<LabelSchemaType>({
    resolver: zodResolver(LabelSchema),
    defaultValues: {
      ...label,
      color: label?.color || '#ffffff',
      name: label?.name || '',
    },
  })

  const onSubmit = async (data: LabelSchemaType) => {
    try {
      setIsLoading(true)
      if (label) {
        await LabelService.updateLabel(label.id, { ...data, id: label.id })
        toast.success('Changes saved.')
      } else {
        await LabelService.createLabel(data)
        toast.success('Label created!')
      }
      triggerSignal()
      router.refresh()
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    if (!label) return

    try {
      await LabelService.deleteLabel(label.id)
      triggerSignal()
      toast.success('Label deleted!')
      router.refresh()
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <Form {...form}>
      <form>
        <AlertModal
          isOpen={isOpen}
          onClose={closeDialog}
          onConfirm={onDelete}
          loading={isLoading}
          description="This action will remove the labels from tasks that are currently associated with this label."
        />
        <div className="flex items-end gap-4 w-full">
          <FormInput form={form} name="color" type="color" className="aspect-square" />
          <FormInput form={form} name="name" fullWidth />
          {label && (
            <Button type="button" variant={'secondary'} onClick={openDialog} size={'icon'} className="w-14">
              <Icons.trash className="w-4 h-4" />
            </Button>
          )}
          <Button type="submit" onClick={form.handleSubmit(onSubmit)} variant={'default'}>
            {action}
          </Button>
        </div>
      </form>
    </Form>
  )
}
