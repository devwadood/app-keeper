import { describe, expect, it } from 'vitest'
import { classifyJobError, retryDelay } from './jobs'

describe('job reliability', () => {
  it('classifies quota and server failures as retryable', () => {
    expect(classifyJobError({ status: 429 })).toBe('retryable')
    expect(classifyJobError({ status: 503 })).toBe('retryable')
    expect(classifyJobError({ status: 400 })).toBe('permanent')
  })
  it('uses capped exponential backoff with jitter', () => {
    expect(retryDelay(1, () => 0)).toBe(750)
    expect(retryDelay(20, () => 1)).toBe(1_125_000)
  })
})
