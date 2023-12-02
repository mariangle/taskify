"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { priorities } from "@/lib/constants"

type Priority = {
  id: number,
  value: string,
  label: string
}

interface PriorityPickerProps {
  priority: string | undefined | null,
  setPriority: React.Dispatch<React.SetStateAction<string | null>>,
}

export function PriorityPicker({
  priority, setPriority
} : PriorityPickerProps) {
  const [open, setOpen] = React.useState(false)

  const priorityInfo = priorities.find((p: Priority) => p.value === priority)!

  const handleSelect = (p: Priority) => {
    p.value === priority ? setPriority(null) :  setPriority(p.value);
    setOpen(false);
  }

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
          variant={"ghost"}
          className={cn(
            "justify-start text-left font-normal",
            !priority && "text-muted-foreground text-xs"
          )}
          >
            {priority ? (
              <>
                <priorityInfo.icon className="mr-2 h-4 w-4 shrink-0" />
                {priorityInfo?.label}
              </>
            ) : (
              <>Apply Priority</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandList>
              <CommandGroup>
                {priorities.map((priorityOption) => (
                  <CommandItem
                  key={priorityOption.id}
                  value={priorityOption.value}
                  onSelect={() => {
                    handleSelect(priorityOption)
                  }}
                      > 
                      <priorityOption.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        priorityOption.value === priorityOption?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{priorityOption.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
