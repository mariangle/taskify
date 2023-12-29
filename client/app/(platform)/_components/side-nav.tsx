'use client'

import Link from 'next/link'

import ListItem from '@/components/shared/list/list-item'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'
import { ToggleTheme } from './toggle-theme'
import { Separator } from '@/components/ui/seperator'

import UserNav from './user-nav'
import SearchMenu from './search-menu'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { cn } from '@/lib/util/cn'
import { buttonVariants } from '@/components/ui/button'
import { config } from '@/lib/config'
import { usePathname } from 'next/navigation'
import { useLayoutStore } from '@/store/layout-store'
import type { ListResponse } from '@/types'
import React from 'react'

export default function SideNav({ lists }: { lists: ListResponse[] }) {
  const path = usePathname()
  const { showLeftSidebar, toggleTaskOverlay } = useLayoutStore()

  return (
    <nav className="px-3 pb-3 min-h-full flex flex-col justify-between">
      <div>
        <div className="h-12">
          <UserNav />
        </div>
        <div className="flex-gap">
          <Button
            variant={showLeftSidebar ? 'tertiary' : 'ghost'}
            size={'sm'}
            className="flex justify-start px-2 w-full"
            onClick={toggleTaskOverlay}
          >
            <div className="bg-primary rounded-full p-1 ml-0.5">
              <Icons.add className="h-3 w-3 text-white" />
            </div>
            <span className={cn('ml-2', !showLeftSidebar && 'md:hidden')}>New task</span>
          </Button>
          <SearchMenu />
        </div>
        <div className="space-y-1 mt-2">
          {config.platform.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'flex justify-start px-2 w-full text-muted-foreground',
                path === item.href || (item.href === '/lists' && path.includes('lists'))
                  ? 'bg-primary/10 text-foreground'
                  : '',
              )}
            >
              <div className="rounded-full p-1">
                <item.icon className="h-4 w-4" />
              </div>
              <span className={cn('ml-2', !showLeftSidebar && 'md:hidden')}>{item.label}</span>
            </Link>
          ))}
        </div>
        <Separator className="my-2" />
        <Accordion type="single" collapsible defaultValue="lists">
          <AccordionItem value="lists">
            <AccordionTrigger className="px-3 text-muted-foreground text-xs whitespace-nowrap uppercase">
              {showLeftSidebar && 'Lists'}
            </AccordionTrigger>
            <AccordionContent>
              {lists.map((item) => (
                <ListItem item={item} key={item.id} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <ToggleTheme />
    </nav>
  )
}
