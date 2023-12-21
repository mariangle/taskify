'use client'

import { useEffect, useState } from 'react'

import SettingsOverlay from '@/components/modals/settings-overlay'
import TaskOverlay from '@/components/modals/task-overlay'

export default function OverlayProvider() {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <SettingsOverlay />
      <TaskOverlay />
    </>
  )
}
