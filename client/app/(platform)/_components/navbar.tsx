'use client';

import * as React from 'react';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './mobile-sidebar';

import FilterOverlay from '@/components/modals/filter-overlay';
import FilterView from '@/components/shared/filter-view';

import { useLayoutStore } from '@/store/layout-store';
import { cn } from '@/lib/util/cn';
import type { ListResponse, UserResponse } from '@/types';

export default function Navbar({
  lists,
  user,
}: {
  lists: ListResponse[];
  user: UserResponse;
}) {
  const {
    showLeftSidebar,
    showRightSidebar,
    showChatOverlay,
    toggleLeftSidebar,
    toggleRightSidebar,
    toggleChatOverlay,
  } = useLayoutStore();

  return (
    <header className="sticky top-0 border-b bg-background">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="flex-gap">
          <div className="block md:!hidden">
            <MobileSidebar lists={lists} user={user} />
          </div>
          <div className="md:!block hidden">
            <Button
              variant="outline"
              onClick={toggleLeftSidebar}
              className="w-10 p-2"
            >
              <Icons.ChevronRight
                className={cn(
                  'w-3 h-3 transition duration-300',
                  showLeftSidebar && 'rotate-180 transform',
                )}
              />
            </Button>
          </div>
          <FilterView />
        </div>
        <div className="flex-gap">
          <Button
            variant="outline"
            onClick={toggleChatOverlay}
            className={cn(
              'w-10 p-2',
              showChatOverlay &&
                'bg-primary/10 border-primary/30 transition duration-300',
            )}
          >
            <Icons.AI className="w-4 h-4" />
          </Button>
          <FilterOverlay />
          <div className="lg:!block hidden">
            <Button
              variant="outline"
              onClick={toggleRightSidebar}
              className="w-10 p-2"
            >
              <Icons.ChevronLeft
                className={cn(
                  'w-3 h-3 transition duration-300',
                  showRightSidebar && 'rotate-180 transform',
                )}
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
