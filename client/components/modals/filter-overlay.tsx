import * as React from 'react'

import { Icons } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'

import FilterControl from '@/components/shared/filter/filter-control'
import LabelService from '@/services/label-service'

import { LabelResponse } from '@/types'
import { useSignal } from '@/hooks/use-signal'
import { useMediaQuery } from '@/hooks/use-media-query'

export default function FilterOverlay() {
  const [isOpen, setOpen] = React.useState(false)
  const [labels, setLabels] = React.useState<LabelResponse[]>([])
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const open = () => setOpen(true)
  const close = () => setOpen(false)

  const { signal } = useSignal()

  React.useEffect(() => {
    const subscribe = async () => {
      const labels = await LabelService.getLabels()
      setLabels(labels)
    }
    if (isOpen) subscribe()
  }, [signal, isOpen])

  if (isDesktop) {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} onClick={open}>
            <Icons.filter className="w-3 h-3 mr-2" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full max-w-xs p-4 overflow-y-auto">
          <FilterControl labels={labels} close={close} />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={'outline'} onClick={open}>
          <Icons.filter className="w-3 h-3 mr-2" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <FilterControl labels={labels} close={close} />
      </DrawerContent>
    </Drawer>
  )
}
