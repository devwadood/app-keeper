import Decimal from 'decimal.js'

Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_EVEN })

export type CurrencyAmount = Readonly<{ amount: string; currency: string }>
export type ProfitStatus = 'profit' | 'loss' | 'break-even'

export interface FinancialInputs {
  admobRevenue: string
  inAppGrossSales?: string
  inAppRefunds?: string
  googleFees?: string
  taxesOrAdjustments?: string
  inAppNetRevenue: string
  otherAppRevenue?: string
  googleAdsSpend: string
  directManualExpenses?: string
  allocatedSharedExpenses?: string
}

export interface FinancialResult {
  totalRevenue: string
  marketingProfit: string
  operatingProfit: string
  roas: string | null
  roi: string | null
  grossMargin: string | null
  profitStatus: ProfitStatus
}

const d = (value: string | number | undefined) => new Decimal(value ?? 0)
const normalized = (value: Decimal) => value.toDecimalPlaces(6).toFixed(6)
const ratio = (numerator: Decimal, denominator: Decimal) =>
  denominator.isZero() ? null : normalized(numerator.div(denominator))

export function calculateFinancials(
  input: FinancialInputs,
  breakEvenTolerance = '0.005',
): FinancialResult {
  const totalRevenue = d(input.admobRevenue)
    .plus(input.inAppNetRevenue)
    .plus(d(input.otherAppRevenue))
  const marketingProfit = totalRevenue.minus(input.googleAdsSpend)
  const operatingProfit = marketingProfit
    .minus(d(input.directManualExpenses))
    .minus(d(input.allocatedSharedExpenses))
  const tolerance = d(breakEvenTolerance).abs()
  const profitStatus: ProfitStatus = operatingProfit.abs().lte(tolerance)
    ? 'break-even'
    : operatingProfit.isPositive()
      ? 'profit'
      : 'loss'

  return {
    totalRevenue: normalized(totalRevenue),
    marketingProfit: normalized(marketingProfit),
    operatingProfit: normalized(operatingProfit),
    roas: ratio(totalRevenue, d(input.googleAdsSpend)),
    roi: ratio(marketingProfit, d(input.googleAdsSpend)),
    grossMargin: ratio(operatingProfit, totalRevenue),
    profitStatus,
  }
}

export function groupMoneyByCurrency(values: CurrencyAmount[]) {
  const grouped = new Map<string, Decimal>()
  for (const value of values) {
    grouped.set(value.currency, (grouped.get(value.currency) ?? d(0)).plus(value.amount))
  }
  return [...grouped.entries()].map(([currency, amount]) => ({
    currency,
    amount: normalized(amount),
  }))
}

export function microsToDecimal(micros: bigint | string): string {
  return normalized(d(micros.toString()).div(1_000_000))
}
