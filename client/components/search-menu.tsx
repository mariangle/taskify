"use client"

import * as React from "react"

import {
  Circle,
  CheckCircle,
  Sun,
  Moon,
  Monitor,
  LineChart,
  Settings,
  Tags,
} from "lucide-react";

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,  
  CommandSeparator,
  CommandShortcut,

} from "@/components/ui/command"
import { TaskResponse } from "@/types"
import { config } from "@/lib/config"
import { useTheme } from "next-themes"

interface SearchTaskProps {
    tasks: TaskResponse[] | []
}

export default function SearchMenu({ tasks, ...props }: SearchTaskProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 text-start"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Tags className="mr-2 h-4 w-4" />
              <span>Labels</span>
              <CommandShortcut>⌘L</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <LineChart className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
            <CommandGroup heading='Tasks'>
              {tasks.map((task) => (
                <CommandItem
                  key={task.id}
                  value={task.name} // ! Tasks with same name are odd
                  onSelect={() => {
                    runCommand(() => router.push(`/tasks/${task.id}`))
                  }}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center">
                    {task.status === 'Completed'
                    ? <CheckCircle className="h-3 w-3" />
                    : <Circle className="h-3 w-3"/>
                    }
                  </div>
                  {task.name}
                </CommandItem>
              ))}
            </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Monitor className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}