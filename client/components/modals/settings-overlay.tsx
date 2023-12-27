'use client'

import * as React from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

import { useLayoutStore } from '@/store/layout-store'
import { useMediaQuery } from '@/hooks/use-media-query'

import SettingsPanel from '@/components/shared/settings/settings-panel'

export default function SettingsOverlay() {
  const [isOpen, setOpen] = React.useState(false)
  const { showSettings, toggleSettings, setSettings } = useLayoutStore()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  React.useEffect(() => {
    showSettings ? setOpen(true) : setOpen(false)
  }, [showSettings])

  if (isDesktop) {
    return (
      <Dialog open={showSettings} onOpenChange={toggleSettings}>
        <DialogContent className="max-h-screen overflow-y-auto">
          <SettingsPanel />
        </DialogContent>
      </Dialog>
    )
  }

  // A workaround to manage drawer state since it has different behavior than the Dialog
  const onOpenChange = () => {
    setOpen(!isOpen)
    if (!isOpen) {
      setSettings(false)
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="max-h-screen overflow-y-auto">
          <SettingsPanel />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
