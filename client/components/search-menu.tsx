'use client'

import * as React from 'react'

import { Icons } from '@/components/icons'

import { cn } from '@/lib/util/cn'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { useGlobalStore } from '@/hooks/use-global-store'

export default function SearchMenu({ ...props }) {
  const [open, setOpen] = React.useState(false)
  const { showSidebar } = useGlobalStore()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          'w-full group relative flex h-12 justify-start rounded-none border-r-2 border-transparent text-muted-foreground',
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex ml-2">
          <Icons.search className="w-4 h-4" />
        </span>
        {<span className={cn('ml-2 block', !showSidebar && 'md:hidden')}>Search</span>}
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
        </CommandList>
      </CommandDialog>
    </>
  )
}
