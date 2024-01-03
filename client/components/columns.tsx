'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { TaskResponse } from '@/types';
import StatusCheckbox from '@/components/shared/status-checkbox';
import LabelBadge from '@/components/ui/label-badge';

export const columns: ColumnDef<TaskResponse>[] = [
  {
    accessorKey: 'name',
    cell: ({ row }) => (
      <div className="text-left flex-gap font-medium">
        <StatusCheckbox task={row.original} />
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: 'dueDate',
    cell: ({ row }) => {
      const dueDate = row.getValue('dueDate') as string;
      const formatted = format(new Date(dueDate), 'd MMM');

      return (
        <div className="text-right text-muted-foreground font-medium flex-gap justify-end">
          <div className="flex-gap flex-wrap">
            {row.original.labels?.map((label) => (
              <LabelBadge label={label} key={label.id} />
            ))}
          </div>
          {formatted}
        </div>
      );
    },
  },
];
