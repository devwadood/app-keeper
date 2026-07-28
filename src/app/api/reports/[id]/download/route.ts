import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { requireTenantFromRequest } from '@/lib/auth/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const tenant = await requireTenantFromRequest(request)
  const { id } = await params
  const payload = await getPayload({ config })
  const report = await payload.findByID({
    collection: 'report-exports',
    id,
    overrideAccess: true,
  })
  const organization =
    typeof report.organization === 'object' ? report.organization.id : report.organization
  if (organization !== tenant.organizationId)
    return NextResponse.json({ ok: false }, { status: 404 })
  if (report.expiresAt && new Date(report.expiresAt) < new Date()) {
    return NextResponse.json({ ok: false, error: { code: 'EXPIRED' } }, { status: 410 })
  }
  const pathname = (report.payload as { downloadUrl?: string } | null)?.downloadUrl
  if (!pathname || !pathname.startsWith('https://'))
    return NextResponse.json({ ok: false, error: { code: 'NOT_READY' } }, { status: 409 })
  return NextResponse.redirect(pathname)
}
