if (
  process.env.NODE_ENV === 'production' ||
  !process.env.DATABASE_URL?.includes('localhost')
) {
  throw new Error('db:reset:local only permits an explicit localhost database URL')
}
throw new Error(
  'Local reset is intentionally non-automatic. Drop the named local database explicitly, then run pnpm db:migrate.',
)
