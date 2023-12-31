'use client';

import * as React from 'react';
import * as z from 'zod';
import toast from 'react-hot-toast';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import type { LabelResponse } from '@/types/label';
import { handleError } from '@/lib/util';
import { LabelService } from '@/services/label-service';
import { useSignal } from '@/hooks/use-signal';

interface FormProps {
  label?: LabelResponse;
  close?: () => void;
}

export const labelFormSchema = z.object({
  name: z.string().min(2),
  color: z.string().min(2),
});

export type LabelFormValues = z.infer<typeof labelFormSchema>;

export default function LabelForm({ label, close }: FormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { triggerSignal } = useSignal();

  const form = useForm<LabelFormValues>({
    resolver: zodResolver(labelFormSchema),
    defaultValues: {
      ...label,
      color: label?.color || '#ffffff',
      name: label?.name || '',
    },
  });

  const onSubmit = async (data: LabelFormValues) => {
    try {
      setIsLoading(true);
      if (label) {
        await LabelService.updateLabel(label.id, { ...data, id: label.id });
        toast.success('Changes saved.');
      } else {
        await LabelService.createLabel(data);
        toast.success('Label created!');
      }
      triggerSignal();
      router.refresh();
      close && close();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onCancel = () => {
    close && close();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex-gap w-full">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg. Shopping"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-gap justify-end mt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            <Icons.Close className="w-4 h-4" />
          </Button>
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            {label ? 'Save' : 'Add'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
