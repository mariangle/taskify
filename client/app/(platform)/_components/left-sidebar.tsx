'use client';

import * as React from 'react';

import SideNav from './side-nav';

import { cn } from '@/lib/util/tw-merge';
import type { ListResponse, UserResponse } from '@/types';
import { useLayoutStore } from '@/store/layout-store';

export default function LeftSidebar({
  lists,
  user,
}: {
  lists: ListResponse[];
  user: UserResponse;
}) {
  const { showLeftSidebar, toggleLeftSidebar } = useLayoutStore();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleLeftSidebar();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleLeftSidebar]);

  return (
    <aside
      className={cn(
        `relative h-screen border-r hidden duration-300 md:block flex-shrink-0 bg-background-secondary`,
        showLeftSidebar ? 'w-56' : 'w-0 md:w-16',
      )}
    >
      <div className={cn('h-full', showLeftSidebar ? '' : 'hidden md:block')}>
        <SideNav lists={lists} user={user} />
      </div>
    </aside>
  );
}
