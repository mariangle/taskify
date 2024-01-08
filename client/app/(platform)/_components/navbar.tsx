'use client';

import * as React from 'react';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './mobile-sidebar';

import FilterOverlay from '@/components/modals/filter-overlay';
import FilterView from '@/components/filter-view';

import { useLayoutStore } from '@/store/layout-store';
import { cn } from '@/lib/util/tw-merge';

export default function Navbar() {
  const { showLeftSidebar, toggleLeftSidebar } = useLayoutStore();

  return (
    <header className="sticky top-0 border-b bg-background">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex-gap h-full">
          <div className="block md:!hidden">
            <MobileSidebar />
          </div>
          <div className="md:!block hidden">
            <Button
              variant="outline"
              onClick={toggleLeftSidebar}
              className="w-10 h-10 p-2"
            >
              <Icons.ChevronRight
                className={cn(
                  'w-3 h-3 transition duration-300',
                  showLeftSidebar && 'rotate-180 transform',
                )}
              />
            </Button>
          </div>
        </div>
        <div className="flex-gap">
          <FilterView />
          <FilterOverlay />
        </div>
      </div>
    </header>
  );
}
