'use client'

import React from 'react'
import SideNav from './side-nav'
import { useLayoutStore } from '@/store/layout-store'

import { cn } from '@/lib/util/cn'
import { ListResponse } from '@/types'

export default function Sidebar({ lists }: { lists: ListResponse[] }) {
  const { showSidebar, toggleSidebar } = useLayoutStore()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleSidebar()
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [toggleSidebar])

  return (
    <aside
      className={cn(
        `relative h-screen border-r border-border duration-500 hidden md:block flex-shrink-0 bg-background`,
        showSidebar ? 'w-56' : 'w-0 md:w-16',
      )}
    >
      <div className={cn('h-full', showSidebar ? '' : 'hidden md:block')}>
        <SideNav lists={lists} />
      </div>
    </aside>
  )
}
