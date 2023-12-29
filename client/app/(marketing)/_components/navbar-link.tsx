'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/util/cn'

interface NavbarLinkProps {
  link: {
    title: string
    href: string
  }
}

export default function NavbarLink({ link }: NavbarLinkProps) {
  const path = usePathname()
  const isActive = path === link.href || (link.href === '/docs/getting-started' && path.includes('docs'))

  return (
    <li key={link.href}>
      <Link
        href={link.href}
        aria-current="page"
        className={cn('text-sm text-muted-foreground hover:text-foreground', isActive && 'text-foreground')}
      >
        {link.title}
      </Link>
    </li>
  )
}
