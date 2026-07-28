import type { NextRequest } from 'next/server'
import { AppError } from '@/lib/errors'
import { env } from '@/lib/env/server'

const buckets = new Map<string, { count: number; resetAt: number }>()

export function enforceSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).origin !== new URL(env.APP_URL).origin) {
    throw new AppError('INVALID_ORIGIN', 'Request origin is not allowed.', 403)
  }
}

export function rateLimit(
  request: NextRequest,
  scope: string,
  limit: number,
  windowMs: number,
) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const key = `${scope}:${forwarded ?? 'local'}`
  const now = Date.now()
  const current = buckets.get(key)
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return
  }
  if (current.count >= limit) throw new AppError('RATE_LIMITED', 'Try again later.', 429)
  current.count += 1
}
