import Link from 'next/link'
import { ArrowLeft, BadgeCheck, BookOpen, LockKeyhole, Scale } from 'lucide-react'
import { Logo } from '@/components/ui/logo'
import { notFound } from 'next/navigation'

const pages = {
  features: {
    title: 'Profitability intelligence for every Android app.',
    body: 'Connect source accounts, reconcile app identities, allocate operating expenses, and generate audit-ready app and organization reports.',
    icon: BadgeCheck,
  },
  security: {
    title: 'Your financial data stays isolated and explainable.',
    body: 'AppLedger uses organization-scoped authorization, authenticated encryption for OAuth tokens, read-only Google reporting methods, secure cookies, and private export delivery.',
    icon: LockKeyhole,
  },
  pricing: {
    title: 'Pricing that grows with your portfolio.',
    body: 'Plans are being finalized. The checkout is intentionally not enabled until billing policy and service limits complete legal review.',
    icon: Scale,
  },
  docs: {
    title: 'Set up AppLedger with confidence.',
    body: 'The repository includes administrator and customer onboarding guides for Neon, Google OAuth, Play reports, Google Ads, AdMob, Resend, Blob, jobs, and Vercel.',
    icon: BookOpen,
  },
  privacy: {
    title: 'Privacy policy placeholder',
    body: 'This document must be reviewed and completed by qualified legal counsel before public production launch.',
    icon: LockKeyhole,
  },
  terms: {
    title: 'Terms of service placeholder',
    body: 'This document must be reviewed and completed by qualified legal counsel before public production launch.',
    icon: Scale,
  },
} as const

export default async function MarketingContent({
  params,
}: {
  params: Promise<{ page: string }>
}) {
  const { page } = await params
  const content = pages[page as keyof typeof pages]
  if (!content) notFound()
  const Icon = content.icon
  return (
    <main className="min-h-screen bg-white px-5 text-zinc-900">
      <nav className="mx-auto flex h-18 max-w-6xl items-center">
        <Logo />
        <Link
          href="/"
          className="ml-auto flex items-center gap-1.5 text-sm text-zinc-600"
        >
          <ArrowLeft size={14} />
          Back home
        </Link>
      </nav>
      <section className="mx-auto max-w-4xl py-24 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon size={22} />
        </span>
        <h1 className="mt-7 text-4xl font-semibold tracking-[-.045em] sm:text-6xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
          {content.body}
        </p>
        <div className="mt-12 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-left">
          <h2 className="text-lg font-semibold">Built into the product</h2>
          <ul className="mt-5 grid gap-4 text-sm text-zinc-600 sm:grid-cols-2">
            {[
              'Strict multi-tenant access',
              'Freshness on every dataset',
              'Encrypted Google credentials',
              'Auditable financial definitions',
              'Private source files and exports',
              'Mock adapters for local development',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <BadgeCheck size={16} className="text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
