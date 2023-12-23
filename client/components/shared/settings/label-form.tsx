'use client'

import * as React from 'react'
import toast from 'react-hot-toast'

import FormInput from '@/components/common/form-input'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LabelResponse } from '@/types/label'
import { useRouter } from 'next/navigation'
import { handleError } from '@/lib/util'
import { LabelSchemaType, LabelSchema } from '@/lib/validations/label'
import LabelService from '@/services/label-service'
import { useSignal } from '@/hooks/use-signal'

interface FormProps {
  label?: LabelResponse
  close?: () => void
}

export default function LabelForm({ label, close }: FormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { triggerSignal } = useSignal()

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
      close && close()
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }
  const onCancel = () => {
    close && close()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-gap w-full">
          <FormInput form={form} name="color" type="color" className="aspect-square rounded-full" />
          <FormInput form={form} name="name" fullWidth />
        </div>
        <div className="flex-gap justify-end mt-2">
          <Button type="button" onClick={onCancel} disabled={isLoading}>
            <Icons.close className="w-4 h-4" />
          </Button>
          <Button type="submit" variant={'default'} disabled={isLoading} loading={isLoading}>
            {label ? 'Save' : 'Add'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
