'use client'

import * as React from 'react'
import toast from 'react-hot-toast'

import { Icons } from '@/components/ui/icons'
import { Calendar } from '@/components/ui/calendar'
import { Separator } from '@/components/ui/seperator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Armchair, CalendarCheck2, CircleSlash, Sunset } from 'lucide-react'

import { cn } from '@/lib/util/cn'
import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form'
import { Button, buttonVariants } from '@/components/ui/button'
import { addDays, format, formatDistance } from 'date-fns'
import { TaskResponse } from '@/types'
import { TaskService } from '@/services/task-service'
import { handleError } from '@/lib/util'
import { useMounted } from '@/hooks/use-mounted'
import { useRouter } from 'next/navigation'

interface FormVariant<T extends FieldValues> {
  type: 'form'
  form: UseFormReturn<T>
  register: Path<T>
}

interface TaskVariant {
  type: 'item' | 'dropdown'
  task: TaskResponse
}

interface DatePickerProps<T extends FieldValues> {
  variant: FormVariant<T> | TaskVariant
  defaultValue?: Date | string
  small?: boolean
}

export function DatePicker<T extends FieldValues>({ defaultValue, variant, small = false }: DatePickerProps<T>) {
  // Convert defaultValue to Date if it's a string
  const defaultDate = defaultValue
    ? typeof defaultValue === 'string'
      ? new Date(defaultValue)
      : defaultValue
    : undefined

  const isMounted = useMounted()
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<Date | undefined>(defaultDate || undefined)

  if (!isMounted) return null

  const onSelect = async (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue(selectedDate)
      setOpen(false)

      if ('form' in variant) {
        const { form, register } = variant as FormVariant<T>
        form.setValue(register, selectedDate as PathValue<T, Path<T>>)
      }

      if ('task' in variant) {
        const { task } = variant as TaskVariant
        setIsLoading(true)
        try {
          await TaskService.updateTask(task.id, { ...task, dueDate: selectedDate })
          toast.success('Changes saved.')
          router.refresh()
        } catch (err) {
          handleError(err)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  const onRemove = async () => {
    setValue(undefined)
    setOpen(false)

    if ('form' in variant) {
      const { form, register } = variant as FormVariant<T>
      form.unregister(register)
    }

    if ('task' in variant) {
      const { task } = variant as TaskVariant
      await removeDate(task)
    }
  }

  const removeDate = async (task: TaskResponse) => {
    setIsLoading(true)
    try {
      await TaskService.updateTask(task.id, { ...task, dueDate: undefined })
      toast.success('Due date removed.')
      router.refresh()
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const dateOptions = [
    { value: '0', label: 'Today', icon: CalendarCheck2 },
    { value: '1', label: 'Tomorrow', icon: Sunset },
    { value: '7', label: 'In a week', icon: Armchair },
  ]

  const DropdownPopover = () => {
    return (
      <div className="flex items-center">
        {dateOptions.map((option) => (
          <Button
            key={option.value}
            size={'sm'}
            variant={'ghost'}
            onClick={() => onSelect(addDays(new Date(), parseInt(option.value)))}
          >
            <option.icon className="h-4 w-4" />
          </Button>
        ))}
        <PopoverTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
          <Icons.more className="h-3 w-3" />
        </PopoverTrigger>
      </div>
    )
  }

  const ItemPopoverTrigger = () => {
    const { task } = variant as TaskVariant
    return (
      <>
        {task.dueDate && (
          <PopoverTrigger className={cn(buttonVariants({ variant: 'picker', size: 'icon' }), 'w-fit px-1')}>
            <Icons.calendar className="h-3 w-3 mr-1" />
            <span className="text-xs">
              {value && formatDistance(new Date(task.dueDate), new Date(), { addSuffix: true })}
            </span>
          </PopoverTrigger>
        )}
      </>
    )
  }

  const FormPopoverTrigger = () => {
    return (
      <PopoverTrigger className={cn(buttonVariants({ variant: 'outline' }), 'w-fit gap-2')}>
        <Icons.calendar className="h-4 w-4" />
        {value ? (
          <span className="flex-gap">
            {format(value, 'dd-MM-yyyy')}
            <Icons.close className="h-4 w-4" onClick={onRemove} />
          </span>
        ) : (
          <>{!small && <span>Schedule</span>}</>
        )}
      </PopoverTrigger>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      {variant.type === 'item' ? (
        <ItemPopoverTrigger />
      ) : variant.type === 'dropdown' ? (
        <DropdownPopover />
      ) : (
        <FormPopoverTrigger />
      )}
      <PopoverContent className="max-w-[260px] overflow-hidden">
        <div className="py-2">
          {dateOptions.map((option) => (
            <Button
              key={option.value}
              className="w-full justify-start text-xs px-3 h-6 rounded-none"
              variant={'ghost'}
              onClick={() => onSelect(addDays(new Date(), parseInt(option.value)))}
            >
              <option.icon className="h-4 w-4 mr-2" />
              {option.label}
              <span className="ml-auto text-xs text-muted-foreground">
                {format(addDays(new Date(), parseInt(option.value)), 'EEEE')}
              </span>
            </Button>
          ))}
          <Button className="w-full justify-start text-xs px-3 h-6 rounded-none" variant={'ghost'} onClick={onRemove}>
            <CircleSlash className="h-4 w-4 mr-2" />
            No Date
          </Button>
        </div>
        <Separator />
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          initialFocus
          className="overflow-y-auto rounded-sm p-1"
        />
      </PopoverContent>
    </Popover>
  )
}
