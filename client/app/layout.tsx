import type { Metadata } from 'next'
import { inter } from '@/styles/fonts'
import { config } from '@/lib/config'
import '@/styles/globals.css'

import { ToastProvider } from '@/components/providers/toast-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

export const metadata: Metadata = config.metadata

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider defaultTheme="midnight" attribute="class" enableSystem disableTransitionOnChange>
          <main>
            {props.children}
            <ToastProvider />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
