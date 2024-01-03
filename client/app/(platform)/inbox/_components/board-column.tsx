import type { LabelResponse, ListResponse, TaskResponse } from '@/types';
import { cn } from '@/lib/util/tw-merge';
import TaskItem from '@/components/shared/task/task-item';

interface ColumnProps {
  tasks: TaskResponse[];
  lists: ListResponse[];
  labels: LabelResponse[];
  status: 'Incomplete' | 'Pending' | 'Completed';
  color: string;
}

export default function BoardColumn({
  tasks,
  status,
  color,
  lists,
  labels,
}: ColumnProps) {
  return (
    <div className="space-y-4">
      <div className="flex-between">
        <div className="flex-gap items-end">
          <span
            className={cn(
              'flex items-center justify-center h-2 w-2 -translate-y-2 rounded-full',
              color,
            )}
          />
          <div className="flex gap-1">
            <h2 className="font-bold">{status}</h2>
            <p className="text-xs flex items-end mb-[2.5px] text-default-500">
              ({tasks.length})
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            labels={labels}
            lists={lists}
            type="board"
          />
        ))}
        {status === 'Incomplete' && (
          <TaskItem labels={labels} lists={lists} type="board" />
        )}
      </div>
    </div>
  );
}
