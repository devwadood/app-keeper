import type { CollectionConfig, CollectionSlug, Field } from 'payload'
import { Memberships } from './Memberships'
import { Organizations } from './Organizations'
import { Users } from './Users'
import { tenantCollection } from './tenant-factory'

const relationship = (
  name: string,
  relationTo: CollectionSlug,
  required = false,
): Field => ({
  name,
  type: 'relationship',
  relationTo,
  required,
  index: true,
})

const integrations = [
  tenantCollection('google-connections', {
    adminGroup: 'Integrations',
    fields: [
      { name: 'googleEmail', type: 'email', required: true },
      { name: 'encryptedRefreshToken', type: 'json', access: { read: () => false } },
      { name: 'tokenKeyVersion', type: 'text', admin: { hidden: true } },
      { name: 'lastHealthCheck', type: 'date' },
    ],
  }),
  tenantCollection('google-connection-scopes', {
    adminGroup: 'Integrations',
    fields: [
      relationship('connection', 'google-connections', true),
      { name: 'scope', type: 'text', required: true },
      { name: 'grantedAt', type: 'date' },
    ],
  }),
  tenantCollection('play-console-profiles', {
    adminGroup: 'Integrations',
    fields: [
      relationship('connection', 'google-connections', true),
      { name: 'developerAccountId', type: 'text' },
      { name: 'bucketId', type: 'text' },
      { name: 'timezone', type: 'text' },
    ],
  }),
  tenantCollection('google-ads-accounts', {
    adminGroup: 'Integrations',
    fields: [
      relationship('connection', 'google-connections', true),
      { name: 'externalCustomerId', type: 'text', required: true, index: true },
      { name: 'managerCustomerId', type: 'text' },
      { name: 'timezone', type: 'text' },
    ],
    indexes: [{ fields: ['organization', 'externalCustomerId'], unique: true }],
  }),
  tenantCollection('admob-accounts', {
    adminGroup: 'Integrations',
    fields: [
      relationship('connection', 'google-connections', true),
      { name: 'publisherId', type: 'text', required: true, index: true },
      { name: 'timezone', type: 'text' },
    ],
    indexes: [{ fields: ['organization', 'publisherId'], unique: true }],
  }),
]

const product = [
  tenantCollection('apps', {
    adminGroup: 'Product',
    fields: [
      { name: 'packageName', type: 'text', required: true, index: true },
      { name: 'displayPackageName', type: 'text' },
      relationship('playProfile', 'play-console-profiles'),
      { name: 'iconUrl', type: 'text' },
    ],
    indexes: [{ fields: ['organization', 'packageName'], unique: true }],
  }),
  tenantCollection('google-ads-campaigns', {
    adminGroup: 'Product',
    fields: [
      relationship('sourceAccount', 'google-ads-accounts', true),
      { name: 'externalCampaignId', type: 'text', required: true, index: true },
      { name: 'appId', type: 'text', index: true },
      { name: 'channelType', type: 'text' },
    ],
    indexes: [
      {
        fields: ['organization', 'sourceAccount', 'externalCampaignId'],
        unique: true,
      },
    ],
  }),
  tenantCollection('admob-apps', {
    adminGroup: 'Product',
    fields: [
      relationship('sourceAccount', 'admob-accounts', true),
      { name: 'packageName', type: 'text', index: true },
    ],
  }),
  tenantCollection('admob-ad-units', {
    adminGroup: 'Product',
    fields: [
      relationship('admobApp', 'admob-apps', true),
      { name: 'format', type: 'text' },
    ],
  }),
  tenantCollection('campaign-app-mappings', {
    adminGroup: 'Product',
    fields: [
      relationship('campaign', 'google-ads-campaigns', true),
      relationship('app', 'apps', true),
      {
        name: 'mappingMethod',
        type: 'select',
        required: true,
        options: ['exact-id', 'confirmed-auto', 'manual', 'fuzzy-suggestion'],
      },
      { name: 'confidence', type: 'number', min: 0, max: 1 },
      relationship('confirmedBy', 'users'),
      { name: 'confirmedAt', type: 'date' },
    ],
  }),
  tenantCollection('admob-app-mappings', {
    adminGroup: 'Product',
    fields: [
      relationship('admobApp', 'admob-apps', true),
      relationship('app', 'apps', true),
      {
        name: 'mappingMethod',
        type: 'select',
        options: ['exact-id', 'confirmed-auto', 'manual', 'fuzzy-suggestion'],
      },
    ],
  }),
]

