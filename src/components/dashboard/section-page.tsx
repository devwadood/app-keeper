import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleAlert, Plus, RefreshCw } from 'lucide-react'
import { pageIcons } from '@/components/layout/app-shell'

const copy: Record<string, { title: string; description: string; action: string }> = {
  apps: {
    title: 'Android apps',
    description: 'Canonical app identities and cross-source performance.',
    action: 'Add app',
  },
  campaigns: {
    title: 'Google Ads campaigns',
    description: 'Acquisition spend, performance, and app attribution.',
    action: 'Sync campaigns',
  },
  mappings: {
    title: 'Source reconciliation',
    description: 'Review unmapped spend, revenue, and identity suggestions.',
    action: 'Review mappings',
  },
  finance: {
    title: 'Profit & loss',
    description: 'App, account, and organization profitability with auditable formulas.',
    action: 'Export P&L',
  },
  expenses: {
    title: 'Operating expenses',
    description: 'Direct and shared costs with transparent app allocations.',
    action: 'Add expense',
  },
  reports: {
    title: 'Reports',
    description: 'Scheduled and on-demand financial reports in CSV, XLSX, and PDF.',
    action: 'New report',
  },
  imports: {
    title: 'Spreadsheet imports',
    description: 'Migrate historical monthly workbooks with a review step.',
    action: 'Import workbook',
  },
  integrations: {
    title: 'Google integrations',
    description: 'Secure, incremental, read-only connections to your data sources.',
    action: 'Connect Google',
  },
  'sync-health': {
    title: 'Sync health',
    description: 'Freshness, queued work, and integration diagnostics.',
    action: 'Run health check',
  },
  notifications: {
    title: 'Notifications',
    description: 'Data alerts, report updates, and security events.',
    action: 'Preferences',
  },
  accounts: {
    title: 'Connected accounts',
    description: 'Play, Google Ads, and AdMob account summaries.',
    action: 'Discover accounts',
  },
  settings: {
    title: 'Workspace settings',
    description: 'Organization, members, security, and data controls.',
    action: 'Save changes',
  },
  onboarding: {
    title: 'Welcome to AppLedger',
    description: 'Set up your organization and start the first data backfill.',
    action: 'Continue setup',
  },
}

export function SectionPage({ section, detail }: { section: string; detail?: string }) {
  if (section === 'apps' && detail) return <AppDetail />
  const content = copy[section] ?? copy.settings
  const Icon = pageIcons[section as keyof typeof pageIcons] ?? pageIcons.settings
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 grid size-10 place-items-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Icon size={19} />
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.035em]">{content.title}</h1>
          <p className="mt-1.5 text-sm text-[var(--muted)]">{content.description}</p>
        </div>
        <button className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-3.5 text-xs font-medium text-[var(--panel)]">
          <Plus size={14} />
          {content.action}
        </button>
      </header>
      {section === 'integrations' ? (
        <Integrations />
      ) : section === 'mappings' ? (
        <Mappings />
      ) : (
        <GenericTable section={section} />
      )}
    </div>
  )
}

function Integrations() {
  const rows = [
    {
      name: 'Google Ads',
      detail: 'WyndGo Growth · 100-200-3004',
      status: 'Healthy',
      fresh: '8 min ago',
      tone: 'success',
    },
    {
      name: 'Google AdMob',
      detail: 'WyndGo AdMob · pub-1234…3456',
      status: 'Preliminary',
      fresh: '22 min ago',
      tone: 'accent',
    },
    {
      name: 'Google Play',
      detail: '4 developer profiles · 20 apps',
      status: 'Delayed',
      fresh: '2 days ago',
      tone: 'warning',
    },
  ]
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {rows.map((row) => (
        <article className="panel p-5" key={row.name}>
          <div className="flex items-start justify-between">
            <span className="grid size-10 place-items-center rounded-xl bg-[var(--panel-subtle)] font-bold">
              G
            </span>
            <span
              className={`pill ${row.tone === 'success' ? 'bg-[var(--success-soft)] text-[var(--success)]' : row.tone === 'warning' ? 'bg-[var(--warning-soft)] text-[var(--warning)]' : 'bg-[var(--accent-soft)] text-[var(--accent)]'}`}
            >
              {row.status}
            </span>
          </div>
          <h2 className="mt-5 text-sm font-semibold">{row.name}</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">{row.detail}</p>
          <div className="mt-5 flex items-center justify-between border-t pt-4 text-[11px] text-[var(--muted)]">
            <span>Synced {row.fresh}</span>
            <Link
              href="/app/sync-health"
              className="flex items-center gap-1 text-[var(--accent)]"
            >
              Manage <ArrowRight size={12} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  )
}

function Mappings() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="panel overflow-hidden">
        <div className="border-b p-5">
          <h2 className="text-sm font-semibold">Unmapped source data</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            These values remain included in organization totals.
          </p>
        </div>
        {[
          'Flashlight Global – App campaign',
          'AdMob app ca-app-pub…812',
          'Ramadan 2026 Acquisition',
        ].map((name, index) => (
          <div key={name} className="flex items-center gap-3 border-b p-4 last:border-0">
            <span className="grid size-8 place-items-center rounded-lg bg-[var(--warning-soft)] text-[var(--warning)]">
              <CircleAlert size={15} />
            </span>
            <div className="flex-1">
              <b className="text-xs font-medium">{name}</b>
              <p className="mt-1 text-[10px] text-[var(--muted)]">
                {index === 1
                  ? '$184.22 unmapped revenue'
                  : `$${[468.62, 0, 291.14][index].toFixed(2)} unmapped spend`}
              </p>
            </div>
            <button className="rounded-lg border px-3 py-2 text-[11px] font-medium">
              Map source
            </button>
          </div>
        ))}
      </div>
      <div className="panel p-5">
        <h2 className="text-sm font-semibold">Reconciliation</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Organization totals compared with mapped app totals.
        </p>
        <div className="mt-6 space-y-4">
          <Metric label="Source revenue" value="$48,284.70" />
          <Metric label="Mapped revenue" value="$48,100.48" />
          <Metric label="Difference" value="$184.22" warning />
        </div>
      </div>
    </div>
  )
}

