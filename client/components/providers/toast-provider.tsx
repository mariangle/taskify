'use client'

import { Toaster, ToastBar } from 'react-hot-toast'
import { toastStyles } from '@/styles/styles'

export default function ToastProvider() {
  return <Toaster containerStyle={{ top: 100 }} position="bottom-right" toastOptions={toastStyles} />
}
