'use client'

import * as React from 'react'

import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { MobileSidebar } from './mobile-sidebar'

import FilterOverlay from '@/components/modals/filter-overlay'
import FilterView from '@/components/shared/filter-view'

import { useLayoutStore } from '@/store/layout-store'
import { cn } from '@/lib/util/cn'
import type { ListResponse } from '@/types'

const Navbar = ({ lists }: { lists: ListResponse[] }) => {
  const {
    showLeftSidebar,
    showRightSidebar,
    showChatOverlay,
    toggleLeftSidebar,
    toggleRightSidebar,
    toggleChatOverlay,
  } = useLayoutStore()

  return (
    <header className="sticky top-0 border-b bg-background">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex-gap">
          <div className="block md:!hidden">
            <MobileSidebar lists={lists} />
          </div>
          <div className="md:!block hidden">
            <Button variant={'outline'} size={'icon'} onClick={toggleLeftSidebar}>
              <Icons.chevronRight
                className={cn('w-3 h-3 transition duration-300', showLeftSidebar && 'rotate-180 transform')}
              />
            </Button>
          </div>
          <FilterView />
        </div>
        <div className="flex-gap">
          <Button
            variant={'outline'}
            size={'icon'}
            onClick={toggleChatOverlay}
            className={cn(showChatOverlay && 'bg-primary/10 border-primary/30 transition')}
          >
            <Icons.ai className="w-5 h-5 duration-300" />
          </Button>
          <FilterOverlay />
          <div className="lg:!block hidden">
            <Button variant={'outline'} size={'icon'} onClick={toggleRightSidebar}>
              <Icons.chevronLeft
                className={cn('w-3 h-3 transition duration-300', showRightSidebar && 'rotate-180 transform')}
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
