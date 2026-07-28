import { NextResponse } from 'next/server'
import { env } from '@/lib/env/server'

export function GET() {
  return NextResponse.json({
    ok: true,
    service: 'appledger',
    checks: {
      payloadSecret: Boolean(env.PAYLOAD_SECRET),
      databaseConfigured: Boolean(process.env.DATABASE_URL),
      tokenEncryptionConfigured: Boolean(env.TOKEN_ENCRYPTION_KEY),
      googleOAuthConfigured: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
      googleAdsDeveloperToken: Boolean(env.GOOGLE_ADS_DEVELOPER_TOKEN),
      blobConfigured: Boolean(env.BLOB_READ_WRITE_TOKEN),
      resendConfigured:
        env.EMAIL_MODE === 'console' ||
        Boolean(env.RESEND_API_KEY && env.RESEND_FROM_EMAIL),
      jobDriver: env.JOB_DRIVER,
    },
    secretsExposed: false,
    timestamp: new Date().toISOString(),
  })
}
