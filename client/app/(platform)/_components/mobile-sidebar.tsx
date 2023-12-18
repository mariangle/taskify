import { useState, useEffect } from 'react'
import { Icons } from '@/components/icons'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SideNav } from './side-nav'
import { Button } from '@/components/ui/button'
import { ListResponse } from '@/types'

interface MobileSidebarProps {
  lists: ListResponse[]
}

export const MobileSidebar = ({ lists }: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'outline'}>
          <Icons.menu className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="px-1 py-6 pt-16">
          <SideNav lists={lists} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
