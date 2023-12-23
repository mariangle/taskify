'use client'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'
import { cn } from '@/lib/util/cn'
import { buttonVariants } from '@/components/ui/button'
import SearchMenu from '@/app/(platform)/_components/search-menu'
import { config } from '@/lib/config'
import UserNav from './user-nav'
import { useLayoutStore } from '@/store/layout-store'
import React from 'react'
import { Separator } from '@/components/ui/seperator'

export function SideNav() {
  const path = usePathname()
  const { showSidebar, toggleTask } = useLayoutStore()

  return (
    <nav>
      <div className="h-14">
        <UserNav />
      </div>
      <div className="px-3">
        <Button variant={'ghost'} className="flex justify-start px-2 w-full" onClick={toggleTask}>
          <div className="bg-primary rounded-full p-1 ml-[2px]">
            <Icons.add className="h-3 w-3 text-white" />
          </div>
          <span className={cn('ml-2 block text-primary', !showSidebar && 'md:hidden')}>Add task</span>
        </Button>
      </div>
      <SearchMenu />
      <div className="px-4 py-1">
        <Separator />
      </div>
      {config.platform.links.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group relative flex h-12 justify-start rounded-none border-r-2 border-transparent text-muted-foreground',
            path === item.href || (item.href === '/lists' && path.includes('lists'))
              ? 'bg-gradient-to-l from-primary/20 border-primary hover:bg-primary/25 text-foreground'
              : '',
          )}
        >
          <div className="ml-2">
            <item.icon
              className={cn(
                'h-4 w-4',
                path === item.href || (item.href === '/lists' && path.includes('lists')) ? 'text-primary' : '',
              )}
            />
          </div>
          {<span className={cn('ml-2 block', !showSidebar && 'md:hidden')}>{item.label}</span>}
        </Link>
      ))}
    </nav>
  )
}
