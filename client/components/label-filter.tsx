'use client'

import * as React from 'react'
import { Icons } from '@/components/icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import LabelBadge from '@/components/ui/label-badge'
import { useRouter, useSearchParams } from 'next/navigation'
import { LabelResponse } from '@/types'
import Link from 'next/link'

interface LabelSwitcherProps {
  labels: LabelResponse[] | []
}

export default function LabelFilter({ labels }: LabelSwitcherProps) {
  const searchParams = useSearchParams()
  const labelId = searchParams.get('labelId')
  const router = useRouter()
  const selectedLabel = labels.find((label) => label.id === labelId)
  const [open, setOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>(selectedLabel?.name ?? '')

  // TODO: Create filter store

  const handleLabelSelect = (currentValue: string, labelId: string) => {
    setValue(currentValue === value ? '' : currentValue)
    setOpen(false)
    router.push(currentValue === value ? `/tasks` : `/tasks?labelId=${labelId}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[100px] justify-between">
          {value ? labels.find((label) => label.name === value)?.name : 'Filter'}
          <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search labels..." />
          <CommandEmpty>No label found.</CommandEmpty>
          <CommandGroup>
            {labels.map((label) => (
              <CommandItem
                key={label.id}
                value={label.name}
                onSelect={(currentValue) => handleLabelSelect(currentValue, label.id)}
              >
                <LabelBadge key={label.id} label={label} noBorder />
                <Icons.check className={cn('ml-2 h-4 w-4', value === label.name ? 'opacity-100' : 'opacity-0')} />
              </CommandItem>
            ))}
            <CommandSeparator />
            <CommandItem>
              <Link href={'/settings/labels'} onClick={() => setOpen(false)}>
                Edit Labels
              </Link>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
