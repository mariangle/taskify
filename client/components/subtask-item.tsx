import * as React from 'react';

import { SubtaskContainer } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

import SubtaskActions from '@/components/subtask-actions';
import StatusCheckbox from '@/components/status-checkbox';
import SubtaskForm from '@/components/subtask-form';

import type { Subtask, Task } from '@/types';
import { cn } from '@/lib/util/tw-merge';

interface SubtaskItemProps {
  subtask?: Subtask;
  task: Task;
}

export default function SubtaskItem({ subtask, task }: SubtaskItemProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  if (isOpen) {
    return (
      <SubtaskContainer className={cn('pl-2 pt-0', subtask && 'pb-2')}>
        <SubtaskForm close={close} task={task} subtask={subtask} />
      </SubtaskContainer>
    );
  }

  if (!subtask) {
    return (
      <SubtaskContainer className="pl-2">
        <Button
          variant="ghost"
          className="justify-start group hover:bg-transparent text-muted-foreground hover:text-foreground px-0 group/add-subtask"
          onClick={open}
        >
          <StatusCheckbox className="mr-2 border-primary bg-primary/10" />
          <span className="text-xs">Add subtask</span>
        </Button>
      </SubtaskContainer>
    );
  }

  return (
    <SubtaskContainer className="flex-between p-2">
      <div className="flex-gap">
        <StatusCheckbox subtask={subtask} />
        <span role="presentation" onClick={open} className="text-xs">
          {subtask.name}
        </span>
      </div>
      <div className="group-hover/subtask:opacity-100 opacity-0">
        <SubtaskActions task={task} subtask={subtask} setOpen={open} />
      </div>
    </SubtaskContainer>
  );
}
