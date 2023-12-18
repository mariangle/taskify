'use client'

import React from 'react'
import { useGlobalStore } from '@/hooks/use-global-store'
import { cn } from '@/lib/util/cn'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from './mobile-sidebar'

const Navbar = () => {
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
            <MobileSidebar />
          </div>
          <div className={cn('md:!block hidden')}>
            <Button variant={'outline'} onClick={toggleSidebar}>
              <Icons.chevronLeft
                className={cn('w-3 h-3 transition duration-300', showSidebar ? 'rotate-180 transform' : '')}
              />
            </Button>
          </div>
        </div>
        <div className="flex-gap"></div>
      </div>
    </header>
  )
}

export default Navbar
