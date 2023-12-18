'use client'

import { Toaster } from 'react-hot-toast'
import { toastStyles } from '@/styles/styles'

export default function ToastProvider() {
  return <Toaster toastOptions={toastStyles} />
}
