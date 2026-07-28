import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { clientEnv } from '@/lib/env/client'

export const metadata: Metadata = {
  title: {
    default: clientEnv.NEXT_PUBLIC_APP_NAME,
    template: `%s · ${clientEnv.NEXT_PUBLIC_APP_NAME}`,
  },
  description: 'Profitability intelligence for Android app portfolios.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
