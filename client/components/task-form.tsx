'use client';

import * as React from 'react';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { add } from 'date-fns';
import { useLayoutStore } from '@/store/layout-store';
import { handleError } from '@/lib/util';
import type { Label, List, Task } from '@/types';
import { TaskService } from '@/services/task-service';
import { taskFormSchema, TaskFormValues } from '@/lib/validations/task-schema';

import MentionsInput from '@/components/mention-input';
import { ListPicker } from '@/components/list-picker';
import { PriorityPicker } from '@/components/priority-picker';
import { DatePicker } from '@/components/date-picker';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/seperator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

interface TaskFormProps {
  task?: Task;
  lists: List[];
  labels: Label[];
  close?: () => void;
  small?: boolean;
  preview?: boolean;
  initialValues?: {
    dueDate?: string;
  };
}

export default function TaskForm({
  task,
  lists,
  labels,
  small = false,
  close,
  initialValues,
  preview = false,
}: TaskFormProps) {
  const { closeTaskOverlay } = useLayoutStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const params = useParams<{ listId: string }>();
  const path = usePathname();
  const router = useRouter();

  const defaultValues: Partial<TaskFormValues> = {
    name: task?.name || undefined,
    description: task?.description || undefined,
    dueDate: (() => {
      if (task?.dueDate) {
        return task.dueDate;
      }
      if (path === '/today') {
        return new Date();
      }
      if (initialValues?.dueDate) {
        return new Date(initialValues.dueDate);
      }
      return undefined;
    })(),
    priority: task?.priority || undefined,
    listId: task?.listId || params.listId || undefined,
    labelIds: (() => {
      if (task?.labels) {
        return task.labels.filter((label) => label.id).map((label) => label.id);
      }
      return undefined;
    })(),
  };

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  });

  // eslint-disable-next-line consistent-return
  const onSubmit = async (data: TaskFormValues) => {
    if (preview) return toast.success('Task created!');
    setIsLoading(true);
    try {
      if (task) {
        await TaskService.updateTask(task.id, {
          id: task.id,
          ...data,
          dueDate: data.dueDate as Date | null | undefined,
        });

        const labelsToAdd = labels.filter(
          (label) =>
            data.labelIds?.includes(label.id) &&
            !task.labels?.some((tLabel) => tLabel.id === label.id),
        );
        const labelsToRemove =
          task.labels?.filter(
            (tLabel) => !data.labelIds?.includes(tLabel.id),
          ) || [];

        const addLabelPromises = labelsToAdd.map((label) =>
          TaskService.addLabel({ taskId: task.id, labelId: label.id }),
        );

        const removeLabelPromises = labelsToRemove.map((label) =>
          TaskService.removeLabel({ taskId: task.id, labelId: label.id }),
        );

        await Promise.all([...addLabelPromises, ...removeLabelPromises]);

        toast.success('Task updated.');
      } else {
        // Adding date to default value since it goes to previous day
        let realDate = data.dueDate ?? undefined;

        if (initialValues?.dueDate) {
          realDate = add(new Date(initialValues.dueDate), { days: 1 });
        }

        const createdTask = await TaskService.createTask({
          ...data,
          dueDate: realDate as Date | null | undefined,
        });

        if (data.labelIds?.length) {
          const labelPromises = data.labelIds.map((labelId) =>
            TaskService.addLabel({ taskId: createdTask.id, labelId }),
          );

          await Promise.all(labelPromises);
        }

        toast.success('Task created.');
      }
      router.refresh();
      close && close();
      closeTaskOverlay();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(true);
    }
  };

  // TODO: Figure out sharing and updates state fx. list and labels

  const watchName = form.watch('name');

  const onCancel = () => {
    close && close();
    closeTaskOverlay();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="p-1">
          <MentionsInput
            form={form}
            lists={lists}
            labels={labels}
            register="name"
            preview={preview}
            small={small}
          />
          <Input
            transparent
            {...form.register('description')}
            placeholder="Description"
            className="pt-0"
            autoComplete="off"
          />
        </div>
        <div className="flex-gap p-3 pt-0 flex-wrap max-w-full">
          <DatePicker
            variant={{
              type: 'form',
              form,
              register: 'dueDate',
            }}
            defaultValue={defaultValues.dueDate}
            small={small}
          />
          <PriorityPicker
            variant={{
              type: 'form',
              form,
              register: 'priority',
            }}
            defaultValue={defaultValues.priority}
            small={small}
          />
        </div>
        <Separator />
        <div className="flex-between p-3">
          <div>
            <ListPicker
              lists={lists}
              form={form}
              register="listId"
              defaultValue={defaultValues.listId}
            />
          </div>
          <div className="flex-gap">
            <Button
              variant="secondary"
              size="sm"
              onClick={onCancel}
              type="button"
            >
              {small ? <Icons.Close className="w-4 h-4" /> : 'Cancel'}
            </Button>
            <Button size="sm" disabled={!watchName || isLoading}>
              {(small && <Icons.Send className="w-4 h-4" />) ||
                (task ? 'Save changes' : 'Create task')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
