import { randomBytes } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { decryptSecret, encryptSecret } from './token-vault'

describe('token vault', () => {
  it('encrypts, authenticates and decrypts with a versioned key', () => {
    const key = randomBytes(32).toString('base64')
    const encrypted = encryptSecret('refresh-token', key, 'v2')
    expect(encrypted.ciphertext).not.toContain('refresh-token')
    expect(decryptSecret(encrypted, { v2: key })).toBe('refresh-token')
  })

  it('rejects missing rotation keys', () => {
    const key = randomBytes(32).toString('base64')
    expect(() => decryptSecret(encryptSecret('x', key, 'old'), {})).toThrow(/old/)
  })
})
