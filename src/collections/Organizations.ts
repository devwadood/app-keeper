import type { CollectionConfig } from 'payload'
import { tenantAccess } from '@/lib/tenant/access'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: { useAsTitle: 'name' },
  access: {
    read: tenantAccess,
    update: tenantAccess,
    delete: ({ req }) =>
      (req.user as { platformRole?: string } | null)?.platformRole === 'platform-admin',
    create: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true, index: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'baseCurrency', type: 'text', required: true, defaultValue: 'USD' },
    { name: 'timezone', type: 'text', required: true, defaultValue: 'UTC' },
    { name: 'fiscalYearStart', type: 'number', min: 1, max: 12, defaultValue: 1 },
    { name: 'reportingDayCutoff', type: 'number', min: 0, max: 23, defaultValue: 0 },
    { name: 'archivedAt', type: 'date' },
  ],
}
