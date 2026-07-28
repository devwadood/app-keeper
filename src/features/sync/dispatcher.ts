import { env } from '@/lib/env/server'
import { PostgresJobDispatcher } from './postgres-dispatcher'
import type { JobDispatcher } from './jobs'

export function getJobDispatcher(): JobDispatcher {
  if (env.JOB_DRIVER === 'vercel-queues') {
    throw new Error(
      'VERCEL Queues selected but no runtime publisher was registered. Use database fallback or register the production publisher.',
    )
  }
  return new PostgresJobDispatcher()
}
