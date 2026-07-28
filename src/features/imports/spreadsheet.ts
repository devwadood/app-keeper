import { createHash } from 'node:crypto'
import * as XLSX from 'xlsx'
import { z } from 'zod'

const aliases = {
  application: ['application', 'app', 'application name'],
  account: ['account', 'developer', 'developer account'],
  campaign: ['campaign', 'compaign', 'campaign spend', 'compaign spend'],
  admob: ['admob', 'admob revenue'],
  inApp: ['inapp', 'in app', 'in-app', 'inapp revenue'],
  revenue: ['revenue', 'combined revenue'],
} as const

const normalizedHeader = (value: unknown) =>
  String(value ?? '')
    .trim()
    .toLowerCase()
const safeNumber = z.coerce.number().finite()

export interface ImportRow {
  sheet: string
  row: number
  application: string
  account: string
  campaignSpend: string
  admobRevenue: string
  inAppRevenue: string
  sourceHash: string
}

export interface ImportPreview {
  rows: ImportRow[]
  warnings: string[]
  errors: string[]
}

export function parseWorkbook(data: Buffer): ImportPreview {
  const workbook = XLSX.read(data, {
    type: 'buffer',
    cellFormula: false,
    cellHTML: false,
  })
  const rows: ImportRow[] = []
  const warnings: string[] = []
  const errors: string[] = []
  const monthSeen = new Set<string>()

  for (const sheetName of workbook.SheetNames) {
    if (/annual|year|summary/i.test(sheetName)) continue
    const sheet = workbook.Sheets[sheetName]
    const records = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, raw: true })
    if (!records.length) continue
    const headers = records[0].map(normalizedHeader)
    const index = Object.fromEntries(
      Object.entries(aliases).map(([key, names]) => [
        key,
        headers.findIndex((header) => names.includes(header as never)),
      ]),
    )
    if (index.application < 0 || index.account < 0) {
      warnings.push(`${sheetName}: skipped because app/account columns were not found`)
      continue
    }
    if (monthSeen.has(sheetName.toLowerCase()))
      warnings.push(`${sheetName}: duplicate month`)
    monthSeen.add(sheetName.toLowerCase())

    records.slice(1).forEach((record, rowIndex) => {
      if (!Array.isArray(record)) return
      const application = String(record[index.application] ?? '').trim()
      const account = String(record[index.account] ?? '').trim()
      if (!application && !account) return
      const readMoney = (column: number) => {
        if (column < 0 || record[column] === '' || record[column] == null)
          return '0.000000'
        const parsed = safeNumber.safeParse(record[column])
        if (!parsed.success)
          throw new Error(`invalid numeric value "${String(record[column])}"`)
        return parsed.data.toFixed(6)
      }
      try {
        const source = `${sheetName}:${rowIndex + 2}:${application}:${account}`
        rows.push({
          sheet: sheetName,
          row: rowIndex + 2,
          application,
          account,
          campaignSpend: readMoney(index.campaign),
          admobRevenue: readMoney(index.admob),
          inAppRevenue: readMoney(index.inApp),
          sourceHash: createHash('sha256').update(source).digest('hex'),
        })
      } catch (error) {
        errors.push(`${sheetName}:${rowIndex + 2}: ${(error as Error).message}`)
      }
    })
  }
  return { rows, warnings, errors }
}

export function neutralizeSpreadsheetFormula(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
}
