import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { getJobDispatcher } from '@/features/sync/dispatcher'
import { idempotencyKey } from '@/lib/security/idempotency'
import { env } from '@/lib/env/server'

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('authorization')
  if (authorization !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json(
      { ok: false, error: { code: 'UNAUTHORIZED' } },
      { status: 401 },
    )
  }
  const schedule = request.nextUrl.searchParams.get('schedule') ?? 'daily'
  const payload = await getPayload({ config })
  const organizations = await payload.find({
    collection: 'organizations',
    limit: 500,
    overrideAccess: true,
  })
  const dispatcher = getJobDispatcher()
  const period = new Date().toISOString().slice(0, schedule === 'health' ? 13 : 10)
  const receipts = await Promise.all(
    organizations.docs.map((organization) => {
      const topic =
        schedule === 'weekly'
          ? ('email.weekly-summary' as const)
          : ('integration.discover' as const)
      const body = { organizationId: organization.id, schedule, period }
      return dispatcher.publish(topic, body, {
        organizationId: String(organization.id),
        idempotencyKey: idempotencyKey(topic, body),
      })
    }),
  )
  return NextResponse.json({ ok: true, dispatched: receipts.length, schedule })
}

export const POST = GET
