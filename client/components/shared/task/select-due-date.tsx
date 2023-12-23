'use client'

import * as React from 'react'

import { cn } from '@/lib/util/cn'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { Icons } from '@/components/shared/icons'
import { format, formatISO } from 'date-fns'

interface SelectDueDateProps<T extends FieldValues> {
  form: UseFormReturn<T>
  register: Path<T>
  defaultValue?: Date | string
}

export default function SelectDueDate<T extends FieldValues>({ form, defaultValue, register }: SelectDueDateProps<T>) {
  // Convert defaultValue to Date if it's a string
  const defaultDate = defaultValue
    ? typeof defaultValue === 'string'
      ? new Date(defaultValue)
      : defaultValue
    : undefined

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<Date | undefined>(defaultDate || undefined)

  const onSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue(selectedDate)
      setOpen(false)
      form.setValue(register, formatISO(selectedDate) as PathValue<T, Path<T>>)
    }
  }

  const onRemove = () => {
    setValue(undefined)
    form.unregister(register)
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        {value ? (
          <Button variant={'secondary'} size={'sm'} className={cn('w-fit justify-start')}>
            <Icons.calendar className="mr-2 h-4 w-4" />
            <span className="flex-gap">
              {format(value, 'dd-MM-yyyy')}
              <Icons.close className="h-4 w-4" onClick={onRemove} />
            </span>
          </Button>
        ) : (
          <Button variant={'outline'} size={'sm'} className={cn('w-fit justify-start')}>
            <Icons.calendar className="mr-2 h-4 w-4" />
            <span>Schedule</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full" align="start">
        <Calendar mode="single" selected={value} onSelect={onSelect} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
