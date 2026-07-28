import type {
  AdMobAccount,
  AdMobDailyMetric,
  GoogleAdsAccount,
  GoogleAdsDailyMetric,
  PlayApp,
  ReadOnlyGoogleAdapter,
} from './types'

export class MockGoogleAdapter implements ReadOnlyGoogleAdapter {
  readonly mode = 'mock'

  async discoverAdsAccounts(): Promise<GoogleAdsAccount[]> {
    return [
      {
        customerId: '1002003004',
        name: 'WyndGo Growth',
        currency: 'USD',
        timezone: 'Asia/Karachi',
        manager: false,
      },
    ]
  }

  async fetchAdsMetrics(
    customerId: string,
    date: string,
  ): Promise<GoogleAdsDailyMetric[]> {
    return [
      {
        customerId,
        campaignId: 'campaign-naat',
        campaignName: 'Naat Ringtones · Android',
        appId: 'com.wyndgo.naatringtones',
        date,
        costMicros: '24750000',
        impressions: 12440,
        clicks: 890,
        conversions: '312',
      },
    ]
  }

  async discoverAdMobAccounts(): Promise<AdMobAccount[]> {
    return [
      {
        publisherId: 'pub-1234567890123456',
        name: 'WyndGo AdMob',
        currency: 'USD',
        timezone: 'Asia/Karachi',
      },
    ]
  }

  async fetchAdMobMetrics(
    publisherId: string,
    date: string,
  ): Promise<AdMobDailyMetric[]> {
    return [
      {
        publisherId,
        appId: 'com.wyndgo.naatringtones',
        date,
        earningsMicros: '61430000',
        requests: 24890,
        impressions: 18040,
        clicks: 440,
      },
    ]
  }

  async discoverPlayApps(): Promise<PlayApp[]> {
    return [
      { packageName: 'com.wyndgo.naatringtones', displayName: 'Naat Ringtones' },
      { packageName: 'com.wyndgo.qiblafinder', displayName: 'Qibla Finder' },
    ]
  }
}
