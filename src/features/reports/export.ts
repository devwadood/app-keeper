import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import * as XLSX from 'xlsx'
import { neutralizeSpreadsheetFormula } from '@/features/imports/spreadsheet'

export interface ReportRow {
  app: string
  account: string
  revenue: string
  spend: string
  profit: string
  currency: string
}

const headers: Array<keyof ReportRow> = [
  'app',
  'account',
  'revenue',
  'spend',
  'profit',
  'currency',
]

export function toCSV(rows: ReportRow[]) {
  return [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((key) => `"${neutralizeSpreadsheetFormula(row[key]).replaceAll('"', '""')}"`)
        .join(','),
    ),
  ].join('\n')
}

export function toXLSX(rows: ReportRow[], parameters: Record<string, string>) {
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'App detail')
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet(
      Object.entries(parameters).map(([parameter, value]) => ({ parameter, value })),
    ),
    'Parameters',
  )
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Overview')
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet([]), 'Account summary')
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.json_to_sheet([]),
    'Source reconciliation',
  )
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }) as Buffer
}

export async function toPDF(rows: ReportRow[]) {
  const document = await PDFDocument.create()
  const page = document.addPage([612, 792])
  const font = await document.embedFont(StandardFonts.Helvetica)
  page.drawText('AppLedger · App Profitability', {
    x: 48,
    y: 742,
    size: 20,
    font,
    color: rgb(0.08, 0.1, 0.15),
  })
  rows.slice(0, 24).forEach((row, index) => {
    page.drawText(`${row.app}  ${row.currency} ${row.profit}`, {
      x: 48,
      y: 705 - index * 24,
      size: 10,
      font,
    })
  })
  return Buffer.from(await document.save())
}
