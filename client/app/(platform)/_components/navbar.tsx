'use client'

import React from 'react'
import UserMenu from './user-nav'
import { ListResponse, TaskResponse } from '@/types'
import SearchMenu from '@/components/search-menu'
import { useGlobalStore } from '@/hooks/use-global-store'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from './mobile-sidebar'

interface NavbarProps {
  tasks: TaskResponse[]
  lists: ListResponse[]
}
const Navbar = ({ tasks, lists }: NavbarProps) => {
  const { showSidebar, toggleSidebar } = useGlobalStore()

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
    <header className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-3">
        <div className="flex-gap">
          <div className={cn('block md:!hidden')}>
            <MobileSidebar lists={lists} />
          </div>
          <div className={cn('md:!block hidden')}>
            <Button variant={'outline'} onClick={toggleSidebar}>
              <Icons.chevronLeft
                className={cn('w-3 h-3 transition duration-300', showSidebar ? 'rotate-180 transform' : '')}
              />
            </Button>
          </div>
          <SearchMenu tasks={tasks} />
        </div>
        <div className="flex-gap">
          <Button variant={'outline'}>
            <Icons.bell className="w-4 h-4" />
          </Button>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Navbar
