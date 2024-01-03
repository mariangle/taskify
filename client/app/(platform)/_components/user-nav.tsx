import * as React from 'react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

import { deleteToken } from '@/lib/_actions/logout';
import { revalidate } from '@/lib/_actions/revalidate-path';
import { useLayoutStore } from '@/store/layout-store';
import { cn } from '@/lib/util/tw-merge';

import type { UserResponse } from '@/types';

export default function UserNav({ user }: { user: UserResponse }) {
  const { showLeftSidebar, toggleSettingsOverlay } = useLayoutStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const dropdownItems = [
    {
      label: 'Plan',
      key: 'subscription',
      icon: <Icons.CreditCard className="mr-2 h-4 w-4" />,
      href: '/settings/account',
    },
    {
      label: 'Analytics',
      key: 'analytics',
      icon: <Icons.LineChart className="mr-2 h-4 w-4" />,
      href: '/analytics',
      shortcut: '⌘S',
    },
  ];

  const onLogout = async () => {
    await deleteToken();
    revalidate({ path: '/inbox' });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="h-12 flex-gap w-full justify-start">
          <Button
            variant="ghost"
            className={cn(
              'flex px-2 rounded-full',
              showLeftSidebar && 'hover:bg-muted rounded-sm',
            )}
          >
            <div className="ring-2 ring-primary rounded-full p-[1px]">
              <div className="rounded-full bg-muted border">
                <Icons.User className="w-5 h-5 p-1" />
              </div>
            </div>
            <div className={cn('flex-gap', !showLeftSidebar && 'md:hidden')}>
              <span className="ml-3">{user.name}</span>
              <Icons.ChevronDown className="w-3 h-3 transition duration-200" />
            </div>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
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
          <DropdownMenuItem
            onClick={() => {
              toggleSettingsOverlay();
              setIsOpen(false);
            }}
          >
            <Icons.Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icons.Support className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onLogout}>
            <Icons.LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
