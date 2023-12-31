'use client';

import * as React from 'react';

import { Separator } from '@/components/ui/seperator';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/util/cn';

export default function FilterView() {
  const { view, pathname, createQueryString } = useFilter();

  const hasViewOptions = /inbox|lists|today/.test(pathname);

  const FilterButton = React.memo(
    ({
      children,
      icon,
      value,
    }: {
      children: React.ReactNode;
      icon: React.ReactNode;
      value: string;
    }) => (
      <Button
        variant="ghost"
        className={cn(
          'rounded-none text-xs py-6 border-y border-transparent px-2 text-muted-foreground',
          view === value &&
            'border-primary text-foreground bg-gradient-to-t from-primary/20 hover:bg-primary/25',
        )}
        onClick={() => createQueryString('view', value)}
      >
        {icon}
        {children}
      </Button>
    ),
  );

  if (hasViewOptions) {
    return (
      <div className="hidden md:flex-center">
        <Separator orientation="vertical" className="h-8 mx-2" />
        <FilterButton
          value="list"
          icon={<Icons.Menu className="w-4 h-4 mr-2" />}
        >
          List
        </FilterButton>
        <FilterButton
          value="table"
          icon={<Icons.Table className="w-4 h-4 mr-2" />}
        >
          Table
        </FilterButton>
        <FilterButton
          value="board"
          icon={<Icons.Board className="w-4 h-4 mr-2" />}
        >
          Board
        </FilterButton>
      </div>
    );
  }

  return null;
}
