import { expect, it } from 'vitest'
import { idempotencyKey } from './idempotency'

it('creates stable keys regardless of object property order', () => {
  expect(idempotencyKey('sync', { a: 1, b: 2 })).toBe(
    idempotencyKey('sync', { b: 2, a: 1 }),
  )
})
