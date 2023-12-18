import type { Metadata } from 'next'
import { cn } from '@/lib/util/cn'
import { inter } from '@/styles/fonts'
import '@/styles/globals.css'

import ToastContext from '@/components/providers/toast-provider'
import ThemeProvider from '@/components/providers/theme-provider'
import { config } from '@/lib/config'

export const metadata: Metadata = config.metadata

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <ThemeProvider>
          <main className="text-foreground bg-background">
            {props.children}
            <ToastContext />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
