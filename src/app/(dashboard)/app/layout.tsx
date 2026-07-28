import type { ReactNode } from 'react'
import { AppShell } from '@/components/layout/app-shell'
import '../../globals.css'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
