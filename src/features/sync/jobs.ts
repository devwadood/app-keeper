export const jobTopics = [
  'integration.discover',
  'google-ads.sync-account-day',
  'admob.sync-account-day',
  'play.sync-vitals',
  'play.scan-report-bucket',
  'play.import-report-file',
  'finance.recalculate-app-day',
  'report.generate',
  'email.weekly-summary',
] as const

export type JobTopic = (typeof jobTopics)[number]

export interface JobOptions {
  organizationId: string
  idempotencyKey: string
  runAt?: Date
  maxAttempts?: number
  correlationId?: string
}

export interface JobReceipt {
  id: string
  topic: JobTopic
  queuedAt: string
}

export interface JobDispatcher {
  publish<T>(topic: JobTopic, payload: T, options: JobOptions): Promise<JobReceipt>
}

export type JobErrorKind = 'retryable' | 'permanent'

export function classifyJobError(error: unknown): JobErrorKind {
  if (error instanceof TypeError) return 'retryable'
  if (error && typeof error === 'object' && 'status' in error) {
    const status = Number(error.status)
    if (status === 408 || status === 429 || status >= 500) return 'retryable'
  }
  return 'permanent'
}

export function retryDelay(attempt: number, random = Math.random): number {
  const base = Math.min(1_000 * 2 ** Math.max(attempt - 1, 0), 15 * 60_000)
  return Math.round(base * (0.75 + random() * 0.5))
}
