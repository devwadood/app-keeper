import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Download,
  Ellipsis,
  Filter,
  RefreshCw,
} from 'lucide-react'
import { PerformanceChart } from '@/components/charts/performance-chart'
import { KpiCard } from './kpi-card'

const apps = [
  {
    name: 'Naat Ringtones',
    initials: 'NR',
    account: 'WalrusTech',
    revenue: '$8,420.64',
    spend: '$3,126.10',
    profit: '$5,294.54',
    roi: '169.4%',
    tone: '#6750a4',
  },
  {
    name: 'Qibla Finder',
    initials: 'QF',
    account: 'WingTech',
    revenue: '$6,812.20',
    spend: '$2,880.75',
    profit: '$3,931.45',
    roi: '136.5%',
    tone: '#0d766e',
  },
  {
    name: 'Barcode Scanner',
    initials: 'BS',
    account: 'HyperLumen',
    revenue: '$5,493.70',
    spend: '$2,214.20',
    profit: '$3,279.50',
    roi: '148.1%',
    tone: '#bd5b29',
  },
  {
    name: 'Prayer Times',
    initials: 'PT',
    account: 'XentroLabs',
    revenue: '$4,920.18',
    spend: '$2,341.08',
    profit: '$2,579.10',
    roi: '110.2%',
    tone: '#2473a6',
  },
  {
    name: 'Flash Light',
    initials: 'FL',
    account: 'WingTech',
    revenue: '$1,320.30',
    spend: '$1,788.92',
    profit: '−$468.62',
    roi: '−26.2%',
    tone: '#8b5e34',
    loss: true,
  },
]

