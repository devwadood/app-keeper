import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { collections } from '@/collections'
import { env } from '@/lib/env/server'

export default buildConfig({
  admin: {
    user: 'users',
    meta: { titleSuffix: '— AppLedger Platform' },
  },
  collections,
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URL },
    idType: 'uuid',
    push: false,
    migrationDir: './src/migrations',
  }),
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: { outputFile: './src/payload-types.ts' },
  routes: { admin: '/admin' },
  graphQL: { disable: true },
  maxDepth: 3,
})
