import config from '@payload-config'
import { getPayload } from 'payload'
import type { JobDispatcher, JobOptions, JobReceipt, JobTopic } from './jobs'

export class PostgresJobDispatcher implements JobDispatcher {
  async publish<T>(
    topic: JobTopic,
    jobPayload: T,
    options: JobOptions,
  ): Promise<JobReceipt> {
    const payload = await getPayload({ config })
    const existing = await payload.find({
      collection: 'sync-tasks',
      where: {
        and: [
          { organization: { equals: options.organizationId } },
          { idempotencyKey: { equals: options.idempotencyKey } },
        ],
      },
      limit: 1,
      overrideAccess: true,
    })
    const queuedAt = new Date().toISOString()
    if (existing.docs[0]) {
      return { id: String(existing.docs[0].id), topic, queuedAt }
    }
    const task = await payload.create({
      collection: 'sync-tasks',
      data: {
        organization: options.organizationId,
        name: topic,
        status: 'queued',
        idempotencyKey: options.idempotencyKey,
        correlationId: options.correlationId,
        payload: jobPayload as
          | string
          | number
          | boolean
          | unknown[]
          | Record<string, unknown>
          | null,
        attempts: 0,
        nextAttemptAt: options.runAt?.toISOString() ?? queuedAt,
        sourceMetadata: { maxAttempts: options.maxAttempts ?? 6 },
      },
      overrideAccess: true,
    })
    return { id: String(task.id), topic, queuedAt }
  }
}
