import * as React from 'react';

import type { LabelResponse, ListResponse } from '@/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';

import { ListService } from '@/services/list-service';
import { LabelService } from '@/services/label-service';
import TaskForm from '@/components/shared/task/task-form';

import { useLayoutStore } from '@/store/layout-store';
import { useSignal } from '@/hooks/use-signal';
import { useMediaQuery } from '@/hooks/use-media-query';

export default function TaskOverlay() {
  const [isOpen, setOpen] = React.useState(false);
  const [lists, setLists] = React.useState<ListResponse[]>([]);
  const [labels, setLabels] = React.useState<LabelResponse[]>([]);
  const { signal } = useSignal();
  const { showTaskOverlay, toggleTaskOverlay, setTaskOverlay } =
    useLayoutStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  React.useEffect(() => {
    showTaskOverlay ? setOpen(true) : setOpen(false);
  }, [showTaskOverlay]);

  React.useEffect(() => {
    const subscribe = async () => {
      const fetchedLists = await ListService.getLists();
      const fetchedLabels = await LabelService.getLabels();
      setLists(fetchedLists);
      setLabels(fetchedLabels);
    };
    if (showTaskOverlay) subscribe();
  }, [signal, showTaskOverlay]);

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
          <TaskForm lists={lists} labels={labels} />
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
          <TaskForm lists={lists} labels={labels} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
