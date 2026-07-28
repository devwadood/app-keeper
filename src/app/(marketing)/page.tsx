import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CircleDollarSign,
  DatabaseZap,
  LockKeyhole,
  Sparkles,
} from 'lucide-react'
import { Logo } from '@/components/ui/logo'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#18181b]">
      <nav className="mx-auto flex h-18 max-w-7xl items-center px-5 lg:px-8">
        <Logo />
        <div className="mx-auto hidden items-center gap-7 text-sm text-zinc-600 md:flex">
          <Link href="/features">Product</Link>
          <Link href="/security">Security</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/docs">Docs</Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/login" className="px-3 py-2 text-sm font-medium">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white shadow-sm"
          >
            Start free
          </Link>
        </div>
      </nav>
      <main>
        <section className="relative overflow-hidden border-y border-zinc-200 bg-white px-5 py-24 text-center lg:py-32">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(#d4d4d8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage: 'linear-gradient(to bottom, black, transparent 75%)',
            }}
          />
          <div className="relative mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700">
              <Sparkles size={13} /> Built for Android app portfolios
            </span>
            <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-balance sm:text-7xl">
              Know what every app
              <span className="block text-indigo-600">actually earns.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-600">
              Connect Google Play, Ads, and AdMob. AppLedger turns fragmented source data
              into one precise view of revenue, spend, and profit.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10"
              >
                Build your ledger <ArrowRight size={16} />
              </Link>
              <Link
                href="/app/overview"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 text-sm font-semibold"
              >
                Explore demo workspace
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                No card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                Read-only integrations
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-600" />
                90-day demo data
              </span>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[.15em] text-indigo-600">
              One financial truth
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em]">
              From source data to confident decisions.
            </h2>
            <p className="mt-4 leading-7 text-zinc-600">
              Every number retains its source, currency, freshness, mapping state, and
              calculation basis.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Feature
              icon={DatabaseZap}
              title="Source-aware sync"
              body="Idempotent daily imports with preliminary and finalized values kept distinct."
            />
            <Feature
              icon={BarChart3}
              title="App profitability"
              body="Revenue, ad spend, operating costs, ROAS, ROI, and margin—without spreadsheet drift."
            />
            <Feature
              icon={CircleDollarSign}
              title="Expense allocation"
              body="Direct, equal, fixed, revenue-weighted, or spend-weighted operating expenses."
            />
            <Feature
              icon={LockKeyhole}
              title="Tenant isolation"
              body="Organization-scoped access, encrypted tokens, audit history, and authorized exports."
            />
          </div>
        </section>
        <section className="border-y border-zinc-200 bg-zinc-950 px-5 py-16 text-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-.04em]">
                Replace the reporting spreadsheet.
              </h2>
              <p className="mt-2 text-zinc-400">
                Keep its business meaning. Lose its fragile formulas.
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-zinc-950"
            >
              Get started <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center lg:px-8">
        <Logo />
        <span className="sm:ml-auto">© 2026 AppLedger</span>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </footer>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof BadgeCheck
  title: string
  body: string
}) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6">
      <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={19} />
      </span>
      <h3 className="mt-5 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{body}</p>
    </article>
  )
}
