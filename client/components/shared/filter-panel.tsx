'use client'

import React from 'react'

import { Separator } from '@/components/ui/seperator'
import { Badge } from '@/components/ui/badge'
import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'

import LabelBadge from '@/components/ui/label-badge'

import { cn } from '@/lib/util/cn'
import type { LabelResponse } from '@/types'
import { ExtendedSearchParamsOptions, FilterOption, queryParamsMapping } from '@/lib/util/filter'
import { useSearchParams } from 'next/navigation'
import { useFilter } from '@/hooks/use-filter'

interface FilterPanelProps {
  labels: LabelResponse[]
  close: () => void
}

export default function FilterPanel({ labels, close }: FilterPanelProps) {
  const { createQueryString, removeQueryString, view, incomplete, labelId } = useFilter()

  const FilterOption = ({ name, label }: { name: FilterOption; label: string }) => {
    const { [name]: value } = Object.fromEntries(useSearchParams())
    const isFilterApplied = name in queryParamsMapping ? (name === 'labelId' ? !!value : !!value) : false

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
        {isFilterApplied && <Icons.close className="w-4 h-4 hover:cursor-pointer" />}
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
    <Button
      variant={'ghost'}
      onClick={() => createQueryString('view', name!)}
      className={cn(
        'rounded-sm bg-transparent p-0 h-16 cursor-pointer flex-center flex-col text-center',
        view === name && 'bg-popover',
      )}
    >
      {icon}
      {label}
    </Button>
  )

  // TODO: Store urlParams so they don't reset when navigating

  return (
    <>
      <span className="block text-sm font-bold">View</span>
      <div className="my-4 bg-input rounded-md gap-1 p-1 grid grid-cols-3">
        <FilterView name="list" label="List" icon={<Icons.menu className="w-4 h-4 mb-1" />} />
        <FilterView name="table" label="Table" icon={<Icons.grid className="w-4 h-4 mb-1" />} />
        <FilterView name="board" label="Board" icon={<Icons.board className="w-4 h-4 mb-1" />} />
      </div>
      {view !== 'board' && (
        <div className="flex-gap mb-4 w-full">
          <Checkbox checked className="cursor-default" />
          <Label htmlFor="toggle-tasks">Completed tasks</Label>
          <Switch
            id="toggle-tasks"
            className="ml-auto"
            checked={!!incomplete}
            onCheckedChange={() => {
              incomplete ? removeQueryString('incomplete') : createQueryString('incomplete', 'false')
            }}
          />
        </div>
      )}
      <Separator />
      <span className="pt-4 block text-sm font-bold">Status</span>
      <div className="flex-gap flex-wrap my-4">
        <FilterOption name="pending" label="Pending" />
        <FilterOption name="completed" label="Completed" />
        <FilterOption name="overdue" label="Overdue" />
      </div>
      <Separator />
      <span className="pt-4 block text-sm font-bold">Label</span>
      <div className="my-4 flex-gap max-w-full flex-wrap">
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
            {labelId === label.id && <Icons.close className="w-4 h-4 hover:cursor-pointer" />}
          </Badge>
        ))}
      </div>
      <Separator />
      <div className="flex-gap mt-4">
        <Button
          variant={'secondary'}
          className="w-full bg-primary/30 text-primary dark:bg-accent dark:text-foreground hover:bg-primary hover:text-white"
          onClick={() => removeQueryString()}
        >
          Reset
        </Button>
        <Button className="w-full" onClick={close}>
          Done
        </Button>
      </div>
    </>
  )
}