function GenericTable({ section }: { section: string }) {
  const title =
    section === 'expenses'
      ? 'Recent expenses'
      : section === 'reports'
        ? 'Generated reports'
        : section === 'sync-health'
          ? 'Source status'
          : 'Portfolio records'
  return (
    <section className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Tenant-scoped data for WyndGo Studio
          </p>
        </div>
        <RefreshCw size={15} className="text-[var(--muted)]" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-xs">
          <thead className="bg-[var(--panel-subtle)] text-[10px] uppercase tracking-[.06em] text-[var(--muted)]">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-4 py-3">Account</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">State</th>
              <th className="px-5 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {[
              'Naat Ringtones',
              'Qibla Finder',
              'Barcode Scanner',
              'Prayer Times',
              'Device-Info',
            ].map((name, i) => (
              <tr className="border-t" key={name}>
                <td className="px-5 py-4 font-medium">{name}</td>
                <td className="px-4 py-4 text-[var(--muted)]">
                  {['WalrusTech', 'WingTech', 'HyperLumen', 'XentroLabs', 'WingTech'][i]}
                </td>
                <td className="tabular px-4 py-4">
                  ${(8420 - i * 918).toLocaleString()}.20 USD
                </td>
                <td className="px-4 py-4">
                  <span className="pill bg-[var(--success-soft)] text-[var(--success)]">
                    <CheckCircle2 size={11} />
                    Finalized
                  </span>
                </td>
                <td className="px-5 py-4 text-[var(--muted)]">Jul {27 - i}, 2026</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Metric({
  label,
  value,
  warning,
}: {
  label: string
  value: string
  warning?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-[var(--muted)]">{label}</span>
      <b className={`tabular ${warning ? 'text-[var(--warning)]' : ''}`}>{value}</b>
    </div>
  )
}

function AppDetail() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-2xl bg-[#6750a4] text-sm font-bold text-white">
          NR
        </span>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-[-.035em]">Naat Ringtones</h1>
            <span className="pill bg-[var(--success-soft)] text-[var(--success)]">
              Healthy
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--muted)]">
            com.wyndgo.naatringtones · WalrusTech · synced 8 min ago
          </p>
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto border-b text-xs">
        {[
          'Overview',
          'Revenue',
          'Acquisition',
          'AdMob',
          'In-app',
          'Quality',
          'Campaigns',
          'Expenses',
          'Source data',
          'Audit history',
        ].map((tab, i) => (
          <button
            key={tab}
            className={`whitespace-nowrap border-b-2 px-3 py-3 ${i === 0 ? 'border-[var(--accent)] font-semibold text-[var(--accent)]' : 'border-transparent text-[var(--muted)]'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Total revenue', '$8,420.64'],
          ['Ads spend', '$3,126.10'],
          ['Operating profit', '$5,294.54'],
          ['ROAS', '2.69×'],
        ].map(([label, value]) => (
          <div className="panel p-5" key={label}>
            <p className="text-xs text-[var(--muted)]">{label}</p>
            <p className="tabular mt-3 text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>
      <GenericTable section="apps" />
    </div>
  )
}
