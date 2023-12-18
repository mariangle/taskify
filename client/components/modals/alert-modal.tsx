'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
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

  const modalTitle = title ? title : 'Are you sure?'
  const modalDescription = description ? description : 'This action cannot be undone.'

  return (
    <Modal title={modalTitle} description={modalDescription} isOpen={isOpen} onClose={onClose}>
      <div className="space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="default" onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  )
}

export default AlertModal
