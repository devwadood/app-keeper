import 'server-only'
import config from '@payload-config'
import { getPayload } from 'payload'
import type { NextRequest } from 'next/server'
import { AppError } from '@/lib/errors'
import { permissionsFor, type OrganizationRole } from '@/lib/permissions'
import type { TenantContext } from '@/lib/tenant/access'

const relationId = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'id' in value) return String(value.id)
}

export async function requireTenantFromRequest(
  request: NextRequest,
): Promise<TenantContext> {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) throw new AppError('UNAUTHENTICATED', 'Authentication is required.', 401)
  const organizationId = relationId(user.activeOrganization)
  if (!organizationId)
    throw new AppError('ORGANIZATION_REQUIRED', 'Select an organization.', 403)
  const memberships = await payload.find({
    collection: 'organization-memberships',
    where: {
      and: [
        { organization: { equals: organizationId } },
        { user: { equals: user.id } },
        { status: { equals: 'active' } },
      ],
    },
    limit: 1,
    overrideAccess: true,
  })
  const membership = memberships.docs[0]
  if (!membership)
    throw new AppError('FORBIDDEN', 'Organization access is not permitted.', 403)
  const role = membership.role as OrganizationRole
  return {
    userId: String(user.id),
    organizationId,
    membershipId: String(membership.id),
    role,
    permissions: permissionsFor(role),
  }
}
