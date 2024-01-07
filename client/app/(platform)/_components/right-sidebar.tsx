'use client';

import { fetcher, useSWR } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { TaskList } from '@/components/shared/task/task-list';

import { cn } from '@/lib/util/tw-merge';

export default function RightSidebar() {
  const { data, error } = useSWR('/api/lists', fetcher);

  if (error) return <div>Failed to load</div>;

  if (!data) return <div>Loading...</div>;
  return (
    <>
      <Dialog modal>
        <DialogContent className="max-w-xl h-fit overflow-y-auto max-h-screen p-4">
          <DialogHeader>Tasks for </DialogHeader>
          <TaskList tasks={[]} lists={[]} labels={[]} />
        </DialogContent>
      </Dialog>
      <aside
        className={cn(
          `relative h-screen duration-300 hidden md:block flex-shrink-0 glassmorphism w-full`,
        )}
      >
        <div className="h-full">
          <div className="h-full">
            <div className="h-[3.53rem] border-b" />
            <div className="p-3 space-y-3">
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
              {JSON.stringify({ data })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
