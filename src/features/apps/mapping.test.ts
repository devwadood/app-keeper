import { describe, expect, it } from 'vitest'
import { suggestCampaignMapping } from './mapping'

const apps = [{ appId: 'a1', packageName: 'com.example.qibla', name: 'Qibla Finder' }]

describe('campaign mapping', () => {
  it('finalizes exact package IDs', () => {
    expect(suggestCampaignMapping('COM.EXAMPLE.QIBLA', 'anything', apps)).toMatchObject({
      method: 'exact-id',
      requiresConfirmation: false,
    })
  })
  it('never finalizes fuzzy names', () => {
    expect(
      suggestCampaignMapping(undefined, 'Qibla Finder Acquisition', apps),
    ).toMatchObject({
      method: 'fuzzy-suggestion',
      requiresConfirmation: true,
    })
  })
})
