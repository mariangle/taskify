'use client'

import { usePathname } from 'next/navigation'
import { Icons } from '@/components/shared/icons'

export default function Breadcrumbs() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter((segment) => segment !== '')

  const formatSegment = (segment: string): string => {
    return segment.replace(/-/g, ' ')
  }

  return (
    <ul className="flex-gap-sm text-sm">
      {segments.map((segment, index) => (
        <li key={index} className="flex-gap-sm">
          {formatSegment(segment)}
          {index !== segments.length - 1 && <Icons.chevronRight className="w-2 h-2" />}
        </li>
      ))}
    </ul>
  )
}
