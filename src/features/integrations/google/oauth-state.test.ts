import { describe, expect, it } from 'vitest'
import { createPKCE, hashVerifier, signOAuthState, verifyOAuthState } from './oauth-state'

describe('OAuth state', () => {
  it('binds user, tenant, service, return path and PKCE', async () => {
    const secret = 'a-secure-test-secret-that-is-long-enough'
    const pkce = createPKCE()
    const token = await signOAuthState(
      {
        userId: 'b3fa99a5-e83d-42c0-8170-82b7bb5fdd2a',
        organizationId: 'ad9db8aa-d5c6-4cb8-9ae7-d25b3b1428df',
        services: ['ads'],
        returnPath: '/app/integrations',
        verifierHash: hashVerifier(pkce.verifier),
      },
      secret,
    )
    const state = await verifyOAuthState(token, secret)
    expect(state.services).toEqual(['ads'])
    expect(state.verifierHash).toBe(hashVerifier(pkce.verifier))
  })
})
