import * as React from 'react';

import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';

import FilterPanel from '@/components/shared/filter-panel';
import { LabelService } from '@/services/label-service';

import type { Label } from '@/types';
import { useSignal } from '@/hooks/use-signal';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useMounted } from '@/hooks/use-mounted';

export default function FilterOverlay() {
  const [isOpen, setOpen] = React.useState(false);
  const [labels, setLabels] = React.useState<Label[]>([]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMounted = useMounted();

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const { signal } = useSignal();

  React.useEffect(() => {
    const subscribe = async () => {
      const labels = await LabelService.getLabels();
      setLabels(labels);
    };
    if (isOpen) subscribe();
  }, [signal, isOpen]);

  if (!isMounted)
    return (
      <Button variant="outline" className="flex-gap">
        <Icons.Filter className="w-4 h-4" />
        <span className="hidden md:block">Filter</span>
      </Button>
    );

  if (isDesktop) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" onClick={open}>
            <Icons.Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[275px] p-4 overflow-y-auto">
          <FilterPanel labels={labels} close={close} />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" onClick={open}>
          <Icons.Filter className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <FilterPanel labels={labels} close={close} />
      </DrawerContent>
    </Drawer>
  );
}
