import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { requireTenantFromRequest } from '@/lib/auth/server'
import { errorEnvelope } from '@/lib/errors'
import { enforceSameOrigin } from '@/lib/security/http'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    enforceSameOrigin(request)
    const tenant = await requireTenantFromRequest(request)
    const { id } = await params
    const payload = await getPayload({ config })
    const connection = await payload.findByID({
      collection: 'google-connections',
      id,
      overrideAccess: true,
    })
    const organization =
      typeof connection.organization === 'object'
        ? connection.organization.id
        : connection.organization
    if (organization !== tenant.organizationId)
      return NextResponse.json({ ok: false }, { status: 404 })
    await payload.update({
      collection: 'google-connections',
      id,
      data: {
        status: 'inactive',
        encryptedRefreshToken: null,
        archivedAt: new Date().toISOString(),
      },
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, historicalDataPreserved: true })
  } catch (error) {
    return NextResponse.json(errorEnvelope(error), { status: 400 })
  }
}
