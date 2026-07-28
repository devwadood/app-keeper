import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { clientEnv } from '@/lib/env/client'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: clientEnv.NEXT_PUBLIC_APP_NAME,
    template: `%s · ${clientEnv.NEXT_PUBLIC_APP_NAME}`,
  },
  description: 'Profitability intelligence for Android app portfolios.',
}

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
