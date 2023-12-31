'use client';

import React from 'react';

import { usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';

import { revalidate } from '@/lib/_actions/revalidate-path';
import { TaskService } from '@/services/task-service';
import { handleError } from '@/lib/util';
import { cn } from '@/lib/util/cn';
import type { LabelResponse } from '@/types';

interface LabelBadgeProps {
  label: LabelResponse;
  noBorder?: boolean;
  taskId?: string;
}

export function LabelColor({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  return (
    <div
      className={cn('h-2 w-2 rounded-full border', className)}
      style={{ backgroundColor: color }}
    />
  );
}

export default function LabelBadge({
  label,
  noBorder,
  taskId,
}: LabelBadgeProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const path = usePathname();

  const onRemove = async (taskId: string) => {
    setIsLoading(true);
    try {
      await TaskService.removeLabel({ taskId, labelId: label.id });
      revalidate({ path, type: 'page' });
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (noBorder)
    return (
      <div className="flex-gap">
        <LabelColor color={label.color} />
        {label.name}
      </div>
    );

  return (
    <Badge key={label.id} variant="outline" className="flex-gap">
      <LabelColor color={label.color} />
      {label.name}
      {taskId && !isLoading && (
        <Icons.Close
          className="w-2 h-2 hover:cursor-pointer"
          onClick={() => onRemove(taskId)}
        />
      )}
    </Badge>
  );
}