const factSlugs = [
  'google-ads-daily-stats',
  'admob-daily-stats',
  'play-daily-stats',
  'play-financial-transactions',
  'play-financial-daily-aggregates',
  'app-daily-financials',
  'account-daily-financials',
  'organization-daily-financials',
] as const

const facts = factSlugs.map((slug) =>
  tenantCollection(slug, {
    adminGroup: 'Analytics',
    hidden: true,
    fields: [
      relationship('app', 'apps'),
      { name: 'sourceAccountId', type: 'text', index: true },
      { name: 'sourceKey', type: 'text', index: true },
      { name: 'micros', type: 'number' },
      { name: 'calculationVersion', type: 'text' },
      { name: 'finalized', type: 'checkbox', defaultValue: false },
    ],
    indexes: [{ fields: ['organization', 'app', 'date', 'sourceKey'], unique: true }],
  }),
)

const finance = [
  tenantCollection('manual-expenses', {
    adminGroup: 'Finance',
    fields: [
      { name: 'vendor', type: 'text' },
      { name: 'description', type: 'textarea', required: true },
      relationship('category', 'expense-categories', true),
      relationship('app', 'apps'),
      { name: 'taxAmount', type: 'number' },
      { name: 'recurring', type: 'checkbox' },
      {
        name: 'allocationMethod',
        type: 'select',
        options: [
          'direct',
          'fixed-percentage',
          'revenue',
          'ad-spend',
          'equal',
          'organization-only',
        ],
      },
      relationship('receipt', 'media'),
    ],
  }),
  tenantCollection('expense-categories', { adminGroup: 'Finance' }),
  tenantCollection('expense-allocations', {
    adminGroup: 'Finance',
    fields: [
      relationship('expense', 'manual-expenses', true),
      relationship('app', 'apps', true),
      { name: 'percentage', type: 'number' },
    ],
  }),
  tenantCollection('currency-rates', {
    adminGroup: 'Finance',
    fields: [
      { name: 'quoteCurrency', type: 'text' },
      { name: 'rate', type: 'number' },
    ],
  }),
]

const operationalSlugs = [
  'sync-runs',
  'sync-tasks',
  'sync-cursors',
  'source-files',
  'integration-errors',
  'notifications',
  'saved-reports',
  'report-exports',
  'audit-logs',
] as const

const operations = operationalSlugs.map((slug) =>
  tenantCollection(slug, {
    adminGroup: 'Operations',
    fields: [
      { name: 'correlationId', type: 'text', index: true },
      { name: 'idempotencyKey', type: 'text', index: true },
      { name: 'attempts', type: 'number', defaultValue: 0 },
      { name: 'nextAttemptAt', type: 'date', index: true },
      { name: 'lastError', type: 'textarea' },
      { name: 'payload', type: 'json' },
      { name: 'expiresAt', type: 'date' },
    ],
  }),
)

const settings = [
  tenantCollection('organization-invitations', {
    adminGroup: 'Tenancy',
    fields: [
      { name: 'email', type: 'email', required: true },
      {
        name: 'role',
        type: 'select',
        options: ['owner', 'admin', 'finance', 'analyst', 'developer', 'viewer'],
      },
      { name: 'tokenHash', type: 'text', required: true, access: { read: () => false } },
      { name: 'expiresAt', type: 'date', required: true },
      { name: 'acceptedAt', type: 'date' },
    ],
  }),
  tenantCollection('organization-settings', {
    adminGroup: 'Tenancy',
    fields: [
      { name: 'breakEvenTolerance', type: 'number', defaultValue: 0.005 },
      { name: 'includePreliminaryAdmob', type: 'checkbox', defaultValue: true },
      { name: 'developerFinancialAccess', type: 'checkbox', defaultValue: false },
    ],
  }),
]

const Media: CollectionConfig = tenantCollection('media', {
  adminGroup: 'Operations',
  fields: [
    { name: 'pathname', type: 'text', required: true },
    { name: 'contentType', type: 'text', required: true },
    { name: 'size', type: 'number', required: true },
    { name: 'checksum', type: 'text', required: true },
    { name: 'originalFilename', type: 'text', required: true },
    { name: 'category', type: 'text', required: true },
    relationship('uploader', 'users'),
    { name: 'retentionUntil', type: 'date' },
  ],
})

export const collections: CollectionConfig[] = [
  Users,
  Organizations,
  Memberships,
  ...settings,
  ...integrations,
  ...product,
  ...facts,
  ...finance,
  ...operations,
  Media,
]
