"use client"

import * as React from "react"

import { Icons } from "@/components/icons";

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
          "relative w-full justify-start text-sm text-muted-foreground"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex"><Icons.search className="w-4 h-4"/></span>
        <span className="hidden lg:inline-flex ml-2">Search...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>Nothing found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Icons.settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icons.tags className="mr-2 h-4 w-4" />
              <span>Labels</span>
              <CommandShortcut>⌘L</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Icons.lineChart className="mr-2 h-4 w-4" />
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
                    ? <Icons.checkCircle className="h-3 w-3" />
                    : <Icons.circle className="h-3 w-3"/>
                    }
                  </div>
                  {task.name}
                </CommandItem>
              ))}
            </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <Icons.sun className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Icons.moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Icons.screen className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}