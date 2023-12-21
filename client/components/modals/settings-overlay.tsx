'use client'

import * as React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useLayoutStore } from '@/store/layout-store'

import SettingsPanel from '@/components/settings/settings-panel'

export default function SettingsModal() {
  const { showSettings, toggleSettings } = useLayoutStore()

  // ! Ideally want a drawer for mobile but dialog cannot be wrapped in outer div
  // TODO: Make a custom overlay which takes in children as props and displays mobile and desktop overlays

  return (
    <>
      <Dialog open={showSettings} onOpenChange={toggleSettings}>
        <DialogContent className="max-w-screen-md h-fit overflow-y-auto max-h-screen">
          <SettingsPanel />
        </DialogContent>
      </Dialog>
    </>
  )
}
