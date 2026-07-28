import { createHash, randomBytes } from 'node:crypto'
import { SignJWT, jwtVerify } from 'jose'
import { z } from 'zod'

const stateSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  services: z.array(z.enum(['ads', 'admob', 'play'])).min(1),
  returnPath: z.string().startsWith('/app'),
  nonce: z.string(),
  verifierHash: z.string(),
})

export type OAuthState = z.infer<typeof stateSchema>

const key = (secret: string) => new TextEncoder().encode(secret)

export function createPKCE() {
  const verifier = randomBytes(32).toString('base64url')
  const challenge = createHash('sha256').update(verifier).digest('base64url')
  return { verifier, challenge }
}

export async function signOAuthState(
  state: Omit<OAuthState, 'nonce'>,
  secret: string,
): Promise<string> {
  return new SignJWT({ ...state, nonce: randomBytes(24).toString('base64url') })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('10m')
    .setAudience('appledger-google-oauth')
    .setIssuer('appledger')
    .sign(key(secret))
}

export async function verifyOAuthState(
  token: string,
  secret: string,
): Promise<OAuthState> {
  const { payload } = await jwtVerify(token, key(secret), {
    audience: 'appledger-google-oauth',
    issuer: 'appledger',
  })
  return stateSchema.parse(payload)
}

export function hashVerifier(verifier: string) {
  return createHash('sha256').update(verifier).digest('base64url')
}
