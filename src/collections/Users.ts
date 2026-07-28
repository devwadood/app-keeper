import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' },
  },
  admin: { useAsTitle: 'email' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'platformRole',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: ['user', 'platform-support', 'platform-admin'],
      access: {
        update: ({ req }) =>
          (req.user as { platformRole?: string } | null)?.platformRole ===
          'platform-admin',
      },
    },
    { name: 'activeOrganization', type: 'relationship', relationTo: 'organizations' },
    {
      name: 'memberships',
      type: 'join',
      collection: 'organization-memberships',
      on: 'user',
    },
  ],
}
