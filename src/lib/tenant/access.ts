import type { Access, CollectionBeforeChangeHook, Where } from 'payload'
import { AppError } from '@/lib/errors'
import { permissionsFor, type OrganizationRole, type Permission } from '@/lib/permissions'

interface SessionMembership {
  id: string
  organization: string | { id: string }
  role: OrganizationRole
  status?: string
}

interface SessionUser {
  id: string
  platformRole?: 'platform-admin' | 'platform-support' | 'user'
  activeOrganization?: string | { id: string }
  memberships?: SessionMembership[]
}

export interface TenantContext {
  userId: string
  organizationId: string
  membershipId: string
  role: OrganizationRole
  permissions: Permission[]
}

const relationId = (value: string | { id: string } | null | undefined) =>
  typeof value === 'string' ? value : value?.id

export function tenantContextFromUser(userValue: unknown): TenantContext {
  const user = userValue as SessionUser | null
  if (!user?.id) throw new AppError('UNAUTHENTICATED', 'Authentication is required.', 401)
  const organizationId = relationId(user.activeOrganization)
  if (!organizationId) {
    throw new AppError('ORGANIZATION_REQUIRED', 'Select an active organization.', 403)
  }
  const membership = user.memberships?.find(
    (item) =>
      relationId(item.organization) === organizationId && item.status !== 'suspended',
  )
  if (!membership)
    throw new AppError('FORBIDDEN', 'Organization access is not permitted.', 403)
  return {
    userId: user.id,
    organizationId,
    membershipId: membership.id,
    role: membership.role,
    permissions: permissionsFor(membership.role),
  }
}

export async function requireTenantContext(request: {
  user?: unknown
}): Promise<TenantContext> {
  return tenantContextFromUser(request.user)
}

export const tenantAccess: Access = ({ req }): boolean | Where => {
  const user = req.user as SessionUser | null
  if (user?.platformRole === 'platform-admin') return true
  try {
    const tenant = tenantContextFromUser(user)
    return { organization: { equals: tenant.organizationId } }
  } catch {
    return false
  }
}

export const injectTenant: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  const user = req.user as SessionUser | null
  if (user?.platformRole === 'platform-admin') return data
  const tenant = tenantContextFromUser(user)
  const supplied = relationId(data?.organization)
  if (supplied && supplied !== tenant.organizationId) {
    throw new AppError('TENANT_MISMATCH', 'Organization cannot be changed.', 403)
  }
  if (operation === 'create') return { ...data, organization: tenant.organizationId }
  return data
}
