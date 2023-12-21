'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { revalidate } from '@/lib/_actions/revalidate-path'

import { Form } from '@/components/ui/form'
import { SubtaskResponse, TaskResponse } from '@/types'
import { Icons } from '@/components/icons'
import StatusCheckbox from '../inbox/_components/status-checkbox'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import SubtaskService from '@/services/subtask-service'
import { usePathname } from 'next/navigation'
import { subtaskFormSchema, SubtaskFormValues } from '@/lib/validations/subtask'
import { Button } from '@/components/ui/button'

interface SubtaskFormProps {
  subtask?: SubtaskResponse
  task: TaskResponse
}

const SubtaskForm = ({ subtask, task }: SubtaskFormProps) => {
  const defaultValues: Partial<SubtaskFormValues> = {
    name: subtask?.name,
  }

  const path = usePathname()
  const form = useForm<SubtaskFormValues>({
    resolver: zodResolver(subtaskFormSchema),
    defaultValues,
  })

  const onSubmit = async (data: SubtaskFormValues) => {
    try {
      if (subtask) {
        await SubtaskService.updateSubtask(task.id, { id: subtask.id, ...data })
      } else {
        await SubtaskService.createSubtask(task.id, data)
        toast.success('Subtask created!')
      }
      revalidate({ path: path, type: 'page' })
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async (subtaskId: string) => {
    try {
      await SubtaskService.deleteSubtask(subtaskId)
      toast.success('Subtask deleted!')
      revalidate({ path: path, type: 'page' })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex-between w-full">
          <div className="flex-gap-sm">
            <StatusCheckbox subtask={subtask} />
            <Input transparent {...form.register('name')} placeholder="Add subtask" className="w-fit" />
            <Button type="submit" variant={'default'} size={'sm'} onClick={form.handleSubmit(onSubmit)}>
              {subtask ? 'Save' : 'Create'}
            </Button>
          </div>
          {subtask && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full p-1 hover:bg-accent">
                  <Icons.more className="w-4 h-4 rotate-90" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-xs">
                <DropdownMenuItem onClick={() => onDelete(subtask.id)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </form>
    </Form>
  )
}

export default SubtaskForm
