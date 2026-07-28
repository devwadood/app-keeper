export interface GoogleIdentity {
  subject: string
  email: string
  displayName?: string
}

export interface GoogleAdsAccount {
  customerId: string
  name: string
  currency: string
  timezone: string
  manager: boolean
}

export interface GoogleAdsDailyMetric {
  customerId: string
  campaignId: string
  campaignName: string
  appId?: string
  date: string
  costMicros: string
  impressions: number
  clicks: number
  conversions: string
}

export interface AdMobAccount {
  publisherId: string
  name: string
  currency: string
  timezone: string
}

export interface AdMobDailyMetric {
  publisherId: string
  appId: string
  date: string
  earningsMicros: string
  requests: number
  impressions: number
  clicks: number
}

export interface PlayApp {
  packageName: string
  displayName: string
}

export interface ReadOnlyGoogleAdapter {
  readonly mode: 'live' | 'mock'
  discoverAdsAccounts(): Promise<GoogleAdsAccount[]>
  fetchAdsMetrics(customerId: string, date: string): Promise<GoogleAdsDailyMetric[]>
  discoverAdMobAccounts(): Promise<AdMobAccount[]>
  fetchAdMobMetrics(publisherId: string, date: string): Promise<AdMobDailyMetric[]>
  discoverPlayApps(): Promise<PlayApp[]>
}
