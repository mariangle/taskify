'use client'

import React, { useCallback, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import LabelBadge from '@/components/ui/label-badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { SearchParamsOptions, queryParamsMapping } from '@/lib/search-params'
import { LabelResponse } from '@/types'

interface ExtendedSearchParamsOptions extends SearchParamsOptions {
  view?: 'kanban' | 'table' | 'list'
  clear: string
  status: 'incomplete' | 'pending' | 'completed'
}

export type FilterOption = keyof ExtendedSearchParamsOptions

interface FilterBadgeProps {
  name: FilterOption
  label: string
}

interface TaskFilterProps {
  labels: LabelResponse[]
}

export default function TaskFilter({ labels }: TaskFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const { unsorted, overdue, upcoming, incomplete, completed, labelId, pending } = Object.fromEntries(useSearchParams())

  // TODO: Sort by createdAt, completedAt, filter by status
  const view = (searchParams.get('view') as ExtendedSearchParamsOptions['view']) ?? 'kanban'

  const selectedLabel = labels?.find((label) => label.id === labelId)

  const createQueryString = useCallback(
    (name: FilterOption, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  const removeQueryString = (name: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString())
    name === 'clear' ? Object.keys(queryParamsMapping).forEach((param) => params.delete(param)) : params.delete(name)
    const newQueryString = params.toString()
    router.push(`${pathname}?${newQueryString}`)
  }

  const FilterBadge = ({ name, label }: FilterBadgeProps) => (
    <Badge variant={'secondary'} className="flex-gap mb-2">
      {label}
      <Icons.close className="w-2 h-2 hover:cursor-pointer" onClick={() => removeQueryString(name)} />
    </Badge>
  )

  const FilterOption = ({ name, label }: { name: FilterOption; label: string }) => (
    <Badge variant={'secondary'} onClick={() => router.push(pathname + '?' + createQueryString(name, 'true'))}>
      {label}
    </Badge>
  )

  const FilterView = ({ name, label }: { name: ExtendedSearchParamsOptions['view']; label: string }) => (
    <Button
      variant={view === name ? 'secondary' : 'ghost'}
      size={'sm'}
      onClick={() => router.push(pathname + '?' + createQueryString('view', name!))}
    >
      <Icons.kanban className="w-4 h-4 mr-2" />
      {label}
    </Button>
  )

  const [showFilter, setShowFilter] = useState(true)
  const [open, setOpen] = useState<boolean>(false)

  const hasFilter = selectedLabel || incomplete || unsorted || completed || overdue || upcoming

  return (
    <div className="sticky top-0 z-50">
      <div className="flex-gap flex-wrap">
        {selectedLabel && <FilterBadge name="labelId" label={selectedLabel.name} />}
        {incomplete && <FilterBadge name="incomplete" label="Incomplete" />}
        {unsorted && <FilterBadge name="unsorted" label="Unsorted" />}
        {pending && <FilterBadge name="pending" label="Pending" />}
        {completed && <FilterBadge name="completed" label="Completed" />}
        {overdue && <FilterBadge name="overdue" label="Overdue" />}
        {upcoming && <FilterBadge name="upcoming" label="Upcoming" />}
        {hasFilter && <FilterBadge name="clear" label="Clear all" />}
      </div>
      <div className="flex-gap justify-between">
        <div className="flex-gap">
          <Button size={'sm'} variant={'outline'} onClick={() => setShowFilter(!showFilter)}>
            <Icons.filter className="w-3 h-3 mr-2" />
            {showFilter ? 'Hide' : 'Filters'}
          </Button>
          <Button size={'sm'} variant={'outline'} onClick={() => setShowFilter(!showFilter)}>
            <Icons.sort className="w-3 h-3 mr-2" />
            {showFilter ? 'Hide' : 'Sort'}
          </Button>
          {showFilter && (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size={'sm'}>
                    Category
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit p-2">
                  <div className="flex gap-2 max-w-[250px] flex-wrap">
                    {!unsorted && <FilterOption name="unsorted" label="Unsorted" />}
                    {!overdue && <FilterOption name="overdue" label="Overdue" />}
                    {!upcoming && <FilterOption name="upcoming" label="Upcoming" />}
                    {!incomplete && <FilterOption name="incomplete" label="Incomplete" />}
                    {!completed && <FilterOption name="completed" label="Completed" />}
                  </div>
                </PopoverContent>
              </Popover>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    size={'sm'}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-fit justify-between truncate ..."
                  >
                    {labelId ? selectedLabel?.name : 'Label'}
                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search labels..." />
                    <CommandEmpty>No label found.</CommandEmpty>
                    <CommandGroup>
                      {labels.map((label) => (
                        <CommandItem
                          key={label.id}
                          value={label.name}
                          onSelect={() => {
                            labelId
                              ? removeQueryString('labelId')
                              : router.push(pathname + '?' + createQueryString('labelId', label.id))
                            setOpen(false)
                          }}
                        >
                          <LabelBadge key={label.id} label={label} noBorder />
                          <Icons.check
                            className={cn(
                              'ml-2 h-4 w-4',
                              selectedLabel?.name === label.name ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                      <CommandSeparator />
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Status</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuCheckboxItem
                    checked={!!incomplete}
                    onCheckedChange={(checked) => {
                      checked
                        ? router.push(pathname + '?' + createQueryString('incomplete', 'true'))
                        : removeQueryString('incomplete')
                    }}
                  >
                    Incomplete
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={!!pending}
                    onCheckedChange={(checked) => {
                      checked
                        ? router.push(pathname + '?' + createQueryString('pending', 'true'))
                        : removeQueryString('pending')
                    }}
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={!!completed}
                    onCheckedChange={(checked) => {
                      checked
                        ? router.push(pathname + '?' + createQueryString('completed', 'true'))
                        : removeQueryString('completed')
                    }}
                  >
                    Completed
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
        <div className="flex-gap-sm">
          <FilterView name="list" label="List" />
          <FilterView name="table" label="Table" />
          <FilterView name="kanban" label="Kanban" />
        </div>
      </div>
    </div>
  )
}
