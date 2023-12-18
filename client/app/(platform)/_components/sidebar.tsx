'use client'

import React from 'react'
import { SideNav } from './side-nav'
import { useGlobalStore } from '@/hooks/use-global-store'

import { cn } from '@/lib/util/cn'
import { Separator } from '@/components/ui/seperator'
import { ToggleTheme } from './toggle-theme'

export default function Sidebar() {
  const { showSidebar, switch: switchState } = useGlobalStore()

  return (
    <aside
      className={cn(
        `relative hidden h-screen border-r md:block`,
        switchState && 'duration-500',
        showSidebar ? 'w-44' : 'w-[68px]',
      )}
    >
      <div className="flex flex-col justify-between h-full">
        <SideNav />
        <div className="w-full space-y-4 p-3">
          <Separator />
          <div className="space-y-2">
            <ToggleTheme />
          </div>
        </div>
      </div>
    </aside>
  )
}
