import { NextRequest, NextResponse } from 'next/server'
import { requireTenantFromRequest } from '@/lib/auth/server'
import { errorEnvelope } from '@/lib/errors'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireTenantFromRequest(request)
    const { id } = await params
    return NextResponse.json({
      ok: true,
      integrationId: id,
      state: 'configured',
      secretsExposed: false,
    })
  } catch (error) {
    return NextResponse.json(errorEnvelope(error), { status: 401 })
  }
}
