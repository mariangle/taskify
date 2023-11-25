"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { FormLabel } from "@/components/ui/form";

export type Item = Record<"value" | "label", string>;

export type FancyMultiSelectProps<T extends { id: string }> = {
  items: T[],
  selectedItems: T[],
  placeholder: string,
  label: string,
  onSelectedItemsChange: (selectedItems: T[]) => void;
};

export function ExperimentalMultiSelect<T extends { id: string }>({
  items,
  selectedItems,
  placeholder,
  label,
  onSelectedItemsChange,
}: FancyMultiSelectProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((item: T) => {
    onSelectedItemsChange((prev) => prev.filter((s) => s.id !== item.id));
  }, [onSelectedItemsChange]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            onSelectedItemsChange((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [onSelectedItemsChange]
  );

  const selectables = items.filter((item) => !selectedItems.includes(item));

  return (
    <Command onKeyDown={handleKeyDown} className="flex-1 overflow-visible space-y-2 bg-transparent h-fit">
      <FormLabel>{label}</FormLabel>
         <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      >       <div className="flex gap-1 flex-wrap">
          {selectedItems.map((item) => (
            <Badge key={item.id} variant="secondary">
              {item.name}
              <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onClick={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className=" overflow-auto">
              {selectables.map((item) => (
                <CommandItem
                  key={item.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onSelect={() => {
                    setInputValue("");
                    onSelectedItemsChange((prev) => [...prev, item]);
                  }}
                  className={"cursor-pointer"}
                >
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}