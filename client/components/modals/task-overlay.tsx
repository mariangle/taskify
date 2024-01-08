import * as React from 'react';
import useSWR from 'swr';

import type { Label, List } from '@/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

import TaskForm from '@/components/shared/task/task-form';

import { useLayoutStore } from '@/store/layout-store';
import { useMediaQuery } from '@/hooks/use-media-query';
import { fetcher, LABELS_KEY, LISTS_KEY } from '@/lib/api';

export default function TaskOverlay() {
  const [isOpen, setOpen] = React.useState(false);
  const { data: lists } = useSWR<List[]>(LISTS_KEY, fetcher);
  const { data: labels } = useSWR<Label[]>(LABELS_KEY, fetcher);
  const { showTaskOverlay, toggleTaskOverlay, setTaskOverlay } =
    useLayoutStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  React.useEffect(() => {
    showTaskOverlay ? setOpen(true) : setOpen(false);
  }, [showTaskOverlay]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTaskOverlay();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleTaskOverlay]);

  if (isDesktop) {
    return (
      <Dialog open={showTaskOverlay} onOpenChange={toggleTaskOverlay} modal>
        <DialogContent className="max-w-xl h-fit overflow-y-auto max-h-screen">
          <TaskForm lists={lists || []} labels={labels || []} />
        </DialogContent>
      </Dialog>
    );
  }

  // A workaround to manage drawer state since it has different behavior than the Dialog
  const onOpenChange = () => {
    setOpen(!isOpen);
    if (!isOpen) {
      setTaskOverlay(false);
    }
  };

  return (
    <Drawer open={showTaskOverlay} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="max-h-screen overflow-y-auto">
          <TaskForm lists={lists || []} labels={labels || []} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