export function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-[-0.035em]">
              Portfolio overview
            </h1>
            <span className="pill bg-[var(--success-soft)] text-[var(--success)]">
              <Check size={11} /> All systems healthy
            </span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Revenue, acquisition, and profitability across WyndGo Studio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex h-9 items-center gap-2 rounded-lg border bg-[var(--panel)] px-3 text-xs font-medium">
            <CalendarDays size={15} />
            Jul 1 – Jul 27, 2026
            <ChevronDown size={13} className="text-[var(--muted)]" />
          </button>
          <button
            className="grid size-9 place-items-center rounded-lg border bg-[var(--panel)]"
            aria-label="Filter overview"
          >
            <Filter size={15} />
          </button>
          <button className="flex h-9 items-center gap-2 rounded-lg bg-[var(--foreground)] px-3 text-xs font-medium text-[var(--panel)]">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total revenue"
          value="$48,284.70"
          change="12.8%"
          note="AdMob + in-app net + other revenue"
        />
        <KpiCard
          label="Google Ads spend"
          value="$19,642.18"
          change="7.2%"
          positive={false}
        />
        <KpiCard
          label="Operating profit"
          value="$25,381.44"
          change="16.4%"
          note="Revenue minus ad spend and operating expenses"
        />
        <KpiCard
          label="ROAS"
          value="2.46×"
          change="0.12×"
          note="Total revenue divided by Google Ads spend"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)]">
        <section className="panel min-w-0 p-4 md:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Revenue and ad spend</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Daily totals · USD · preliminary values included
              </p>
            </div>
            <div className="flex gap-4 text-[11px] text-[var(--muted)]">
              <span className="flex items-center gap-1.5">
                <i className="size-2 rounded-full bg-[#5b5ce2]" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <i className="size-2 rounded-full bg-[#e39742]" />
                Spend
              </span>
            </div>
          </div>
          <div className="mt-3">
            <PerformanceChart />
          </div>
        </section>
        <section className="panel p-4 md:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Revenue mix</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">By source</p>
            </div>
            <button aria-label="More options">
              <Ellipsis size={17} className="text-[var(--muted)]" />
            </button>
          </div>
          <div className="mt-7 flex items-center justify-center">
            <div
              className="relative grid size-36 place-items-center rounded-full"
              style={{
                background:
                  'conic-gradient(#5b5ce2 0 58%, #43a681 58% 89%, #d4a44c 89% 100%)',
              }}
            >
              <div className="grid size-24 place-items-center rounded-full bg-[var(--panel)] text-center">
                <div>
                  <p className="tabular text-lg font-semibold">$48.3k</p>
                  <p className="text-[10px] text-[var(--muted)]">total</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3 text-xs">
            <MixRow color="#5b5ce2" label="AdMob" value="$28,002.16" share="58%" />
            <MixRow color="#43a681" label="In-app net" value="$15,011.42" share="31%" />
            <MixRow color="#d4a44c" label="Other" value="$5,271.12" share="11%" />
          </div>
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)]">
        <section className="panel min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b px-4 py-4 md:px-5">
            <div>
              <h2 className="text-sm font-semibold">App profitability</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Top apps ranked by operating profit
              </p>
            </div>
            <Link
              href="/app/apps"
              className="flex items-center gap-1 text-xs font-medium text-[var(--accent)]"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-xs">
              <thead className="bg-[var(--panel-subtle)] text-[10px] uppercase tracking-[0.06em] text-[var(--muted)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">App</th>
                  <th className="px-3 py-3 font-semibold">Revenue</th>
                  <th className="px-3 py-3 font-semibold">Ad spend</th>
                  <th className="px-3 py-3 font-semibold">Profit</th>
                  <th className="px-3 py-3 font-semibold">ROI</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr
                    key={app.name}
                    className="border-t first:border-0 hover:bg-[var(--panel-subtle)]"
                  >
                    <td className="px-5 py-3">
                      <Link href="/app/apps/demo" className="flex items-center gap-3">
                        <span
                          className="grid size-8 place-items-center rounded-[9px] text-[10px] font-bold text-white"
                          style={{ background: app.tone }}
                        >
                          {app.initials}
                        </span>
                        <span>
                          <b className="block font-medium">{app.name}</b>
                          <small className="mt-0.5 block text-[10px] text-[var(--muted)]">
                            {app.account}
                          </small>
                        </span>
                      </Link>
                    </td>
                    <td className="tabular px-3 py-3 font-medium">{app.revenue}</td>
                    <td className="tabular px-3 py-3 text-[var(--muted)]">{app.spend}</td>
                    <td
                      className={`tabular px-3 py-3 font-semibold ${app.loss ? 'text-[var(--danger)]' : 'text-[var(--success)]'}`}
                    >
                      {app.profit}
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`pill ${app.loss ? 'bg-[var(--danger-soft)] text-[var(--danger)]' : 'bg-[var(--success-soft)] text-[var(--success)]'}`}
                      >
                        {app.roi}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Ellipsis size={15} className="text-[var(--muted)]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel p-4 md:p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold">Data freshness</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">Across connected sources</p>
            </div>
            <RefreshCw size={15} className="text-[var(--muted)]" />
          </div>
          <div className="mt-5 space-y-4">
            <Freshness name="Google Ads" detail="Through Jul 26" status="Live" />
            <Freshness
              name="AdMob"
              detail="Through Jul 26"
              status="Preliminary"
              preliminary
            />
            <Freshness
              name="Google Play"
              detail="Through Jul 24"
              status="Delayed 2d"
              warning
            />
          </div>
          <div className="mt-5 flex gap-2 rounded-xl bg-[var(--warning-soft)] p-3 text-[11px] leading-5 text-[var(--warning)]">
            <CircleAlert size={15} className="mt-0.5 shrink-0" />
            Play financial exports usually arrive 2–3 days after the source date.
          </div>
          <Link
            href="/app/sync-health"
            className="mt-4 flex items-center justify-center gap-1 text-xs font-medium text-[var(--accent)]"
          >
            Open sync health <ArrowRight size={13} />
          </Link>
        </section>
      </div>
    </div>
  )
}

function MixRow({
  color,
  label,
  value,
  share,
}: {
  color: string
  label: string
  value: string
  share: string
}) {
  return (
    <div className="flex items-center">
      <i className="mr-2 size-2 rounded-full" style={{ background: color }} />
      <span className="flex-1 text-[var(--muted)]">{label}</span>
      <span className="tabular mr-3 font-medium">{value}</span>
      <span className="tabular w-7 text-right text-[var(--muted)]">{share}</span>
    </div>
  )
}

function Freshness({
  name,
  detail,
  status,
  preliminary,
  warning,
}: {
  name: string
  detail: string
  status: string
  preliminary?: boolean
  warning?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`grid size-8 place-items-center rounded-lg ${warning ? 'bg-[var(--warning-soft)] text-[var(--warning)]' : preliminary ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'bg-[var(--success-soft)] text-[var(--success)]'}`}
      >
        <RefreshCw size={14} />
      </span>
      <span className="min-w-0 flex-1">
        <b className="block text-xs font-medium">{name}</b>
        <small className="text-[10px] text-[var(--muted)]">{detail}</small>
      </span>
      <span
        className={`pill ${warning ? 'bg-[var(--warning-soft)] text-[var(--warning)]' : preliminary ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'bg-[var(--success-soft)] text-[var(--success)]'}`}
      >
        {status}
      </span>
    </div>
  )
}
