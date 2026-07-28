'use client'

import Link from 'next/link'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from '@/components/ui/logo'

export function AuthCard({ mode }: { mode: 'login' | 'signup' }) {
  const signup = mode === 'signup'
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      if (signup) {
        const created = await fetch('/api/users', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!created.ok)
          throw new Error('Could not create the account. Check the fields and try again.')
      }
      const loggedIn = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })
      if (!loggedIn.ok)
        throw new Error(
          signup
            ? 'Check your email to verify your account before signing in.'
            : 'The email or password is incorrect.',
        )
      router.push(signup ? '/app/onboarding' : '/app/overview')
      router.refresh()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'The request failed.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="grid min-h-screen bg-white text-zinc-900 lg:grid-cols-[1fr_1fr]">
      <section className="flex min-h-screen flex-col px-6 py-6 sm:px-10">
        <Link href="/">
          <Logo />
        </Link>
        <div className="mx-auto my-auto w-full max-w-[390px] py-12">
          <h1 className="text-3xl font-semibold tracking-[-.04em]">
            {signup ? 'Create your workspace' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {signup
              ? 'Start with a secure, read-only reporting workspace.'
              : 'Sign in to your AppLedger workspace.'}
          </p>
          <form className="mt-8 space-y-4" onSubmit={submit}>
            {signup && (
              <Field label="Full name" name="name" type="text" placeholder="Adeel Khan" />
            )}
            <Field
              label="Email address"
              name="email"
              type="email"
              placeholder="you@company.com"
            />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="At least 12 characters"
            />
            {error && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
                {error}
              </p>
            )}
            <button
              disabled={loading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Please wait…' : signup ? 'Create account' : 'Sign in'}{' '}
              <ArrowRight size={15} />
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-zinc-500">
            {signup ? 'Already have an account?' : 'New to AppLedger?'}{' '}
            <Link
              className="font-medium text-indigo-600"
              href={signup ? '/login' : '/signup'}
            >
              {signup ? 'Sign in' : 'Create account'}
            </Link>
          </p>
          <p className="mt-8 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
            <LockKeyhole size={12} />
            Secure HttpOnly session · login throttling enabled
          </p>
        </div>
      </section>
      <aside className="relative hidden overflow-hidden bg-zinc-950 p-12 text-white lg:flex lg:flex-col lg:justify-end">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#818cf8 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative max-w-lg">
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-indigo-400">
            One source of truth
          </p>
          <blockquote className="mt-5 text-3xl font-medium leading-[1.3] tracking-[-.035em]">
            “We can finally see which apps create durable profit—not just topline
            revenue.”
          </blockquote>
          <p className="mt-6 text-sm text-zinc-400">
            Portfolio finance, acquisition, and operations in one ledger.
          </p>
        </div>
      </aside>
    </main>
  )
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string
  name: string
  type: string
  placeholder: string
}) {
  return (
    <label className="block text-xs font-medium">
      <span className="mb-2 block">{label}</span>
      <input
        className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-3 focus:ring-indigo-100"
        name={name}
        type={type}
        placeholder={placeholder}
        required
      />
    </label>
  )
}
