import { createHash } from 'node:crypto'

export function idempotencyKey(topic: string, payload: unknown): string {
  return createHash('sha256')
    .update(`${topic}:${stableStringify(payload)}`)
    .digest('hex')
}

function stableStringify(value: unknown): string {
  if (!value || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  return `{${Object.entries(value)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
    .join(',')}}`
}
