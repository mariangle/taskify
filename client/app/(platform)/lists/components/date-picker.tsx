"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {  
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined | null>>,
}

export function DatePicker({
  date,
  setDate,
}: DatePickerProps) {

  const handleSelect = (selectedDate: Date | undefined) => {
    // Unselect date if its undefined
    selectedDate ? setDate(selectedDate) : setDate(null)
  }
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "text-xs p-2 h-fit",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Due Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => handleSelect(selectedDate)}
          initialFocus
        />
        {JSON.stringify(date)}
      </PopoverContent>
    </Popover>
  );
}
