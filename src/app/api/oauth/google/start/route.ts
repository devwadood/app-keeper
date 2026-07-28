import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireTenantFromRequest } from '@/lib/auth/server'
import { env } from '@/lib/env/server'
import { errorEnvelope } from '@/lib/errors'
import { rateLimit } from '@/lib/security/http'
import {
  createPKCE,
  hashVerifier,
  signOAuthState,
} from '@/features/integrations/google/oauth-state'
import { scopesFor } from '@/features/integrations/google/scopes'

const querySchema = z.object({
  services: z
    .string()
    .transform((value) => value.split(','))
    .pipe(z.array(z.enum(['ads', 'admob', 'play'])).min(1)),
  returnPath: z.string().startsWith('/app').default('/app/integrations'),
})

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, 'oauth-start', 10, 60_000)
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_OAUTH_REDIRECT_URI) {
      return NextResponse.json(
        {
          ok: false,
          error: { code: 'NOT_CONFIGURED', message: 'Google OAuth is not configured.' },
        },
        { status: 503 },
      )
    }
    const tenant = await requireTenantFromRequest(request)
    const input = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams))
    const { verifier, challenge } = createPKCE()
    const state = await signOAuthState(
      {
        userId: tenant.userId,
        organizationId: tenant.organizationId,
        services: input.services,
        returnPath: input.returnPath,
        verifierHash: hashVerifier(verifier),
      },
      env.PAYLOAD_SECRET,
    )
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    url.searchParams.set('client_id', env.GOOGLE_CLIENT_ID)
    url.searchParams.set('redirect_uri', env.GOOGLE_OAUTH_REDIRECT_URI)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', scopesFor(input.services).join(' '))
    url.searchParams.set('state', state)
    url.searchParams.set('code_challenge', challenge)
    url.searchParams.set('code_challenge_method', 'S256')
    url.searchParams.set('access_type', 'offline')
    url.searchParams.set('include_granted_scopes', 'true')
    const response = NextResponse.redirect(url)
    const cookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 600,
      path: '/api/oauth/google/callback',
    }
    response.cookies.set('appledger_oauth_verifier', verifier, cookieOptions)
    response.cookies.set('appledger_oauth_state', state, cookieOptions)
    return response
  } catch (error) {
    const body = errorEnvelope(error)
    return NextResponse.json(body, {
      status:
        'status' in (error as object)
          ? Number((error as { status: number }).status)
          : 400,
    })
  }
}
