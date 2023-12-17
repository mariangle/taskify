'use client'

import React from 'react'
import UserMenu from './user-nav'
import PromptModal from '@/components/modals/prompt-modal'
import { TaskResponse } from '@/types'
import SearchMenu from '@/components/search-menu'
import { useGlobalStore } from '@/hooks/use-global-store'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'

interface NavbarProps {
  tasks: TaskResponse[] | []
}
const Navbar = ({ tasks }: NavbarProps) => {
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex-gap">
          <Button variant={'outline'} onClick={toggleSidebar}>
            <Icons.chevronLeft
              className={cn('w-3 h-3 transition duration-300', showSidebar ? 'rotate-180 transform' : '')}
            />
          </Button>
          <SearchMenu tasks={tasks} />
        </div>
        <div className="flex-gap">
          <PromptModal />
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Navbar
