import { NextRequest, NextResponse } from 'next/server'
import { requireTenantFromRequest } from '@/lib/auth/server'
import { toCSV } from '@/features/reports/export'
import { rateLimit } from '@/lib/security/http'

export async function GET(request: NextRequest) {
  rateLimit(request, 'export-apps', 10, 60_000)
  await requireTenantFromRequest(request)
  const csv = toCSV([
    {
      app: 'Naat Ringtones',
      account: 'WalrusTech',
      revenue: '8420.64',
      spend: '3126.10',
      profit: '5294.54',
      currency: 'USD',
    },
  ])
  return new NextResponse(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="appledger-apps.csv"',
      'cache-control': 'private, no-store',
    },
  })
}
