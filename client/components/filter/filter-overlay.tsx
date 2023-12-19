import React from 'react'

import { Drawer } from 'vaul'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { useMounted } from '@/hooks/use-mounted'
import FilterControl from '@/components/filter/filter-control'
import { LabelResponse } from '@/types'
import LabelService from '@/services/label-service'
import { useGlobalStore } from '@/hooks/use-global-store'

export default function FilterOverlay() {
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const [openDropdown, setOpenDropdown] = React.useState(false)
  const [labels, setLabels] = React.useState<LabelResponse[]>([])
  const isMounted = useMounted()

  const { signal } = useGlobalStore()

  React.useEffect(() => {
    const getLabels = async () => {
      const labels = await LabelService.getLabels()
      setLabels(labels)
    }
    getLabels()
  }, [signal])

  if (!isMounted) return null

  return (
    <>
      <div className="md:hidden">
        <Drawer.Root open={openDrawer} onOpenChange={setOpenDrawer}>
          <Drawer.Trigger>
            <Button variant={'outline'} onClick={() => setOpenDrawer(!openDrawer)}>
              <Icons.filter className="w-3 h-3" />
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-zinc-100 dark:bg-zinc-900 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-4 bg-white dark:bg-zinc-900 rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 " />
                <div className="mx-auto max-w-md w-full">
                  <FilterControl labels={labels} close={() => setOpenDrawer(false)} />
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <div className="hidden md:block">
        <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'} onClick={() => setOpenDropdown(!openDropdown)}>
              <Icons.filter className="w-3 h-3 mr-2" />
              Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full max-w-xs p-4 overflow-y-auto">
            <FilterControl labels={labels} close={() => setOpenDropdown(false)} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
