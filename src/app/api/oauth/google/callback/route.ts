import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { encryptSecret } from '@/lib/encryption/token-vault'
import { env } from '@/lib/env/server'
import {
  hashVerifier,
  verifyOAuthState,
} from '@/features/integrations/google/oauth-state'

const tokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional(),
  scope: z.string(),
  token_type: z.string(),
})

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const stateToken = request.nextUrl.searchParams.get('state')
  const storedState = request.cookies.get('appledger_oauth_state')?.value
  const verifier = request.cookies.get('appledger_oauth_verifier')?.value
  if (!code || !stateToken || stateToken !== storedState || !verifier) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'INVALID_OAUTH_STATE',
          message: 'OAuth state is invalid or expired.',
        },
      },
      { status: 400 },
    )
  }
  const state = await verifyOAuthState(stateToken, env.PAYLOAD_SECRET)
  if (hashVerifier(verifier) !== state.verifierHash) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'INVALID_PKCE', message: 'OAuth verifier is invalid.' },
      },
      { status: 400 },
    )
  }
  if (
    !env.GOOGLE_CLIENT_ID ||
    !env.GOOGLE_CLIENT_SECRET ||
    !env.GOOGLE_OAUTH_REDIRECT_URI
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'NOT_CONFIGURED', message: 'Google OAuth is not configured.' },
      },
      { status: 503 },
    )
  }
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: env.GOOGLE_OAUTH_REDIRECT_URI,
      grant_type: 'authorization_code',
      code,
      code_verifier: verifier,
    }),
    cache: 'no-store',
  })
  if (!tokenResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'TOKEN_EXCHANGE_FAILED',
          message: 'Google authorization could not be completed.',
        },
      },
      { status: 502 },
    )
  }
  const tokens = tokenSchema.parse(await tokenResponse.json())
  const profileResponse = await fetch(
    'https://openidconnect.googleapis.com/v1/userinfo',
    {
      headers: { authorization: `Bearer ${tokens.access_token}` },
      cache: 'no-store',
    },
  )
  const profile = z
    .object({ email: z.string().email(), name: z.string().optional() })
    .parse(await profileResponse.json())
  const payload = await getPayload({ config })
  const existing = await payload.find({
    collection: 'google-connections',
    where: {
      and: [
        { organization: { equals: state.organizationId } },
        { googleEmail: { equals: profile.email } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })
  const encrypted =
    tokens.refresh_token && env.TOKEN_ENCRYPTION_KEY
      ? encryptSecret(
          tokens.refresh_token,
          env.TOKEN_ENCRYPTION_KEY,
          env.TOKEN_ENCRYPTION_KEY_VERSION,
        )
      : undefined
  const encryptedJson: Record<string, string> | undefined = encrypted
    ? { ...encrypted }
    : undefined
  const data = {
    organization: state.organizationId,
    name: profile.name ?? profile.email,
    googleEmail: profile.email,
    status: 'active' as const,
    tokenKeyVersion: encrypted?.version,
    encryptedRefreshToken:
      encryptedJson ?? existing.docs[0]?.encryptedRefreshToken,
    sourceMetadata: { services: state.services, scopes: tokens.scope.split(' ') },
  }
  if (existing.docs[0]) {
    await payload.update({
      collection: 'google-connections',
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    })
  } else {
    await payload.create({ collection: 'google-connections', data, overrideAccess: true })
  }
  const response = NextResponse.redirect(
    new URL(`${state.returnPath}?connected=1`, env.APP_URL),
  )
  response.cookies.delete('appledger_oauth_verifier')
  response.cookies.delete('appledger_oauth_state')
  return response
}
