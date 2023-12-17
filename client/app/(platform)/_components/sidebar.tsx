'use client'

import React from 'react'
import { SideNav } from './side-nav'
import { useGlobalStore } from '@/hooks/use-global-store'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/seperator'
import { ListResponse } from '@/types'
import { ToggleTheme } from './toggle-theme'

interface SidebarProps {
  lists?: ListResponse[]
}

export default function Sidebar({ lists }: SidebarProps) {
  const { showSidebar, switch: switchState } = useGlobalStore()

  const className =
    'text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100'

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-14 md:block`,
        switchState && 'duration-500',
        showSidebar ? 'w-52' : 'w-[78px]',
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <SideNav className={className} lists={lists} />
        <div className="w-full space-y-4 p-3">
          <Separator />
          <div className="space-y-2">
            <ToggleTheme />
            <Button variant={'theme'} className={cn('w-full flex', showSidebar ? 'justify-start' : 'justify-center')}>
              <Icons.add className="h-4 w-4" />
              <span className={cn('absolute left-14 duration-1000', !showSidebar && className)}>New Task</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
