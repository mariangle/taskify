import TaskItem from '@/components/shared/task/task-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

import type { Label, List, Task } from '@/types';

export function TaskList({
  tasks,
  lists,
  labels,
  type = 'list',
  expandable = true,
}: {
  tasks: Task[];
  lists: List[];
  labels: Label[];
  type?: 'board' | 'list';
  expandable?: boolean;
}) {
  return (
    <div className={type === 'list' ? 'space-y-2' : 'space-y-4'}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          lists={lists}
          labels={labels}
          type={type}
        />
      ))}
      {expandable && <TaskItem labels={labels} lists={lists} type={type} />}
    </div>
  );
}

TaskList.Empty = function EmptyList() {
  return (
    <div className="min-h-[50vh] flex-center">
      <div className="flex-center flex-col w-64 h-64 rounded-full p-2 m-10">
        <h4>No tasks</h4>
        <p className="text-muted-foreground text-center text-sm">
          Seems like you&apos;re totally on top of things.
        </p>
        <Button size="sm" className="mt-2">
          Create task
        </Button>
      </div>
    </div>
  );
};

TaskList.Skeleton = function LoadingList() {
  return <Skeleton className="w-full" />;
};
