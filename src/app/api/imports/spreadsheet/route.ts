import { NextRequest, NextResponse } from 'next/server'
import { parseWorkbook } from '@/features/imports/spreadsheet'
import { requireTenantFromRequest } from '@/lib/auth/server'
import { enforceSameOrigin, rateLimit } from '@/lib/security/http'

const maxBytes = 10 * 1024 * 1024

export async function POST(request: NextRequest) {
  enforceSameOrigin(request)
  rateLimit(request, 'spreadsheet-import', 3, 60_000)
  await requireTenantFromRequest(request)
  const data = await request.formData()
  const file = data.get('file')
  if (!(file instanceof File) || !file.name.toLowerCase().endsWith('.xlsx')) {
    return NextResponse.json(
      { ok: false, error: { code: 'INVALID_FILE', message: 'Choose an XLSX workbook.' } },
      { status: 400 },
    )
  }
  if (file.size > maxBytes) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'FILE_TOO_LARGE', message: 'Workbook limit is 10 MB.' },
      },
      { status: 413 },
    )
  }
  const preview = parseWorkbook(Buffer.from(await file.arrayBuffer()))
  return NextResponse.json({ ok: true, preview, committed: false })
}
