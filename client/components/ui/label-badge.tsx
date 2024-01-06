'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';

import { TaskService } from '@/services/task-service';
import { handleError } from '@/lib/util';
import { cn } from '@/lib/util/tw-merge';
import type { Label } from '@/types';

interface LabelBadgeProps {
  label: Label;
  noBorder?: boolean;
  taskId?: string;
}

export function LabelColor({
  color,
  className,
}: {
  color?: string | null;
  className?: string;
}) {
  return (
    <div
      className={cn('h-2 w-2 rounded-full border', className)}
      style={{ backgroundColor: color ?? '#ffffff' }}
    />
  );
}

export default function LabelBadge({
  label,
  noBorder,
  taskId,
}: LabelBadgeProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const onRemove = async (taskId: string) => {
    setIsLoading(true);
    try {
      await TaskService.removeLabel({ taskId, labelId: label.id });
      router.refresh();
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
