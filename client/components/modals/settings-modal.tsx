'use client'

import * as React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

import { useClickOutside } from '@/hooks/use-click-outside'
import Settings from '../settings'

interface SettingsModalProps {
  children: React.ReactNode
}

export default function SettingsModal({ children }: SettingsModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dialogRef = React.useRef(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  useClickOutside(dialogRef, close)

  return (
    <>
      <div onClick={open} className="cursor-pointer">
        {children}
      </div>
      <Dialog open={isOpen}>
        <DialogContent ref={dialogRef} className="p-4">
          settings
        </DialogContent>
      </Dialog>
    </>
  )
}
