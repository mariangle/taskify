'use client'

import * as React from 'react'
import toast from 'react-hot-toast'

import { Icons } from '@/components/ui/icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form'
import { TaskResponse } from '@/types'
import { TaskService } from '@/services/task-service'
import { handleError } from '@/lib/util'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/util/cn'

interface FormVariant<T extends FieldValues> {
  type: 'form'
  form: UseFormReturn<T>
  register: Path<T>
}

interface TaskVariant {
  type: 'dropdown'
  task: TaskResponse
}

interface PriorityPickerProps<T extends FieldValues> {
  variant: FormVariant<T> | TaskVariant
  defaultValue?: string
  small?: boolean
}

export function PriorityPicker<T extends FieldValues>({
  variant,
  defaultValue,
  small = false,
}: PriorityPickerProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const onSelect = async (priority: string) => {
    setOpen(false)
    setValue(priority)

    if ('form' in variant) {
      const { form, register } = variant as FormVariant<T>
      form.setValue(register, priority as PathValue<T, Path<T>>)
    }

    if ('task' in variant) {
      const { task } = variant as TaskVariant
      setIsLoading(true)
      try {
        await TaskService.updateTask(task.id, { ...task, priority: priority })
        toast.success('Changes saved.')
        router.refresh()
      } catch (err) {
        handleError(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const onRemove = async () => {
    setOpen(false)
    setValue(undefined)

    if ('form' in variant) {
      const { form, register } = variant as FormVariant<T>
      form.unregister(register)
    }

    if ('task' in variant) {
      const { task } = variant as TaskVariant
      await removePriority(task)
    }
  }

  const removePriority = async (task: TaskResponse) => {
    setIsLoading(true)
    try {
      await TaskService.updateTask(task.id, { ...task, priority: undefined })
      toast.success('Priority removed.')
      router.refresh()
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const priority = priorities.find((p) => p.value === value)

  if ('task' in variant) {
    return (
      <div>
        {priorities.map((priority) => (
          <Button
            key={priority.value}
            size={'sm'}
            variant={value === priority.value ? 'secondary' : 'ghost'}
            onClick={() => onSelect(priority.value)}
          >
            <Icons.flag className="w-4 h-4" style={{ color: priority.color }} />
          </Button>
        ))}
        <Button size={'sm'} variant={value ? 'ghost' : 'secondary'} onClick={onRemove}>
          <Icons.flag className="w-4 h-4" />
        </Button>
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger aria-expanded={open} className={cn(buttonVariants({ variant: 'outline' }), 'w-fit gap-2')}>
        <Icons.flag className="w-4 h-4" style={{ color: priority?.color }} />
        {value ? (
          <>
            {value}
            <Icons.close className="w-4 h-4" onClick={onRemove} />
          </>
        ) : (
          <>{!small && <span>Priority</span>}</>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1">
        {priorities.map((priority) => (
          <PriorityItem key={priority.value} priority={priority} onSelect={onSelect} />
        ))}
        <Button onClick={onRemove} variant={'ghost'} className="w-full justify-start px-2 h-8">
          <Icons.flag className="w-4 h-4 mr-2" />
          None
        </Button>
      </PopoverContent>
    </Popover>
  )
}

type Priority = { value: string; color: string }

const priorities: Priority[] = [
  { value: 'High', color: '#EF4444' },
  { value: 'Medium', color: '#EAB308' },
  { value: 'Low', color: '#0EA5E9' },
]
interface PriorityItemProps {
  priority: Priority
  onSelect: (priority: string) => void
}

const PriorityItem: React.FC<PriorityItemProps> = ({ priority, onSelect }) => (
  <Button onClick={() => onSelect(priority.value)} variant={'ghost'} className="w-full justify-start px-2 h-8">
    <Icons.flag className="w-4 h-4 mr-2" style={{ color: priority.color }} />
    {priority.value}
  </Button>
)
