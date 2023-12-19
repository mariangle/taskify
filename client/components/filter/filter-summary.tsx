'use client'
import { Badge } from '@/components/ui/badge'
import { FilterOption } from '@/lib/util/filter'
import { Icons } from '@/components/icons'

import { queryParamsMapping } from '@/lib/util/filter'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LabelResponse } from '@/types'

interface FilterBadgeProps {
  name: FilterOption
  label: string
}

export default function FilterSummary({ labels }: { labels: LabelResponse[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const path = usePathname()

  const { unsorted, overdue, incomplete, completed, labelId, pending } = Object.fromEntries(useSearchParams())

  const removeQueryString = (name: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString())
    name === 'clear' ? Object.keys(queryParamsMapping).forEach((param) => params.delete(param)) : params.delete(name)
    const newQueryString = params.toString()
    router.push(`${path}?${newQueryString}`)
  }

  const FilterBadge = ({ name, label }: FilterBadgeProps) => (
    <Badge variant={'secondary'} className="flex-gap mb-2">
      {label}
      <Icons.close className="w-2 h-2 hover:cursor-pointer" onClick={() => removeQueryString(name)} />
    </Badge>
  )
  const selectedLabel = labels?.find((label) => label.id === labelId)
  const hasFilter = selectedLabel || incomplete || unsorted || pending || completed || overdue

  return (
    <div className="flex-gap flex-wrap">
      {selectedLabel && <FilterBadge name="labelId" label={selectedLabel.name} />}
      {incomplete && <FilterBadge name="incomplete" label="Incomplete" />}
      {unsorted && <FilterBadge name="unsorted" label="Unsorted" />}
      {pending && <FilterBadge name="pending" label="Pending" />}
      {completed && <FilterBadge name="completed" label="Completed" />}
      {overdue && <FilterBadge name="overdue" label="Overdue" />}
      {hasFilter && <FilterBadge name="clear" label="Clear all" />}
    </div>
  )
}
