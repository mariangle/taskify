import * as React from 'react';
import useSWR from 'swr';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import FilterPanel from '@/components/shared/filter-panel';

import type { Label } from '@/types';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useMounted } from '@/hooks/use-mounted';
import { fetcher, LABELS_KEY } from '@/lib/api';

export default function FilterOverlay() {
  const [isOpen, setOpen] = React.useState(false);
  const { data: labels } = useSWR<Label[]>(LABELS_KEY, fetcher);

  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMounted = useMounted();

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  if (!isMounted)
    return (
      <Button variant="outline" className="flex-gap h-10">
        <Icons.Filter className="w-4 h-4" />
        <span className="hidden md:block">Display</span>
      </Button>
    );

  if (isDesktop) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" onClick={open} className="h-10">
            <Icons.Filter className="w-4 h-4 mr-2" />
            Display
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[275px] p-4 overflow-y-auto">
          <FilterPanel labels={labels || []} close={close} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={open} className="h-10">
          <Icons.Filter className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <FilterPanel labels={labels || []} close={close} />
      </DrawerContent>
    </Drawer>
  );
}
