'use client';

import * as React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/ui/icons';
import { useFilter } from '@/hooks/use-filter';

export default function FilterView() {
  const { view, pathname, createQueryString } = useFilter();

  const hasViewOptions = /inbox|lists|today/.test(pathname);

  if (hasViewOptions) {
    return (
      <Tabs defaultValue={view} className="flex-center">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger
            value="list"
            className="h-8"
            onClick={() => createQueryString('view', 'list')}
          >
            <Icons.Menu className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger
            value="board"
            className="h-8"
            onClick={() => createQueryString('view', 'board')}
          >
            <Icons.Board className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }

  return null;
}
