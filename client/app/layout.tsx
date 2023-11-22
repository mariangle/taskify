import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import ToasterContext from '@/contexts/toaster-context'
import ThemeContext from '@/contexts/theme-context'
import NextUIContext from '@/contexts/next-ui-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Taskify',
    template: `%s | Taskify`,
  },
  description: "Collaborate, manage projects, and reach new productivity peaks",
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg"
    }
  ]
}

export default function RootLayout(props: {
  children: React.ReactNode,
  modal: React.ReactNode,
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <NextUIContext>
            <ThemeContext>
              <main className="text-foreground bg-background">
                {props.children}
                {props.modal}                  
                <ToasterContext />
              </main>
            </ThemeContext>
          </NextUIContext>
        </body>
      </html>
  )
}
