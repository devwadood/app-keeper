import { expect, test } from '@playwright/test'

test('marketing and demo analytics remain usable', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Know what every app/i })).toBeVisible()
  await page.getByRole('link', { name: /Explore demo workspace/i }).click()
  await expect(page.getByRole('heading', { name: 'Portfolio overview' })).toBeVisible()
  await expect(page.getByText('App profitability')).toBeVisible()
})

test('mobile overview exposes core KPIs', async ({ page }) => {
  await page.goto('/app/overview')
  await expect(page.getByText('Operating profit', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('Data freshness')).toBeVisible()
})
