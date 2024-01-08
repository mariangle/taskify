import * as React from 'react';

import type { Metadata } from 'next';
import { inter } from '@/styles/fonts';
import { config } from '@/lib/config';
import '@/styles/globals.css';

import { ToastProvider } from '@/components/providers/toast-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

// eslint-disable-next-line prefer-destructuring
export const metadata: Metadata = config.metadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="dark"
          attribute="class"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            {children}
            <ToastProvider />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
