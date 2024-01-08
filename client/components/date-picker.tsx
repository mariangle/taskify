'use client';

import * as React from 'react';
import toast from 'react-hot-toast';

import { Armchair, CalendarCheck2, CircleSlash, Sunset } from 'lucide-react';
import { FieldValues, PathValue, Path, UseFormReturn } from 'react-hook-form';
import { addDays, format, formatDistance, isBefore } from 'date-fns';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/ui/icons';
import { Separator } from '@/components/ui/seperator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/util/tw-merge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Task } from '@/types';
import { TaskService } from '@/services/task-service';
import { handleError } from '@/lib/util/error';
import { useMounted } from '@/hooks/use-mounted';
import { Calendar } from '@/components/ui/experimental-calendar';

interface FormVariant<T extends FieldValues> {
  type: 'form';
  form: UseFormReturn<T>;
  register: Path<T>;
}

interface TaskVariant {
  type: 'item' | 'dropdown';
  task: Task;
}

interface DatePickerProps<T extends FieldValues> {
  variant: FormVariant<T> | TaskVariant;
  defaultValue?: Date | string | null;
  small?: boolean;
}

export function DatePicker<T extends FieldValues>({
  defaultValue,
  variant,
  small = false,
}: DatePickerProps<T>) {
  // Convert defaultValue to Date if it's a string
  let defaultDate;

  if (defaultValue) {
    if (typeof defaultValue === 'string') {
      defaultDate = new Date(defaultValue);
    } else {
      defaultDate = defaultValue;
    }
  } else {
    defaultDate = undefined;
  }

  const isMounted = useMounted();
  const router = useRouter();
  const [, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Date | undefined>(
    defaultDate || undefined,
  );

  if (!isMounted) return null;

  const onSelect = async (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue(selectedDate);
      setOpen(false);

      if ('form' in variant) {
        const { form, register } = variant as FormVariant<T>;
        form.setValue(register, selectedDate as PathValue<T, Path<T>>);
      }

      if ('task' in variant) {
        const { task } = variant as TaskVariant;
        setIsLoading(true);
        try {
          await TaskService.updateTask(task.id, {
            ...task,
            dueDate: selectedDate,
          });
          toast.success('Changes saved.');
          router.refresh();
        } catch (err) {
          handleError(err);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const removeDate = async (task: Task) => {
    setIsLoading(true);
    try {
      await TaskService.updateTask(task.id, { ...task, dueDate: null });
      toast.success('Due date removed.');
      router.refresh();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRemove = async () => {
    setValue(undefined);
    setOpen(false);

    if ('form' in variant) {
      const { form, register } = variant as FormVariant<T>;
      form.unregister(register);
    }

    if ('task' in variant) {
      const { task } = variant as TaskVariant;
      await removeDate(task);
    }
  };

  const dateOptions = [
    { value: '0', label: 'Today', icon: CalendarCheck2 },
    { value: '1', label: 'Tomorrow', icon: Sunset },
    { value: '7', label: 'In a week', icon: Armchair },
  ];

  const DropdownPopover = React.memo(() => (
    <div className="flex items-center">
      {dateOptions.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant="ghost"
          onClick={() =>
            onSelect(addDays(new Date(), parseInt(option.value, 10)))
          }
        >
          <option.icon className="h-4 w-4" />
        </Button>
      ))}
      <PopoverTrigger
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
      >
        <Icons.More className="h-3 w-3" />
      </PopoverTrigger>
    </div>
  ));

  const ItemPopoverTrigger = React.memo(() => {
    const { task } = variant as TaskVariant;

    if (task.dueDate) {
      return (
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: 'picker', size: 'icon' }),
            'w-fit px-1',
            isBefore(new Date(task.dueDate), new Date()) && 'text-destructive',
          )}
        >
          <Icons.Calendar className="h-3 w-3 mr-1" />
          <span className="text-xs">
            {formatDistance(new Date(task.dueDate), new Date(), {
              addSuffix: true,
            })}
          </span>
        </PopoverTrigger>
      );
    }
    return null;
  });

  const FormPopoverTrigger = React.memo(() => (
    <PopoverTrigger
      className={cn(buttonVariants({ variant: 'outline' }), 'w-fit gap-2')}
    >
      <Icons.Calendar className="h-4 w-4" />
      {value ? (
        <span className="flex-gap">
          {format(value, 'dd-MM-yyyy')}
          <Icons.Close className="h-4 w-4" onClick={onRemove} />
        </span>
      ) : (
        !small && <span>Schedule</span>
      )}
    </PopoverTrigger>
  ));

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      {(() => {
        let componentToRender;

        switch (variant.type) {
          case 'item':
            componentToRender = <ItemPopoverTrigger />;
            break;
          case 'dropdown':
            componentToRender = <DropdownPopover />;
            break;
          default:
            componentToRender = <FormPopoverTrigger />;
        }

        return componentToRender;
      })()}
      <PopoverContent className="w-[220px]">
        <div className="py-2">
          {dateOptions.map((option) => (
            <Button
              key={option.value}
              className="w-full justify-start text-xs px-3 h-6 rounded-none"
              variant="ghost"
              onClick={() =>
                onSelect(addDays(new Date(), parseInt(option.value, 10)))
              }
            >
              <option.icon className="h-4 w-4 mr-2" />
              {option.label}
              <span className="ml-auto text-xs text-muted-foreground">
                {format(
                  addDays(new Date(), parseInt(option.value, 10)),
                  'EEEE',
                )}
              </span>
            </Button>
          ))}
          <Button
            className="w-full justify-start text-xs px-3 h-6 rounded-none"
            variant="ghost"
            onClick={onRemove}
          >
            <CircleSlash className="h-4 w-4 mr-2" />
            No Date
          </Button>
        </div>
        <Separator />
        <Calendar
          mode="single"
          selected={value}
          onSelect={onSelect}
          initialFocus
          className="p-1"
        />
      </PopoverContent>
    </Popover>
  );
}
