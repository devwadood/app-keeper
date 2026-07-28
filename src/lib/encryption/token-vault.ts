import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

export interface EncryptedSecret {
  version: string
  algorithm: 'aes-256-gcm'
  ciphertext: string
  iv: string
  tag: string
}

function decodeKey(value: string): Buffer {
  const key = Buffer.from(value, 'base64')
  if (key.length !== 32)
    throw new Error('TOKEN_ENCRYPTION_KEY must be 32 bytes, base64 encoded')
  return key
}

export function encryptSecret(
  plaintext: string,
  keyValue: string,
  version = 'v1',
): EncryptedSecret {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', decodeKey(keyValue), iv)
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()])
  return {
    version,
    algorithm: 'aes-256-gcm',
    ciphertext: ciphertext.toString('base64'),
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
  }
}

export function decryptSecret(
  secret: EncryptedSecret,
  keys: Record<string, string>,
): string {
  const keyValue = keys[secret.version]
  if (!keyValue) throw new Error(`Encryption key ${secret.version} is unavailable`)
  const decipher = createDecipheriv(
    'aes-256-gcm',
    decodeKey(keyValue),
    Buffer.from(secret.iv, 'base64'),
  )
  decipher.setAuthTag(Buffer.from(secret.tag, 'base64'))
  return Buffer.concat([
    decipher.update(Buffer.from(secret.ciphertext, 'base64')),
    decipher.final(),
  ]).toString('utf8')
}
