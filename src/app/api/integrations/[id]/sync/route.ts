import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { requireTenantFromRequest } from '@/lib/auth/server'
import { getJobDispatcher } from '@/features/sync/dispatcher'
import { idempotencyKey } from '@/lib/security/idempotency'
import { enforceSameOrigin, rateLimit } from '@/lib/security/http'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  enforceSameOrigin(request)
  rateLimit(request, 'manual-sync', 5, 60_000)
  const tenant = await requireTenantFromRequest(request)
  const { id } = await params
  const input = {
    integrationId: id,
    requestedBy: tenant.userId,
    requestedAt: new Date().toISOString(),
  }
  const receipt = await getJobDispatcher().publish('integration.discover', input, {
    organizationId: tenant.organizationId,
    idempotencyKey: idempotencyKey('integration.discover', {
      id,
      minute: input.requestedAt.slice(0, 16),
    }),
    correlationId: randomUUID(),
  })
  return NextResponse.json({ ok: true, receipt }, { status: 202 })
}
