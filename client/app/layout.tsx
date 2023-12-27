import type { Metadata } from 'next'
import { inter } from '@/styles/fonts'
import { config } from '@/lib/config'
import '@/styles/globals.css'

import ToastContext from '@/components/providers/toast-provider'

export const metadata: Metadata = config.metadata

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {props.children}
          <ToastContext />
        </main>
      </body>
    </html>
  )
}
