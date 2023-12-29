'use client'

import * as React from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useMounted } from '@/hooks/use-mounted'

interface AlertModalProps {
  title?: string
  description?: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

const AlertModal: React.FC<AlertModalProps> = ({ title, description, isOpen, onClose, onConfirm, loading }) => {
  const isMounted = useMounted()

  if (!isMounted) {
    return null
  }

  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  const modalTitle = title ? title : 'Are you sure?'
  const modalDescription = description ? description : 'This action cannot be undone.'

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="p-6">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        <div className="space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onConfirm}>
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AlertModal
