'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { useLayoutStore } from '@/store/layout-store';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { TaskList } from '@/components/shared/task/task-list';

import { cn } from '@/lib/util/tw-merge';
import { Label, List, type Task } from '@/types';
import { TaskService } from '@/services/task-service';
import { useSignal } from '@/hooks/use-signal';
import { useSettingsStore } from '@/store/settings-store';
import { useMounted } from '@/hooks/use-mounted';
import { ListService } from '@/services/list-service';
import { LabelService } from '@/services/label-service';

export default function RightSidebar() {
  const { showRightSidebar } = useLayoutStore();
  const { signal } = useSignal();
  const isMounted = useMounted();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [labels, setLabels] = React.useState<Label[]>([]);
  const [lists, setLists] = React.useState<List[]>([]);
  const [, setSelectedDate] = React.useState<Date | undefined>();
  const [openModal, setOpenModal] = React.useState(false);
  const { settings } = useSettingsStore();

  React.useEffect(() => {
    const subscribe = async () => {
      // TODO: Try make to server component
      const tasks = await TaskService.getTasks();
      const labels = await LabelService.getLabels();
      const lists = await ListService.getLists();

      setTasks(tasks);
      setLists(lists);
      setLabels(labels);
    };
    if (showRightSidebar) subscribe();
  }, [signal, showRightSidebar]);

  if (!isMounted) return null;

  const onSelect = (date: Date | undefined) => {
    setOpenModal(true);
    setSelectedDate(date);
  };

  return (
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal} modal>
        <DialogContent className="max-w-xl h-fit overflow-y-auto max-h-screen p-4">
          <DialogHeader>Tasks for </DialogHeader>
          <TaskList tasks={tasks} lists={lists} labels={labels} />
        </DialogContent>
      </Dialog>
      <aside
        className={cn(
          `relative h-screen border-l duration-300 hidden md:block flex-shrink-0 glassmorphism`,
          showRightSidebar ? 'w-0 lg:w-[300px]' : 'w-0',
        )}
      >
        <div
          className={cn('h-full', showRightSidebar ? '' : 'hidden md:block')}
        >
          <div className="h-full">
            <div className="h-12 border-b" />
            <div className="p-3 space-y-3">
              {settings.widgets.includes('calendar') && (
                <Calendar
                  mode="single"
                  onSelect={(date) => onSelect(date)}
                  tasks={tasks}
                  className="rounded-md border"
                />
              )}
              <Button
                variant="ghost"
                className={cn(
                  'rounded-none text-xs py-6 border-b border-transparent px-2 text-muted-foreground',
                  true &&
                    'border-primary text-foreground bg-gradient-to-t from-primary/20 hover:bg-primary/25',
                )}
              >
                Test
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
