'use client'

import * as React from 'react'
import * as z from 'zod'

import { LabelResponse, ListResponse, TaskResponse } from '@/types'

import MentionsInput from '../mentions-input'

import SelectList from './select-list'
import FormSelect from '@/components/common/form-select'
import FormSelectList from '@/components/common/form-select.list'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLayoutStore } from '@/store/layout-store'

import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/seperator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

interface TaskFormProps {
  task?: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
}

export const taskFormSchema = z.object({
  name: z.string().min(2),
  status: z.string().optional(),
  note: z.string().optional(),
  dueDate: z.union([z.string(), z.date()]).optional(),
  priority: z.string().optional(),
  listId: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

export default function TaskForm({ task, lists, labels }: TaskFormProps) {
  const { closeTask } = useLayoutStore()
  const params = useParams()

  const [debug, setDebug] = React.useState({})

  const defaultValues: Partial<TaskFormValues> = {
    name: task?.name || '',
  }

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  })

  const onSubmit = (data: TaskFormValues) => {
    console.log(data)
  }

  React.useEffect(() => {
    setDebug(form.getValues())
  }, [form])

  const getValues = () => {
    console.log(form.getValues())
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input transparent placeholder="Name" />
        <Separator />
        <div className="flex-between p-2">
          <div>
            <SelectList lists={lists} close={() => {}} />
            <FormSelectList items={lists} form={form} name="listId" placeholder="None" />
          </div>
          <div className="flex-gap">
            <Button variant={'secondary'} size={'sm'} onClick={getValues} type="button">
              getvalues
            </Button>
            <Button variant={'secondary'} size={'sm'} onClick={closeTask} type="button">
              Cancel
            </Button>
            <Button variant={'theme'} size={'sm'}>
              Update
            </Button>
          </div>
        </div>
        {JSON.stringify(debug)}
      </form>
    </Form>
  )
}
