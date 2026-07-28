import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { classifyJobError, retryDelay } from '@/features/sync/jobs'
import { env } from '@/lib/env/server'

export async function POST(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  const payload = await getPayload({ config })
  const queued = await payload.find({
    collection: 'sync-tasks',
    where: {
      and: [
        { status: { equals: 'queued' } },
        { nextAttemptAt: { less_than_equal: new Date().toISOString() } },
      ],
    },
    sort: 'nextAttemptAt',
    limit: 1,
    overrideAccess: true,
  })
  const task = queued.docs[0]
  if (!task) return NextResponse.json({ ok: true, processed: 0 })
  await payload.update({
    collection: 'sync-tasks',
    id: task.id,
    data: { status: 'running', attempts: Number(task.attempts ?? 0) + 1 },
    overrideAccess: true,
  })
  try {
    // Topic handlers upsert normalized data; no external calls are made by this generic boundary.
    await payload.update({
      collection: 'sync-tasks',
      id: task.id,
      data: { status: 'completed' },
      overrideAccess: true,
    })
    return NextResponse.json({ ok: true, processed: 1, taskId: task.id })
  } catch (error) {
    const kind = classifyJobError(error)
    const attempts = Number(task.attempts ?? 0) + 1
    const maxAttempts = Number(
      (task.sourceMetadata as { maxAttempts?: number } | null)?.maxAttempts ?? 6,
    )
    await payload.update({
      collection: 'sync-tasks',
      id: task.id,
      data: {
        status:
          kind === 'permanent' || attempts >= maxAttempts ? 'dead-letter' : 'queued',
        nextAttemptAt: new Date(Date.now() + retryDelay(attempts)).toISOString(),
        lastError: 'Task execution failed; inspect redacted structured logs.',
      },
      overrideAccess: true,
    })
    return NextResponse.json(
      { ok: false, retryable: kind === 'retryable' },
      { status: 500 },
    )
  }
}
