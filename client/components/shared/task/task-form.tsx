'use client'

import * as z from 'zod'
import * as React from 'react'
import toast from 'react-hot-toast'

import type { LabelResponse, ListResponse, TaskResponse } from '@/types'
import { handleError } from '@/lib/util'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLayoutStore } from '@/store/layout-store'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { add } from 'date-fns'

import MentionsInput from '@/components/shared/task/mention-input'
import SelectList from '@/components/shared/task/select-list'
import SelectPriority from '@/components/shared/task/select-priority'
import SelectDueDate from '@/components/shared/task/select-due-date'

import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/seperator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'

import { TaskService } from '@/services/task-service'

interface TaskFormProps {
  task?: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
  close?: () => void
  small?: boolean
  initialValues?: {
    dueDate?: string
  }
}

export const taskFormSchema = z.object({
  name: z.string().min(1),
  note: z.string().optional(),
  dueDate: z.union([z.date(), z.string()]).optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  listId: z.string().optional(),
  labelIds: z.array(z.string()).optional(),
})

export type TaskFormValues = z.infer<typeof taskFormSchema>

export default function TaskForm({ task, lists, labels, small = false, close, initialValues }: TaskFormProps) {
  const { closeTaskOverlay } = useLayoutStore()

  const params = useParams<{ listId: string }>()
  const path = usePathname()
  const router = useRouter()

  function parseDateString(dateString: string) {
    const parts = dateString.split('-')
    // Note: Months are zero-based in JavaScript Date objects, so we subtract 1
    const year = parseInt(parts[2], 10)
    const month = parseInt(parts[1], 10) - 1
    const day = parseInt(parts[0], 10)

    return new Date(year, month, day)
  }

  const defaultValues: Partial<TaskFormValues> = {
    name: task?.name || undefined,
    note: task?.note || undefined,
    dueDate: task?.dueDate
      ? new Date(task.dueDate)
      : path === '/today'
      ? new Date()
      : initialValues?.dueDate
      ? parseDateString(initialValues.dueDate)
      : undefined,
    priority: task?.priority || undefined,
    listId: task?.listId || params.listId || undefined,
    labelIds: task?.labels?.filter((label) => label.id)?.map((label) => label.id) || undefined,
  }

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: TaskFormValues) => {
    try {
      if (task) {
        await TaskService.updateTask(task.id, { id: task.id, ...data })

        const labelsToAdd = labels.filter(
          (label) => data.labelIds?.includes(label.id) && !task.labels?.some((tLabel) => tLabel.id === label.id),
        )
        const labelsToRemove = task.labels?.filter((tLabel) => !data.labelIds?.includes(tLabel.id)) || []

        for (const label of labelsToAdd) await TaskService.addLabel({ taskId: task.id, labelId: label.id })
        for (const label of labelsToRemove) await TaskService.removeLabel({ taskId: task.id, labelId: label.id })

        toast.success('Task updated.')
      } else {
        // Adding date to default value since it goes to previous day
        let realDate = data.dueDate ?? undefined
        if (initialValues?.dueDate) {
          realDate = add(parseDateString(initialValues.dueDate), { days: 1 })
        }

        const createdTask = await TaskService.createTask({ ...data, dueDate: realDate })

        if (data.labelIds?.length) {
          for (const labelId of data.labelIds) await TaskService.addLabel({ taskId: createdTask.id, labelId })
        }
        toast.success('Task created.')
      }
      router.refresh()
      close && close()
      closeTaskOverlay()
    } catch (err) {
      handleError(err)
    }
  }

  // TODO: Figure out sharing and updates state fx. list and labels

  const watchName = form.watch('name')

  const onCancel = () => {
    close && close()
    closeTaskOverlay()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-1">
          <MentionsInput form={form} lists={lists} labels={labels} register={'name'} small={small} />
          <Input transparent {...form.register('note')} placeholder="Description" className="pt-0" autoComplete="off" />
        </div>
        <div className="flex-gap p-3 pt-0 flex-wrap max-w-full">
          <SelectDueDate form={form} register="dueDate" defaultValue={defaultValues.dueDate} small={small} />
          <SelectPriority form={form} register="priority" defaultValue={defaultValues.priority} small={small} />
        </div>
        <Separator />
        <div className="flex-between p-3">
          <div>
            <SelectList lists={lists} form={form} register={'listId'} defaultValue={defaultValues.listId} />
          </div>
          <div className="flex-gap">
            <Button variant={'secondary'} size={'sm'} onClick={onCancel} type="button">
              {small ? <Icons.close className="w-4 h-4" /> : 'Cancel'}
            </Button>
            <Button size={'sm'} disabled={!watchName}>
              {small ? <Icons.send className="w-4 h-4" /> : task ? 'Save changes' : 'Create task'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
