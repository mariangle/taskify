'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/util/tw-merge';
import { useTaskStore } from '@/store/modal-store';
import LabelBadge from '@/components/ui/label-badge';
import { Separator } from '@/components/ui/seperator';
import SubtaskList from '@/components/shared/subtask/subtask-list';
import StatusCheckbox from '@/components/shared/status-checkbox';

export default function RightSidebar() {
  const { task } = useTaskStore();

  return (
    <aside
      className={cn(
        `relative h-screen duration-300 hidden md:block flex-shrink-0 glassmorphism w-full`,
      )}
    >
      <div className="h-full">
        <div className="h-full">
          <div className="h-20 border-b">
            <StatusCheckbox task={task} />
            <div className="text-lg">{task?.name}</div>
            <div className="text-sm text-muted-foreground">
              {task?.description}
            </div>
          </div>
          <div className="p-4 ">
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
            <div>
              <div>
                <div>Due Date</div>
                <div>{task?.dueDate?.toString()}</div>
              </div>
              <div>
                <div>Priority</div>
                <div>{task?.priority}</div>
              </div>
              <div>
                <div>Labels</div>
                <div>
                  {task?.labels?.map((label) => (
                    <LabelBadge key={label.id} label={label} />
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <div>Subtasks</div>
                {task && (
                  <SubtaskList
                    task={task}
                    subtasks={task.subtasks}
                    alwaysOpen
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
