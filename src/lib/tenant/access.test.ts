import { describe, expect, it } from 'vitest'
import { tenantContextFromUser } from './access'

describe('tenant context', () => {
  it('only accepts membership in the active organization', () => {
    expect(() =>
      tenantContextFromUser({
        id: 'user-a',
        activeOrganization: 'org-b',
        memberships: [{ id: 'member-a', organization: 'org-a', role: 'owner' }],
      }),
    ).toThrow(/not permitted/)
  })
  it('derives the trusted organization instead of accepting client input', () => {
    expect(
      tenantContextFromUser({
        id: 'user-a',
        activeOrganization: 'org-a',
        memberships: [{ id: 'member-a', organization: 'org-a', role: 'finance' }],
      }).organizationId,
    ).toBe('org-a')
  })
})
