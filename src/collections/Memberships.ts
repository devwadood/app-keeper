import type { CollectionConfig } from 'payload'
import { injectTenant, tenantAccess } from '@/lib/tenant/access'

export const Memberships: CollectionConfig = {
  slug: 'organization-memberships',
  admin: { useAsTitle: 'id' },
  access: {
    read: tenantAccess,
    create: tenantAccess,
    update: tenantAccess,
    delete: tenantAccess,
  },
  hooks: { beforeChange: [injectTenant] },
  fields: [
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
      index: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: ['owner', 'admin', 'finance', 'analyst', 'developer', 'viewer'],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: ['invited', 'active', 'suspended'],
    },
  ],
  indexes: [{ fields: ['organization', 'user'], unique: true }],
}
