'use client';

import * as React from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';

import AlertModal from '@/components/modals/alert-modal';

import { handleError } from '@/lib/util/error';
import { ListService } from '@/services/list-service';
import type { List } from '@/types';
import { listFormSchema, ListFormValues } from '@/lib/validations/list-schema';
import { LISTS_KEY } from '@/lib/api';

interface FormProps {
  list?: List;
  onClose: () => void;
}

function ListForm({ list, onClose }: FormProps) {
  const defaultValues: Partial<ListFormValues> = {
    name: list?.name,
  };

  const form = useForm<ListFormValues>({
    resolver: zodResolver(listFormSchema),
    defaultValues,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const closeDialog = () => setIsOpen(false);
  const openDialog = () => setIsOpen(true);

  const onSubmit = async (data: ListFormValues) => {
    try {
      setIsLoading(true);

      if (list) {
        ListService.updateList(list.id, { id: list.id, ...data });
        toast.success('List updated!');
      } else {
        await ListService.createList(data);
        toast.success('List created!');
      }
      router.refresh();
      mutate(LISTS_KEY);
      onClose();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (listId: string) => {
    setIsLoading(true);
    try {
      await ListService.deleteList(listId);
      router.refresh();
      toast.success('List deleted!');
      mutate(LISTS_KEY);
      onClose();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {list && (
          <AlertModal
            isOpen={isOpen}
            description="All tasks in this list will be deleted."
            onClose={closeDialog}
            onConfirm={() => onDelete(list.id)}
            loading={isLoading}
          />
        )}
        <Input {...form.register('name')} placeholder="Work" />
        <div className="flex justify-between pt-4">
          <div>
            {list && (
              <Button type="button" variant="secondary" onClick={openDialog}>
                <Icons.Trash className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="flex-gap">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {list ? 'Save Changes' : 'Create List'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ListForm;
