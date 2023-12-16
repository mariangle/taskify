import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

import ToastContext from '@/components/providers/toast-provider'
import ThemeProvider from '@/components/providers/theme-provider'
import Toaster from '@/components/providers/toaster-provider'
import { config } from '@/lib/config'

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = config.metadata

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <ThemeProvider>
          <main className="text-foreground bg-background">
            {props.children}
            <ToastContext />
            <Toaster />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
