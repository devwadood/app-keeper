const secretKeys = /token|secret|password|authorization|cookie/i

export function redact(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redact)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        secretKeys.test(key) ? '[REDACTED]' : redact(item),
      ]),
    )
  }
  return value
}

export function log(
  level: 'debug' | 'info' | 'warn' | 'error',
  event: string,
  context: Record<string, unknown> = {},
) {
  const safeContext = redact(context) as Record<string, unknown>
  const record = { timestamp: new Date().toISOString(), level, event, ...safeContext }
  const output = JSON.stringify(record)
  if (level === 'error') console.error(output)
  else if (level === 'warn') console.warn(output)
  else console.log(output)
}
