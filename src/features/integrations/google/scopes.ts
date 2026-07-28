export const googleScopes = {
  base: ['openid', 'email', 'profile'],
  ads: ['https://www.googleapis.com/auth/adwords'],
  admob: [
    'https://www.googleapis.com/auth/admob.report',
    'https://www.googleapis.com/auth/admob.readonly',
  ],
  play: [
    'https://www.googleapis.com/auth/playdeveloperreporting',
    'https://www.googleapis.com/auth/devstorage.read_only',
  ],
} as const

export type GoogleService = 'ads' | 'admob' | 'play'

export function scopesFor(services: GoogleService[]): string[] {
  return [
    ...new Set([
      ...googleScopes.base,
      ...services.flatMap((service) => googleScopes[service]),
    ]),
  ]
}
