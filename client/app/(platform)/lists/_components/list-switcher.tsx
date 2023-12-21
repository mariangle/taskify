'use client'

import * as React from 'react'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/util/cn'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ListResponse } from '@/types'
import ListService from '@/services/list-service'
import { useSignalStore } from '@/store/signal-store'
import { useParams, usePathname, useRouter } from 'next/navigation'

export default function ListSwitcher() {
  const params = useParams()
  const router = useRouter()
  const path = usePathname()

  const { signal } = useSignalStore()

  const [open, setOpen] = React.useState(false)
  const [lists, setLists] = React.useState<ListResponse[]>()

  React.useEffect(() => {
    const getLists = async () => {
      const lists = await ListService.getLists()
      setLists(lists)
    }
    getLists()
  }, [signal, params.listId])

  if (!path.includes('lists')) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-32 justify-between truncate ...">
          {lists?.find((l) => l.id === params.listId)?.name || 'Select list'}
          <Icons.chevronUpDown className="ml-2 w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search list..." />
          <CommandEmpty>No list found.</CommandEmpty>
          <CommandGroup>
            {lists?.map((item) => (
              <CommandItem
                key={item.id}
                value={item.name}
                onSelect={() => {
                  setOpen(false)
                  router.push(`/lists/${item.id}`)
                }}
              >
                <Icons.dot className={cn('h-6 w-6', true ? 'opacity-100' : 'opacity-0')} />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
