"use client"

import * as React from "react"
import { Icons } from "@/components/icons"
import { DayContentProps, DayPicker } from "react-day-picker"
import { isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { TaskResponse } from "@/types"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

interface CustomProps{
  tasks: TaskResponse[] | []
}


function Calendar({
  className,
  classNames,
  tasks,
  showOutsideDays = true,
  ...props
}: CalendarProps & CustomProps) {

  function CalendarDateItem(props: DayContentProps & CustomProps) {
    const hasSameDate = props.tasks.some(
      (task) =>
        task.dueDate && isSameDay(new Date(task.dueDate), props.date)
    );

    return (
      <span>
        {props.date.getDate()}
        <span
          className={`block w-1 h-1 bg-black dark:bg-white -translate-x-[3px] rounded-full absolute left-1/2 transform-translate-x-1/2 ${hasSameDate ? 'visible' : 'invisible'}`}
        />
      </span>
    );
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-full w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <Icons.chevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <Icons.chevronRight className="h-4 w-4" />,
        DayContent: ({ ...props }) => <CalendarDateItem {...props} tasks={tasks}/>,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
