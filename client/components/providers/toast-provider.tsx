'use client'

import { Toaster } from 'react-hot-toast'
import { toastStyles } from '@/styles/styles'

export function ToastProvider() {
  return <Toaster containerStyle={{ top: 100 }} position="bottom-right" toastOptions={toastStyles} />
}
