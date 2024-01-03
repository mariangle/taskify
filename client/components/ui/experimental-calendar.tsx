/* eslint-disable react/no-unstable-nested-components */

'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/util/tw-merge';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3 w-fit', className)}
      classNames={{
        month: 'space-y-2 w-fit',
        caption: 'flex relative items-center justify-between pl-2',
        caption_label: 'text-xs font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        table: 'border-collapse space-y-1',
        head_row: 'flex w-full',
        head_cell:
          'w-full p-0 text-muted-foreground rounded-md overflow-hidden font-normal text-[0.8rem]',
        row: 'flex',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-7 w-7 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-secondary text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <Icons.ChevronLeft className="h-4 w-4" />,
        IconRight: () => <Icons.ChevronRight className="h-4 w-4" />,
        // eslint-disable-next-line react/no-unstable-nested-components
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
