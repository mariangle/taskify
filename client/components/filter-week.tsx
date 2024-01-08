'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import { useFilter } from '@/hooks/use-filter';

export default function FilterWeek() {
  const { createQueryString, removeQueryString } = useFilter();

  return (
    <div className="flex-gap-sm fixed top-18 right-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => createQueryString('offset', 'prev')}
        className="w-8 h-8 rounded-sm"
      >
        <Icons.ChevronLeft className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => createQueryString('offset', 'next')}
        className="w-8 h-8 rounded-sm"
      >
        <Icons.ChevronRight className="w-3 h-3" />
      </Button>
      <Button
        variant="outline"
        onClick={() => removeQueryString('offset')}
        className="h-8 rounded-sm"
      >
        Today
      </Button>
    </div>
  );
}
