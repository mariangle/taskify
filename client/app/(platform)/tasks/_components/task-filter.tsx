'use client'

import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
  CommandItem,
} from '@/components/ui/command'

import LabelBadge from '@/components/ui/label-badge'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useRouter, usePathname } from 'next/navigation'
import { SearchParamsOptions, queryParamsMapping } from '@/lib/search-params'
import { LabelResponse } from '@/types'

// https://nextjs.org/docs/app/api-reference/functions/use-search-params

export type FilterOption = keyof SearchParamsOptions | 'clear'

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

  const unsorted = searchParams.get('unsorted')
  const overdue = searchParams.get('overdue')
  const upcoming = searchParams.get('upcoming')
  const incomplete = searchParams.get('incomplete')
  const completed = searchParams.get('completed')
  const labelId = searchParams.get('labelId')

  const selectedLabel = labels?.find((label) => label.id === labelId)

  const createQueryString = React.useCallback(
    (name: FilterOption, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const removeQueryString = (name: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString())

    name === 'clear'
      ? Object.keys(queryParamsMapping).forEach((param) => {
          params.delete(param)
        })
      : params.delete(name)

    const newQueryString = params.toString()

    router.push(`${pathname}?${newQueryString}`)
  }

  const FilterBadge = ({ name, label }: FilterBadgeProps) => {
    return (
      <Badge variant={'secondary'} className="flex-gap mb-2">
        {label}
        <Icons.close className="w-2 h-2 hover:cursor-pointer" onClick={() => removeQueryString(name)} />
      </Badge>
    )
  }

  const FilterOption = ({ name, label }: { name: FilterOption; label: string }) => {
    return (
      <Badge
        variant={'secondary'}
        onClick={() => {
          router.push(pathname + '?' + createQueryString(name, 'true'))
        }}
      >
        {label}
      </Badge>
    )
  }

  const [showFilter, setShowFilter] = React.useState(false)
  const [open, setOpen] = React.useState<boolean>(false)

  const hasFilter = selectedLabel || incomplete || unsorted || completed || overdue || upcoming

  return (
    <div className="sticky top-0">
      <div className="flex-gap flex-wrap">
        {selectedLabel && <FilterBadge name="labelId" label={selectedLabel.name} />}
        {incomplete && <FilterBadge name="incomplete" label="Incomplete" />}
        {unsorted && <FilterBadge name="unsorted" label="Unsorted" />}
        {completed && <FilterBadge name="completed" label="Completed" />}
        {overdue && <FilterBadge name="overdue" label="Overdue" />}
        {upcoming && <FilterBadge name="upcoming" label="Upcoming" />}
        {hasFilter && <FilterBadge name="clear" label="Clear all" />}
      </div>
      <div className="flex-gap">
        {showFilter && (
          <>
            <Button variant={'outline'} size={'sm'}>
              <Icons.menu className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button variant={'outline'} size={'sm'}>
              <Icons.grid className="w-4 h-4 mr-2" />
              Table
            </Button>
            <Button variant={'outline'} size={'sm'}>
              <Icons.kanban className="w-4 h-4 mr-2" />
              Kanban
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size={'sm'}>
                  Category
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-2">
                <div className="flex gap-2">
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
          </>
        )}
        <Button size={'sm'} variant={'outline'} onClick={() => setShowFilter(!showFilter)}>
          <Icons.filter className="w-3 h-3 mr-2" />
          {showFilter ? 'Hide' : 'Show'} filters
        </Button>
      </div>
    </div>
  )
}
