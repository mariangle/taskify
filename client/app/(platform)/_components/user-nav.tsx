import { deleteToken } from '@/lib/_actions/logout'
import { Button } from '@/components/ui/button'
import { revalidate } from '@/lib/_actions/revalidate-path'
import { useGlobalStore } from '@/hooks/use-global-store'
import { cn } from '@/lib/util/cn'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icons } from '@/components/icons'
import React from 'react'

export default function UserNav() {
  const { showSidebar } = useGlobalStore()

  const dropdownItems = [
    {
      label: 'Subscription',
      key: 'subscription',
      icon: <Icons.creditCard className="mr-2 h-4 w-4" />,
      href: '/settings/account',
    },
    {
      label: 'Settings',
      key: 'settings',
      icon: <Icons.settings className="mr-2 h-4 w-4" />,
      href: '/settings/account',
      shortcut: '⌘S',
    },
    {
      label: 'Analytics',
      key: 'analytics',
      icon: <Icons.lineChart className="mr-2 h-4 w-4" />,
      href: '/analytics',
      shortcut: '⌘S',
    },
  ]

  const onLogout = async () => {
    await deleteToken()
    revalidate({ path: '/inbox' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-full flex-gap w-full justify-start ml-1">
          <Button
            variant={'ghost'}
            className={cn('flex px-2 mx-2 rounded-full', showSidebar && 'hover:bg-muted rounded-sm')}
          >
            <div className="ring-2 ring-primary rounded-full p-[1px]">
              <div className="rounded-full bg-muted border">
                <Icons.user className="w-5 h-5 p-1" />
              </div>
            </div>
            <div className={cn('flex-gap', !showSidebar && 'md:hidden')}>
              <span className="ml-3">Maria</span>
              <Icons.chevronDown className="w-3 h-3 transition duration-200" />
            </div>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dropdownItems.map((item) => (
            <Link key={item.key} href={item.href}>
              <DropdownMenuItem>
                {item.icon}
                <span>{item.label}</span>
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icons.support className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onLogout}>
            <Icons.logOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
