import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { clientEnv } from '@/lib/env/client'
import '../globals.css'

export const metadata: Metadata = {
  title: `Sign in · ${clientEnv.NEXT_PUBLIC_APP_NAME}`,
  description: 'Secure access to your AppLedger workspace.',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
