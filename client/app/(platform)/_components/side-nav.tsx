'use client'

import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { LoadingSidebar } from '@/components/ui/loading'
import { ToggleTheme } from './toggle-theme'
import { Separator } from '@/components/ui/seperator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import UserNav from './user-nav'
import SearchMenu from './search-menu'
import ListItem from '@/components/shared/list/list-item'

import { cn } from '@/lib/util/cn'
import { buttonVariants } from '@/components/ui/button'
import { config } from '@/lib/config'
import { usePathname } from 'next/navigation'
import { useLayoutStore } from '@/store/layout-store'
import { useSettingsStore } from '@/store/settings-store'
import type { ListResponse, UserResponse } from '@/types'
import type { SidebarItem } from '@/lib/constants'
import { useMounted } from '@/hooks/use-mounted'
import { widgetItems, sidebarItems } from '@/lib/constants'

export default function SideNav({ lists, user }: { lists: ListResponse[]; user: UserResponse }) {
  const path = usePathname()
  const isMounted = useMounted()
  const { showLeftSidebar, toggleTaskOverlay } = useLayoutStore()
  const { settings, setSettings } = useSettingsStore()

  React.useEffect(() => {
    // Initializing zustand store with default state if they don't exist.
    const dW = Object.values(widgetItems).map((i) => i.id)
    const dS = Object.values(sidebarItems).map((i) => i.id)

    if (!settings.sidebar || !settings.widgets) setSettings({ ...settings, sidebar: dS, widgets: dW })
  }, [])

  if (!isMounted) return <LoadingSidebar />

  return (
    <nav className="px-3 pb-3 min-h-full flex flex-col justify-between">
      <div>
        <div className="h-12">
          <UserNav user={user} />
        </div>
        <div className="flex-gap">
          <Button
            variant={showLeftSidebar ? 'secondary' : 'ghost'}
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
          {config.platform.links.map(
            (item) =>
              // Check if the link's id is included in settings.sidebar
              settings.sidebar.includes(item.id as SidebarItem) && (
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
              ),
          )}
        </div>
        <Separator className="my-2" />
        {settings.sidebar.includes('lists') && (
          <>
            <Accordion type="single" collapsible defaultValue="lists">
              <AccordionItem value="lists">
                <div className="flex-between gap-1 px-3 mt-4">
                  {showLeftSidebar && (
                    <div className="w-full flex-between">
                      <span className="text-muted-foreground text-xs whitespace-nowrap uppercase">Lists</span>
                      <ListItem />
                    </div>
                  )}
                  <AccordionTrigger className="hover:bg-muted rounded-full py-0 p-0.5" />
                </div>
                <AccordionContent>
                  {lists.map((list) => (
                    <ListItem list={list} key={list.id} />
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </div>
      <ToggleTheme />
    </nav>
  )
}
