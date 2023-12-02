import * as React from "react" 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SelectSingleEventHandler } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { formatToEEEDDMMM } from "@/util/format"

import { cn } from "@/lib/utils"

interface DatePickerProps {
    placeholder?: string
    selected: any
    onSelect: (string: any) => void
}

export function DatePicker({ selected, placeholder, onSelect } : DatePickerProps) {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  
    const handleOnSelect: SelectSingleEventHandler = (date) => {
      onSelect?.(date)
      setIsPopoverOpen(false)
    }
  
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn('max-w-[240px] w-full justify-start text-left font-normal', !selected && 'text-muted-foreground')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? <span>{formatToEEEDDMMM(selected)}</span> : <span>{placeholder || 'Pick a date' }</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={selected} onSelect={handleOnSelect} initialFocus />
        </PopoverContent>
      </Popover>
    )
  }