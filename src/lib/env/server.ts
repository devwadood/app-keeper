import { z } from 'zod'

const optionalUrl = z.string().url().optional().or(z.literal(''))

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_URL: z.string().url().default('http://localhost:3000'),
  PAYLOAD_SECRET: z.string().min(24).default('development-only-payload-secret-change-me'),
  CRON_SECRET: z.string().min(16).default('development-only-cron-secret'),
  TOKEN_ENCRYPTION_KEY: z.string().default(''),
  TOKEN_ENCRYPTION_KEY_VERSION: z.string().default('v1'),
  DATABASE_URL: z
    .string()
    .default('postgresql://postgres:postgres@127.0.0.1:5432/appledger'),
  DATABASE_URL_UNPOOLED: z.string().optional(),
  MIGRATION_DATABASE_URL: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_OAUTH_REDIRECT_URI: optionalUrl,
  GOOGLE_ADS_DEVELOPER_TOKEN: z.string().optional(),
  GOOGLE_ADS_API_VERSION: z.string().default('v20'),
  GOOGLE_OAUTH_SCOPES_BASE: z.string().default('openid email profile'),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().email().optional().or(z.literal('')),
  RESEND_FROM_NAME: z.string().default('AppLedger'),
  EMAIL_MODE: z.enum(['console', 'resend']).default('console'),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  JOB_DRIVER: z.enum(['database', 'vercel-queues']).default('database'),
  VERCEL_QUEUE_REGION: z.string().optional(),
  VERCEL_QUEUE_TOPIC_PREFIX: z.string().default('appledger'),
  CRON_TIMEZONE: z.string().default('UTC'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  SUPPORT_EMAIL: z.string().email().optional().or(z.literal('')),
})

const result = schema.safeParse(process.env)

if (!result.success) {
  throw new Error(`Invalid server environment: ${z.prettifyError(result.error)}`)
}

if (result.data.NODE_ENV === 'production') {
  const required = [
    'PAYLOAD_SECRET',
    'CRON_SECRET',
    'TOKEN_ENCRYPTION_KEY',
    'DATABASE_URL',
  ] as const
  const missing = required.filter((name) => !process.env[name])
  if (missing.length)
    throw new Error(`Missing production variables: ${missing.join(', ')}`)
}

export const env = result.data
