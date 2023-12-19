'use client'

import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import LabelBadge from '@/components/ui/label-badge'
import { Separator } from '@/components/ui/seperator'
import { cn } from '@/lib/util/cn'
import { LabelResponse } from '@/types'
import { queryParamsMapping, ExtendedSearchParamsOptions, FilterOption } from '@/lib/util/filter'

interface TaskFilterProps {
  labels: LabelResponse[]
  close: () => void
}

export default function TaskFilter({ labels, close }: TaskFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { labelId } = Object.fromEntries(useSearchParams())

  const view = (searchParams.get('view') as ExtendedSearchParamsOptions['view']) ?? 'list'

  const createQueryString = (name: FilterOption, value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(name, value)
    const newQueryString = params.toString()

    router.push(`${pathname}?${newQueryString}`)
  }

  const removeQueryString = (name: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString())
    name === 'clear' ? Object.keys(queryParamsMapping).forEach((param) => params.delete(param)) : params.delete(name)
    const newQueryString = params.toString()
    router.push(`${pathname}?${newQueryString}`)
  }

  const FilterOption = ({ name, label }: { name: FilterOption; label: string }) => {
    const { unsorted, overdue, incomplete, completed, labelId, pending } = Object.fromEntries(useSearchParams())
    const isFilterApplied =
      name === 'unsorted'
        ? unsorted
        : name === 'overdue'
        ? overdue
        : name === 'incomplete'
        ? incomplete
        : name === 'completed'
        ? completed
        : name === 'labelId'
        ? !!labelId
        : name === 'pending'
        ? pending
        : false

    return (
      <Badge
        variant={'outline'}
        onClick={() => (isFilterApplied ? removeQueryString(name) : createQueryString(name, 'true'))}
        className={cn(
          'rounded-sm bg-transparent p-2 cursor-pointer flex-gap',
          isFilterApplied && 'bg-primary/10 border-primary text-primary dark:text-foreground',
        )}
      >
        {label}
        {isFilterApplied && <Icons.close className="w-2 h-2 hover:cursor-pointer" />}
      </Badge>
    )
  }

  const FilterView = ({
    name,
    label,
    icon,
  }: {
    name: ExtendedSearchParamsOptions['view']
    label: string
    icon: React.ReactNode
  }) => (
    <Badge
      variant={'outline'}
      onClick={() => createQueryString('view', name!)}
      className={cn(
        'rounded-sm bg-transparent p-2 cursor-pointer flex-gap',
        view === name && 'bg-primary/10 border-primary text-primary dark:text-foreground',
      )}
    >
      {icon}
      {label}
    </Badge>
  )

  // TODO: Store urlParams so they don't reset when navigating

  return (
    <div>
      <div>
        <div className="font-semibold">Filter</div>
        <span className="pt-2 block text-sm font-medium">View</span>
        <div className="flex-gap-sm my-2">
          <FilterView name="list" label="List" icon={<Icons.menu className="w-4 h-4" />} />
          <FilterView name="table" label="Table" icon={<Icons.grid className="w-4 h-4" />} />
          <FilterView name="kanban" label="Kanban" icon={<Icons.kanban className="w-4 h-4" />} />
        </div>
        <Separator />
        <span className="pt-2 block text-sm font-medium">Status</span>
        <div className="flex-gap flex-wrap my-2">
          <FilterOption name="incomplete" label="Incomplete" />
          <FilterOption name="pending" label="Pending" />
          <FilterOption name="completed" label="Completed" />
          <FilterOption name="overdue" label="Overdue" />
        </div>
        <Separator />
        <span className="pt-2 block text-sm font-medium">Label</span>
        <div className="my-2">
          {labels.map((label) => (
            <Badge
              key={label.id}
              variant={'outline'}
              className={cn(
                'rounded-sm bg-transparent p-2 cursor-pointer flex-gap',
                labelId === label.id && 'bg-primary/25 border-primary',
              )}
              onClick={() => (labelId ? removeQueryString('labelId') : createQueryString('labelId', label.id))}
            >
              <LabelBadge key={label.id} label={label} noBorder />
              {labelId === label.id && <Icons.close className="w-2 h-2 hover:cursor-pointer" />}
            </Badge>
          ))}
        </div>
        <Separator />
        <div className="flex-gap mt-4">
          <Button
            variant={'secondary'}
            className="w-full bg-primary/30 text-primary dark:bg-accent dark:text-foreground hover:text-background"
            onClick={() => removeQueryString('clear')}
          >
            Reset
          </Button>
          <Button className="w-full" variant={'theme'} onClick={close}>
            Done
          </Button>
        </div>
      </div>
    </div>
  )
}
