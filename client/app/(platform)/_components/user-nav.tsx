import { deleteToken } from './logoutAction'
import { revalidate } from '@/lib/_actions/revalidate-path'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
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
import ThemeSwitchDropdown from '@/components/theme-switch-dropdown'
import { Icons } from '@/components/icons'

export default function UserNav() {
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
  ]

  const onLogout = async () => {
    await deleteToken()
    revalidate({ path: '/dashboard' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
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
          <ThemeSwitchDropdown />
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
