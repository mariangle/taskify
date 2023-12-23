'use client'

import * as React from 'react'

import { Icons } from '@/components/shared/icons'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/util/cn'
import { ListResponse } from '@/types'
import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form'

interface ListComboboxProps<T extends FieldValues> {
  form: UseFormReturn<T>
  register: Path<T>
  lists: ListResponse[]
  defaultValue?: string
}

export default function SelectList<T extends FieldValues>({
  form,
  defaultValue,
  register,
  lists,
}: ListComboboxProps<T>) {
  const defaultListValue = lists.find((l) => l.id === defaultValue)?.name

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultListValue)

  const onSelect = (list?: ListResponse) => {
    if (list) {
      setValue(list.name === value ? '' : list.name)
      setOpen(false)
      form.setValue(register, list.id as PathValue<T, Path<T>>)
    } else {
      setValue('Inbox')
      setOpen(false)
      form.unregister(register)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="ghost" size={'sm'} role="combobox" aria-expanded={open} className="w-fit justify-between">
          {value ? value : 'Inbox'}
          <Icons.chevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-0">
        <Command>
          <CommandGroup>
            <CommandItem value="inbox" onSelect={() => onSelect()}>
              <Icons.check className={cn('mr-2 h-4 w-4', value === 'Inbox' ? 'opacity-100' : 'opacity-0')} />
              Inbox
            </CommandItem>
            {lists.map((item) => (
              <CommandItem key={item.id} value={item.id} onSelect={() => onSelect(item)}>
                <Icons.check className={cn('mr-2 h-4 w-4', value === item.name ? 'opacity-100' : 'opacity-0')} />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
