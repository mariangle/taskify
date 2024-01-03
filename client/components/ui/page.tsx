import * as React from 'react';

import TaskItem from '../shared/task/task-item';
import LabelItem from '../shared/label/label-item';

import { cn } from '@/lib/util/tw-merge';

import type { LabelResponse, ListResponse, TaskResponse } from '@/types';

export function PageList({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-screen-md mx-auto">{children}</div>;
}

export function PageBoard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
      {children}
    </div>
  );
}

export function PageTable({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-screen-lg mx-auto">{children}</div>;
}

export function PageHeading({
  children,
  items,
  color,
  level = 'h1',
  className,
}: {
  children: React.ReactNode;
  items?: any[];
  color?: string;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}) {
  const HeadingTag = level;

  return (
    <div className="flex-gap">
      {color && (
        <span
          className={cn(
            'flex items-center justify-center h-2 w-2 rounded-full',
            color,
          )}
        />
      )}
      <HeadingTag className={cn('font-bold text-xl', className)}>
        {children}
      </HeadingTag>
      {items && (
        <span className="text-muted-foreground text-xs">({items.length})</span>
      )}
    </div>
  );
}

export function PageDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-sm pt-2 text-muted-foreground">{children}</p>;
}

export function LabelList({ labels }: { labels: LabelResponse[] }) {
  return (
    <div className="space-y-2">
      {labels.map((label) => (
        <LabelItem key={label.id} label={label} />
      ))}
      <LabelItem />
    </div>
  );
}

export function TaskList({
  tasks,
  lists,
  labels,
  type = 'list',
  expandable = true,
}: {
  tasks: TaskResponse[];
  lists: ListResponse[];
  labels: LabelResponse[];
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
