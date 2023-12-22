'use client'

import * as React from 'react'

import { cn } from '@/lib/util/cn'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form'
import { Icons } from '@/components/icons'
import { priorities } from '@/lib/constants'
import { LucideIcon } from 'lucide-react'

interface SelectDueDateProps<T extends FieldValues> {
  form: UseFormReturn<T>
  register: Path<T>
  defaultValue?: string
}

export default function SelectPriority<T extends FieldValues>({
  form,
  defaultValue,
  register,
  ...props
}: SelectDueDateProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)

  const onSelect = (priority: string) => {
    setOpen(false)
    setValue(priority)
    form.setValue(register, priority as PathValue<T, Path<T>>)
  }

  const onRemove = () => {
    setValue(undefined)
    form.unregister(register)
  }

  const priority = priorities.find((p) => p.label === value)

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button variant={value ? 'secondary' : 'outline'} size="sm" aria-expanded={open} className="w-fit">
          {value ? (
            <>
              {priority?.icon && <priority.icon className="w-4 h-4 mr-1" />}
              {value}
              <Icons.close className="w-4 h-4 ml-2" onClick={onRemove} />
            </>
          ) : (
            <>
              <Icons.flag className="w-4 h-4 mr-1" />
              Priority
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]">
        {priorities.map((priority) => (
          <PriorityItem key={priority.id} priority={priority} onSelect={onSelect} />
        ))}
      </PopoverContent>
    </Popover>
  )
}

interface PriorityItemProps {
  priority: { id: number; value: string; label: string; icon: LucideIcon }
  onSelect: (priority: string) => void
}

const PriorityItem: React.FC<PriorityItemProps> = ({ priority, onSelect }) => (
  <Button onClick={() => onSelect(priority.value)} variant={'ghost'} className="w-full justify-start px-3">
    <priority.icon className="w-4 h-4 mr-1" />
    {priority.label}
  </Button>
)
