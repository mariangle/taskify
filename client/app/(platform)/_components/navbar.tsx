'use client'

import * as React from 'react'

import FilterOverlay from '@/components/modals/filter-overlay'

import { useLayoutStore } from '@/store/layout-store'
import { cn } from '@/lib/util/cn'
import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from './mobile-sidebar'
import { ListResponse } from '@/types'

const Navbar = ({ lists }: { lists: ListResponse[] }) => {
  const { showSidebar, toggleSidebar } = useLayoutStore()

  return (
    <header className="sticky top-0 border-b bg-background">
      <div className="flex h-14 items-center justify-between px-2">
        <div className="flex-gap">
          <div className="block md:!hidden">
            <MobileSidebar lists={lists} />
          </div>
          <div className="md:!block hidden">
            <Button variant={'outline'} size={'icon'} onClick={toggleSidebar}>
              <Icons.chevronRight
                className={cn('w-4 h-4 transition duration-300', showSidebar ? 'rotate-180 transform' : '')}
              />
            </Button>
          </div>
        </div>
        <div className="flex-gap">
          <FilterOverlay />
          <Button variant={'outline'} onClick={() => alert('reminder: a calendar view here?')}>
            <Icons.chevronLeft className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
