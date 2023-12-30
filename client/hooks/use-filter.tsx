import { useRouter, usePathname } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { queryParamsMapping, ExtendedSearchParamsOptions, FilterOption } from '@/lib/util/filter'

export const useFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const offset = parseInt(searchParams.get('offset') ?? '0')
  const view = (searchParams.get('view') as ExtendedSearchParamsOptions['view']) ?? 'list'
  const incomplete = searchParams.get('incomplete') ?? false
  const labelId = searchParams.get('labelId')
  const overdue = searchParams.get('overdue') ?? false

  const createQueryString = (name: FilterOption, value: string | 'prev' | 'next') => {
    const params = new URLSearchParams(searchParams)

    if (value === 'prev' || value === 'next') {
      const newOffset = value === 'prev' ? offset - 1 : offset + 1
      params.set(name, (newOffset ?? 0).toString())
    } else {
      params.set(name, value)
    }

    const newQueryString = params.toString()
    router.push(`${pathname}?${newQueryString}`)
  }

  const removeQueryString = (name?: FilterOption) => {
    const params = new URLSearchParams(searchParams.toString())

    if (!name) {
      Object.keys(queryParamsMapping).forEach((param) => params.delete(param))
    } else {
      params.delete(name)
    }
    const newQueryString = params.toString()
    router.push(`${pathname}?${newQueryString}`)
  }

  return {
    createQueryString,
    removeQueryString,
    searchParams,
    pathname,
    view,
    offset,
    incomplete,
    labelId,
    overdue,
  }
}
