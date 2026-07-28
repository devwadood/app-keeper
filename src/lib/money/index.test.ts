import { describe, expect, it } from 'vitest'
import { calculateFinancials, groupMoneyByCurrency, microsToDecimal } from './index'

describe('financial engine', () => {
  it('calculates profit, ROAS, ROI and margin with decimal arithmetic', () => {
    expect(
      calculateFinancials({
        admobRevenue: '100.10',
        inAppNetRevenue: '50.20',
        googleAdsSpend: '50.10',
        directManualExpenses: '10',
        allocatedSharedExpenses: '5',
      }),
    ).toEqual({
      totalRevenue: '150.300000',
      marketingProfit: '100.200000',
      operatingProfit: '85.200000',
      roas: '3.000000',
      roi: '2.000000',
      grossMargin: '0.566866',
      profitStatus: 'profit',
    })
  })

  it('returns null for zero denominators', () => {
    const result = calculateFinancials({
      admobRevenue: '0',
      inAppNetRevenue: '0',
      googleAdsSpend: '0',
    })
    expect(result.roas).toBeNull()
    expect(result.roi).toBeNull()
    expect(result.grossMargin).toBeNull()
    expect(result.profitStatus).toBe('break-even')
  })

  it('never combines currencies implicitly', () => {
    expect(
      groupMoneyByCurrency([
        { amount: '1.20', currency: 'USD' },
        { amount: '2', currency: 'EUR' },
        { amount: '3.30', currency: 'USD' },
      ]),
    ).toEqual([
      { amount: '4.500000', currency: 'USD' },
      { amount: '2.000000', currency: 'EUR' },
    ])
  })

  it('preserves google micros exactly', () => {
    expect(microsToDecimal(12_345_678n)).toBe('12.345678')
  })
})
