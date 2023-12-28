'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function WeekNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  const offset = parseInt(searchParams.get('offset') || '0')

  const createQueryString = React.useCallback(
    (name: string, value: 'prev' | 'next') => {
      const params = new URLSearchParams(searchParams)

      let newOffset

      if (value === 'prev') {
        newOffset = offset - 1
      }

      if (value === 'next') {
        newOffset = offset + 1
      }

      params.set(name, (newOffset ?? 0).toString())

      return params.toString()
    },
    [searchParams, offset],
  )

  return (
    <div className="flex-gap-sm fixed top-18 right-2">
      <Button
        variant={'outline'}
        size={'icon'}
        onClick={() => router.push(pathname + '?' + createQueryString('offset', 'prev'))}
        className="w-8 h-8 rounded-sm"
        disabled={!offset}
      >
        <Icons.chevronLeft className="w-3 h-3" />
      </Button>
      <Button
        variant={'outline'}
        size={'icon'}
        onClick={() => router.push(pathname + '?' + createQueryString('offset', 'next'))}
        className="w-8 h-8 rounded-sm"
      >
        <Icons.chevronRight className="w-3 h-3" />
      </Button>
      <Button variant={'outline'} onClick={() => router.push(pathname)} className="h-8 rounded-sm">
        Today
      </Button>
    </div>
  )
}
