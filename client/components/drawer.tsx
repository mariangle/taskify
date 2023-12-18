'use client'

import { Drawer } from 'vaul'

export function MyDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button>Open Drawer</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 dark:bg-zinc-900 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white dark:bg-zinc-900 rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-700 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">Unstyled drawer for React.</Drawer.Title>
              <p className="text-muted-foreground mb-2">
                This component can be used as a replacement for a Dialog on mobile and tablet devices.
              </p>
            </div>
          </div>
          <div className="p-4 bg-zinc-100 border-t border-zinc-200 dark:bg-zinc-700 dark:border-zinc-900 mt-auto"></div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
