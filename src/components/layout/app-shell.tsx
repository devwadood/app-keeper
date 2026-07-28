import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  AppWindow,
  BarChart3,
  Bell,
  Blocks,
  ChevronDown,
  CircleDollarSign,
  Command,
  FileSpreadsheet,
  Gauge,
  HelpCircle,
  Landmark,
  LayoutDashboard,
  Megaphone,
  PanelLeft,
  Plug,
  ReceiptText,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Shuffle,
  Users,
} from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from './theme-toggle'

const navigation = [
  {
    label: 'Workspace',
    items: [
      { href: '/app/overview', label: 'Overview', icon: LayoutDashboard },
      { href: '/app/apps', label: 'Apps', icon: AppWindow },
      { href: '/app/campaigns', label: 'Campaigns', icon: Megaphone },
      { href: '/app/mappings', label: 'Reconciliation', icon: Shuffle, count: 3 },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/app/finance', label: 'Profit & loss', icon: CircleDollarSign },
      { href: '/app/expenses', label: 'Expenses', icon: ReceiptText },
      { href: '/app/reports', label: 'Reports', icon: FileSpreadsheet },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/app/integrations', label: 'Integrations', icon: Plug },
      { href: '/app/sync-health', label: 'Sync health', icon: RefreshCw },
      { href: '/app/settings/members', label: 'Team', icon: Users },
      { href: '/app/settings/organization', label: 'Settings', icon: Settings },
    ],
  },
] as const

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[232px_1fr]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[232px] border-r bg-[var(--panel)] lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-5">
          <Logo />
        </div>
        <div className="mx-3 mb-4 flex items-center gap-2 rounded-xl border bg-[var(--panel-subtle)] p-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-[#dedfff] text-xs font-bold text-[#4d4fc4]">
            WY
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">WyndGo Studio</p>
            <p className="mt-0.5 text-[10px] text-[var(--muted)]">20 apps · USD</p>
          </div>
          <ChevronDown size={14} className="text-[var(--muted)]" />
        </div>
        <nav
          className="flex-1 overflow-y-auto px-3 pb-5"
          aria-label="Application navigation"
        >
          {navigation.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                {group.label}
              </p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-[var(--muted)] transition hover:bg-[var(--panel-subtle)] hover:text-[var(--foreground)]"
                >
                  <item.icon size={16} />
                  <span className="flex-1">{item.label}</span>
                  {'count' in item && (
                    <span className="rounded-full bg-[var(--warning-soft)] px-1.5 py-0.5 text-[10px] text-[var(--warning)]">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="border-t p-3">
          <Link
            href="/security"
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-[var(--muted)] hover:bg-[var(--panel-subtle)]"
          >
            <HelpCircle size={15} />
            Help & documentation
          </Link>
          <div className="mt-1 flex items-center gap-2.5 rounded-xl p-2">
            <span className="grid size-8 place-items-center rounded-full bg-[#d7f3e8] text-xs font-semibold text-[#16704f]">
              AK
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">Adeel Khan</p>
              <p className="truncate text-[10px] text-[var(--muted)]">Owner</p>
            </div>
            <ChevronDown size={14} className="text-[var(--muted)]" />
          </div>
        </div>
      </aside>
      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-[color-mix(in_srgb,var(--background),transparent_12%)] px-4 backdrop-blur-xl md:px-7">
          <button
            className="grid size-9 place-items-center rounded-lg border bg-[var(--panel)] lg:hidden"
            aria-label="Open navigation"
          >
            <PanelLeft size={17} />
          </button>
          <button className="hidden h-9 w-full max-w-[310px] items-center gap-2 rounded-lg border bg-[var(--panel)] px-3 text-left text-xs text-[var(--muted)] sm:flex">
            <Search size={15} />
            <span className="flex-1">Search apps, accounts, reports…</span>
            <span className="flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px]">
              <Command size={10} /> K
            </span>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-lg border bg-[var(--panel)] px-3 py-2 text-xs md:flex">
              <span className="size-1.5 rounded-full bg-[var(--success)]" />
              Synced 8 min ago
            </div>
            <button
              className="relative grid size-9 place-items-center rounded-lg border bg-[var(--panel)] text-[var(--muted)]"
              aria-label="Notifications"
            >
              <Bell size={16} />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[var(--danger)] ring-2 ring-[var(--panel)]" />
            </button>
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 md:p-7">{children}</main>
      </div>
    </div>
  )
}

export const pageIcons = {
  apps: AppWindow,
  campaigns: Megaphone,
  mappings: Shuffle,
  finance: Landmark,
  expenses: ReceiptText,
  reports: FileSpreadsheet,
  imports: Blocks,
  integrations: Plug,
  'sync-health': Gauge,
  notifications: Bell,
  accounts: BarChart3,
  settings: ShieldCheck,
}
