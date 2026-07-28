# Deploying to Vercel

1. Create production and preview Neon branches.
2. Import the repository into Vercel and connect Blob.
3. Add separate Preview/Production variables from `.env.example`.
4. Add exact OAuth callbacks for stable domains.
5. Run `pnpm db:migrate` against the target database from a controlled release step.
6. Deploy; verify `/api/health`, signup, Admin restriction, OAuth, Blob, email, cron, and
   queued work.

Do not point previews at production data. Every `vercel.json` cron uses bearer
`CRON_SECRET`. Production is not ready until legal placeholders are replaced.
