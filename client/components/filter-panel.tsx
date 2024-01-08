'use client';

import * as React from 'react';

import { Separator } from '@/components/ui/seperator';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Label as SwitchLabel } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

import LabelBadge from '@/components/ui/label-badge';

import { cn } from '@/lib/util/tw-merge';
import type { Label } from '@/types';
import { ExtendedSearchParamsOptions } from '@/lib/util/filter';
import { useFilter } from '@/hooks/use-filter';

interface FilterPanelProps {
  labels: Label[];
  close: () => void;
}

export default function FilterPanel({ labels, close }: FilterPanelProps) {
  const { createQueryString, removeQueryString, view, labelId, completed } =
    useFilter();

  const FilterView = React.memo(
    ({
      name,
      label,
      icon,
    }: {
      name: ExtendedSearchParamsOptions['view'];
      label: string;
      icon: React.ReactNode;
    }) => (
      <Button
        variant="ghost"
        onClick={() => createQueryString('view', name!)}
        className={cn(
          'rounded-sm bg-transparent p-0 h-16 cursor-pointer flex-center w-full flex-col text-center',
          view === name && 'bg-popover',
        )}
      >
        {icon}
        {label}
      </Button>
    ),
  );

  return (
    <div className="w-full">
      <span className="block text-sm font-bold">View</span>
      <div className="my-4 bg-input rounded-md gap-1 p-1 grid grid-cols-2">
        <FilterView
          name="list"
          label="List"
          icon={<Icons.Menu className="w-4 h-4 mb-1" />}
        />
        <FilterView
          name="board"
          label="Board"
          icon={<Icons.Board className="w-4 h-4 mb-1" />}
        />
      </div>
      {view !== 'board' && (
        <div className="flex-gap mb-4 w-full">
          <Checkbox checked className="cursor-default" />
          <SwitchLabel htmlFor="completed-tasks">Completed tasks</SwitchLabel>
          <Switch
            id="completed-tasks"
            className="ml-auto"
            checked={!!completed}
            onCheckedChange={() => {
              completed
                ? removeQueryString('completed')
                : createQueryString('completed', 'true');
            }}
          />
        </div>
      )}
      <Separator />
      <span className="pt-4 block text-sm font-bold">Label</span>
      <div className="my-4 flex-gap max-w-full flex-wrap">
        {labels.map((label) => (
          <Badge
            key={label.id}
            variant="outline"
            className={cn(
              'rounded-sm bg-transparent p-2 cursor-pointer flex-gap',
              labelId === label.id && 'bg-primary/25 border-primary',
            )}
            onClick={() =>
              labelId === label.id
                ? removeQueryString('labelId')
                : createQueryString('labelId', label.id)
            }
          >
            <LabelBadge key={label.id} label={label} noBorder />
            {labelId === label.id && (
              <Icons.Close className="w-4 h-4 hover:cursor-pointer" />
            )}
          </Badge>
        ))}
      </div>
      <div className="flex-gap mt-4">
        <Button
          variant="secondary"
          className="w-full bg-primary/30 text-primary dark:bg-accent dark:text-foreground hover:bg-primary hover:text-white"
          onClick={() => removeQueryString()}
        >
          Reset
        </Button>
        <Button className="w-full" onClick={close}>
          Done
        </Button>
      </div>
    </div>
  );
}
