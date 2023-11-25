"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useRouter, useSearchParams } from "next/navigation"
import { LabelResponse } from "@/types"

interface LabelSwitcherProps {
  labels: LabelResponse[] | []
}

export default function LabelFilter({
  labels
} : LabelSwitcherProps ) {
  const searchParams = useSearchParams()
  const labelId = searchParams.get('labelId')
  const router = useRouter();
  const selectedLabel = labels.find((label) => label.id === labelId )
  const [open, setOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>(selectedLabel?.name ?? "")

  // TODO: Create filter store

  const handleLabelSelect = (currentValue: string, labelId: string) => {
    setValue(currentValue === value ? "" : currentValue);
    setOpen(false);
    router.push(currentValue === value ? `/tasks` : `/tasks?labelId=${labelId}`)};
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between"
        >
          {value
            ? labels.find((label) => label.name === value)?.name
            : 'Filter'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search labels..." />
          <CommandEmpty>No label found.</CommandEmpty>
          <CommandGroup>
            {labels.map((label) => (
              <CommandItem
                key={label.id}
                value={label.name}
                onSelect={(currentValue) => handleLabelSelect(currentValue, label.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === label.name ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="flex-gap">
                  <div className="h-2 w-2 rounded-full border" style={{ backgroundColor: label.color }} />
                  {label.name}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
