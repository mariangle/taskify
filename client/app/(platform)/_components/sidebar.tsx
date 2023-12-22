'use client'

import React from 'react'
import { SideNav } from './side-nav'
import { useLayoutStore } from '@/store/layout-store'

import { cn } from '@/lib/util/cn'
import { Separator } from '@/components/ui/seperator'
import { ToggleTheme } from './toggle-theme'

export default function Sidebar() {
  const { showSidebar } = useLayoutStore()

  // TODO: This might work as mobile menu as well?

  return (
    <aside
      className={cn(
        `relative h-screen border-r block duration-500 dark:bg-zinc-950`,
        showSidebar ? 'w-44' : 'w-0 md:w-[68px]',
      )}
    >
      <div className={cn('h-full', showSidebar ? '' : 'hidden md:block')}>
        <div className="flex flex-col justify-between h-full">
          <SideNav />
          <div className="w-full space-y-4 p-3">
            <Separator />
            <div className="space-y-2">
              <ToggleTheme />
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
