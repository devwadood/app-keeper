export const organizationRoles = [
  'owner',
  'admin',
  'finance',
  'analyst',
  'developer',
  'viewer',
] as const

export type OrganizationRole = (typeof organizationRoles)[number]

export const permissions = [
  'organization.manage',
  'members.manage',
  'integrations.manage',
  'apps.manage',
  'finance.view',
  'finance.manage',
  'reports.generate',
  'quality.view',
  'audit.view',
] as const

export type Permission = (typeof permissions)[number]

const matrix: Record<OrganizationRole, readonly Permission[]> = {
  owner: permissions,
  admin: permissions.filter((p) => p !== 'organization.manage'),
  finance: ['finance.view', 'finance.manage', 'reports.generate', 'audit.view'],
  analyst: ['finance.view', 'reports.generate', 'quality.view'],
  developer: ['quality.view'],
  viewer: ['quality.view'],
}

export function permissionsFor(role: OrganizationRole): Permission[] {
  return [...matrix[role]]
}

export function can(role: OrganizationRole, permission: Permission): boolean {
  return matrix[role].includes(permission)
}
