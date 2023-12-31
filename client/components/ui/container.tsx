import * as React from 'react';

import { cn } from '@/lib/util/cn';

export function BoardContainer({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'list-none border bg-background-secondary rounded-md shadow-lg hover:border-primary/50 hover:shadow-xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ListContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('border-b py-2 group', className)}>{children}</div>;
}

export function SubtaskContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('border-t group/subtask', className)}>{children}</div>
  );
}
