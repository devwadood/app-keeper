import type { JobDispatcher, JobOptions, JobReceipt, JobTopic } from './jobs'

/**
 * Vercel Queues adapter boundary. The HTTP publisher is injected so the application
 * has no build-time dependency on a preview API. Configure it only when Queues is enabled.
 */
export class VercelQueuesJobDispatcher implements JobDispatcher {
  constructor(
    private readonly publishMessage: (
      topic: string,
      body: unknown,
      options: JobOptions,
    ) => Promise<{ id: string }>,
    private readonly prefix: string,
  ) {}

  async publish<T>(
    topic: JobTopic,
    payload: T,
    options: JobOptions,
  ): Promise<JobReceipt> {
    const result = await this.publishMessage(`${this.prefix}.${topic}`, payload, options)
    return { id: result.id, topic, queuedAt: new Date().toISOString() }
  }
}
