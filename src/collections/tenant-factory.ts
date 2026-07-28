import type { CollectionConfig, Field } from 'payload'
import { injectTenant, tenantAccess } from '@/lib/tenant/access'

const tenantField: Field = {
  name: 'organization',
  type: 'relationship',
  relationTo: 'organizations',
  required: true,
  index: true,
}

const commonFields: Field[] = [
  tenantField,
  { name: 'name', type: 'text', index: true },
  { name: 'externalId', type: 'text', index: true },
  { name: 'date', type: 'date', index: true },
  { name: 'amount', type: 'number' },
  { name: 'currency', type: 'text' },
  {
    name: 'status',
    type: 'select',
    options: [
      'active',
      'inactive',
      'pending',
      'queued',
      'running',
      'completed',
      'failed',
      'cancelled',
      'dead-letter',
      'preliminary',
      'finalized',
      'archived',
    ],
  },
  { name: 'sourceMetadata', type: 'json', admin: { hidden: true } },
  { name: 'archivedAt', type: 'date' },
]

export function tenantCollection(
  slug: string,
  options: {
    fields?: Field[]
    adminGroup?: string
    hidden?: boolean
    indexes?: CollectionConfig['indexes']
  } = {},
): CollectionConfig {
  return {
    slug,
    admin: {
      useAsTitle: 'name',
      group: options.adminGroup ?? 'AppLedger',
      hidden: options.hidden,
    },
    access: {
      read: tenantAccess,
      create: tenantAccess,
      update: tenantAccess,
      delete: tenantAccess,
    },
    hooks: { beforeChange: [injectTenant] },
    fields: [...commonFields, ...(options.fields ?? [])],
    indexes: options.indexes,
  }
}
