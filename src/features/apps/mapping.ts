export type MappingMethod = 'exact-id' | 'confirmed-auto' | 'manual' | 'fuzzy-suggestion'

export interface MappingCandidate {
  appId: string
  packageName: string
  name: string
}

export interface MappingSuggestion {
  appId: string
  method: MappingMethod
  confidence: number
  requiresConfirmation: boolean
}

const normalize = (value: string) => value.trim().toLowerCase()

export function suggestCampaignMapping(
  sourceAppId: string | undefined,
  campaignName: string,
  apps: MappingCandidate[],
): MappingSuggestion | null {
  if (sourceAppId) {
    const exact = apps.find(
      (app) => normalize(app.packageName) === normalize(sourceAppId),
    )
    if (exact) {
      return {
        appId: exact.appId,
        method: 'exact-id',
        confidence: 1,
        requiresConfirmation: false,
      }
    }
  }
  const words = new Set(
    normalize(campaignName)
      .split(/[^a-z0-9]+/)
      .filter(Boolean),
  )
  const scored = apps
    .map((app) => {
      const candidate = normalize(app.name)
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
      const overlap = candidate.filter((word) => words.has(word)).length
      return { app, score: candidate.length ? overlap / candidate.length : 0 }
    })
    .sort((a, b) => b.score - a.score)[0]
  if (!scored || scored.score < 0.5) return null
  return {
    appId: scored.app.appId,
    method: 'fuzzy-suggestion',
    confidence: scored.score,
    requiresConfirmation: true,
  }
}
