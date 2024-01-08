'use client';

import * as React from 'react';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import StatusCheckbox from '@/components/status-checkbox';

import { Form } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { Subtask, Task } from '@/types';
import { SubtaskService } from '@/services/subtask-service';
import { handleError } from '@/lib/util/error';
import {
  SubtaskFormValues,
  subtaskFormSchema,
} from '@/lib/validations/subtask-schema';

interface SubtaskFormProps {
  subtask?: Subtask;
  task: Task;
  close: () => void;
  closeNewSubtask?: () => void;
}

function SubtaskForm({
  subtask,
  task,
  close,
  closeNewSubtask,
}: SubtaskFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const defaultValues: Partial<SubtaskFormValues> = {
    name: subtask?.name,
  };

  const router = useRouter();
  const form = useForm<SubtaskFormValues>({
    resolver: zodResolver(subtaskFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: SubtaskFormValues) => {
    setIsLoading(true);
    try {
      if (subtask) {
        await SubtaskService.updateSubtask(task.id, subtask.id, {
          ...subtask,
          name: data.name,
        });
        toast.success('Subtask updated!');
      } else {
        await SubtaskService.createSubtask(task.id, data);
        toast.success('Subtask created!');
      }
      router.refresh();
      close && close();
      closeNewSubtask && closeNewSubtask();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(true);
    }
  };

  const onClose = () => {
    close && close();
    closeNewSubtask && closeNewSubtask();
  };

  const watchName = form.watch('name');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex-gap">
          <StatusCheckbox disabled className="border-primary bg-primary/10" />
          <Input
            transparent
            autoFocus
            {...form.register('name')}
            placeholder="Subtask Name"
            className="w-full px-0 py-0 text-xs font-semibold"
          />
        </div>
        <div className="flex-gap justify-end">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            <Icons.Close className="w-4 h-4" />
          </Button>
          <Button type="submit" size="sm" disabled={!watchName || isLoading}>
            <Icons.Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SubtaskForm;
