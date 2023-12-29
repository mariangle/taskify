'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/util/cn'

interface SidebarLinkProps {
  link: {
    text: string
    href: string
  }
}

export default function SidebarLink({ link }: SidebarLinkProps) {
  const path = usePathname()
  const isActive = path === link.href

  return (
    <Link
      href={link.href}
      className={cn(
        'block text-muted-foreground hover:text-foreground border-l px-4 py-1 hover:border-l-gray-400',
        isActive && 'text-purple-500  border-l-purple-500',
      )}
    >
      {link.text}
    </Link>
  )
}
