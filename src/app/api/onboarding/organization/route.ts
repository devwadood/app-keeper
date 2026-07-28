import config from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { enforceSameOrigin } from '@/lib/security/http'

const schema = z.object({
  name: z.string().min(2).max(80),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .min(2)
    .max(60),
  baseCurrency: z
    .string()
    .length(3)
    .transform((value) => value.toUpperCase()),
  timezone: z.string().min(1),
})

export async function POST(request: NextRequest) {
  enforceSameOrigin(request)
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) return NextResponse.json({ ok: false }, { status: 401 })
  const input = schema.parse(await request.json())
  const organization = await payload.create({
    collection: 'organizations',
    data: input,
    overrideAccess: true,
  })
  const membership = await payload.create({
    collection: 'organization-memberships',
    data: {
      organization: organization.id,
      user: user.id,
      role: 'owner',
      status: 'active',
    },
    overrideAccess: true,
  })
  await payload.update({
    collection: 'users',
    id: user.id,
    data: { activeOrganization: organization.id },
    overrideAccess: true,
  })
  return NextResponse.json(
    { ok: true, organizationId: organization.id, membershipId: membership.id },
    { status: 201 },
  )
}
