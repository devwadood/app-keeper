import type {
  AdMobAccount,
  AdMobDailyMetric,
  GoogleAdsAccount,
  GoogleAdsDailyMetric,
  PlayApp,
  ReadOnlyGoogleAdapter,
} from './types'

export interface GoogleTransport {
  get<T>(url: string, headers?: Record<string, string>): Promise<T>
  post<T>(url: string, body: unknown, headers?: Record<string, string>): Promise<T>
}

/**
 * Reporting-only adapter. Intentionally exposes no generic request or mutation method.
 * Product APIs are kept as explicit allowlisted read calls.
 */
export class LiveGoogleAdapter implements ReadOnlyGoogleAdapter {
  readonly mode = 'live'

  constructor(
    private readonly transport: GoogleTransport,
    private readonly accessToken: string,
    private readonly adsDeveloperToken: string,
    private readonly adsVersion: string,
  ) {}

  async discoverAdsAccounts(): Promise<GoogleAdsAccount[]> {
    const result = await this.transport.get<{ resourceNames?: string[] }>(
      `https://googleads.googleapis.com/${this.adsVersion}/customers:listAccessibleCustomers`,
      this.adsHeaders(),
    )
    return (result.resourceNames ?? []).map((resourceName) => ({
      customerId: resourceName.replace('customers/', ''),
      name: resourceName,
      currency: 'UNKNOWN',
      timezone: 'UNKNOWN',
      manager: false,
    }))
  }

  async fetchAdsMetrics(
    customerId: string,
    date: string,
  ): Promise<GoogleAdsDailyMetric[]> {
    const query = `SELECT campaign.id, campaign.name, campaign.app_campaign_setting.app_id, segments.date, metrics.cost_micros, metrics.impressions, metrics.clicks, metrics.conversions FROM campaign WHERE segments.date = '${date}' AND campaign.status != 'REMOVED'`
    const response = await this.transport.post<{ results?: unknown[] }>(
      `https://googleads.googleapis.com/${this.adsVersion}/customers/${customerId}/googleAds:search`,
      { query },
      this.adsHeaders(),
    )
    return normalizeAdsRows(customerId, response.results ?? [])
  }

  async discoverAdMobAccounts(): Promise<AdMobAccount[]> {
    const response = await this.transport.get<{
      account?: Array<Record<string, unknown>>
    }>('https://admob.googleapis.com/v1/accounts', this.authHeaders())
    return (response.account ?? []).map((account) => ({
      publisherId: String(account.publisherId ?? ''),
      name: String(account.name ?? account.publisherId ?? ''),
      currency: String(account.currencyCode ?? 'UNKNOWN'),
      timezone: String(account.reportingTimeZone ?? 'UNKNOWN'),
    }))
  }

  async fetchAdMobMetrics(
    publisherId: string,
    date: string,
  ): Promise<AdMobDailyMetric[]> {
    await this.transport.post(
      `https://admob.googleapis.com/v1/accounts/${publisherId}/networkReport:generate`,
      { reportSpec: { dateRange: isoDateRange(date), dimensions: ['DATE', 'APP'] } },
      this.authHeaders(),
    )
    return []
  }

  async discoverPlayApps(): Promise<PlayApp[]> {
    const result = await this.transport.get<{ apps?: Array<{ packageName: string }> }>(
      'https://playdeveloperreporting.googleapis.com/v1beta1/apps',
      this.authHeaders(),
    )
    return (result.apps ?? []).map(({ packageName }) => ({
      packageName,
      displayName: packageName,
    }))
  }

  private authHeaders() {
    return { Authorization: `Bearer ${this.accessToken}` }
  }

  private adsHeaders() {
    return { ...this.authHeaders(), 'developer-token': this.adsDeveloperToken }
  }
}

function normalizeAdsRows(customerId: string, rows: unknown[]): GoogleAdsDailyMetric[] {
  return rows.flatMap((row) => {
    if (!row || typeof row !== 'object') return []
    const data = row as Record<string, Record<string, unknown>>
    return [
      {
        customerId,
        campaignId: String(data.campaign?.id ?? ''),
        campaignName: String(data.campaign?.name ?? ''),
        appId: data.campaign?.appCampaignSetting
          ? String(
              (data.campaign.appCampaignSetting as Record<string, unknown>).appId ?? '',
            )
          : undefined,
        date: String(data.segments?.date ?? ''),
        costMicros: String(data.metrics?.costMicros ?? '0'),
        impressions: Number(data.metrics?.impressions ?? 0),
        clicks: Number(data.metrics?.clicks ?? 0),
        conversions: String(data.metrics?.conversions ?? '0'),
      },
    ]
  })
}

function isoDateRange(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return { startDate: { year, month, day }, endDate: { year, month, day } }
}
