# Environment setup

Copy `.env.example` to `.env.local`. Use different values and databases for local,
preview, and production.

## Core secrets

```bash
openssl rand -base64 48 # PAYLOAD_SECRET
openssl rand -hex 32    # CRON_SECRET
openssl rand -base64 32 # TOKEN_ENCRYPTION_KEY
```

Never reuse these values. Keep `TOKEN_ENCRYPTION_KEY_VERSION=v1`; changing the key
without rotating stored refresh tokens makes them unreadable.

## Neon

Create separate Neon branches for development/preview/production. Put the pooled URL in
`DATABASE_URL`, the direct URL in `DATABASE_URL_UNPOOLED`, and the privileged direct URL
in `MIGRATION_DATABASE_URL`. Require SSL. Apply checked migrations; never use schema push
in production.

## Google Cloud

Create a Web OAuth client and add the exact callbacks:

- `http://localhost:3000/api/oauth/google/callback`
- `https://YOUR_DOMAIN/api/oauth/google/callback`

Enable Google Ads API, AdMob API, Google Play Developer Reporting API, and Cloud Storage
JSON API. Set the client ID/secret, callback, Ads developer token, and API version.
AppLedger requests product scopes incrementally:

- Ads: `https://www.googleapis.com/auth/adwords`
- AdMob: `admob.report` and `admob.readonly`
- Play: `playdeveloperreporting` and `devstorage.read_only`

Do not add `cloud-platform` or Android Publisher scope. Grant the Google identity
Read-only access in Ads. In Play, grant only View app information and—when needed—View
financial data. Copy each `pubsite_prod_rev_…` bucket into its Play profile. Enable the
AdMob identity on the selected publisher accounts. Public SaaS use may require verified
domain, policies, scope justification, test users, and OAuth consent verification.

## Resend and Blob

Verify a Resend sending domain, create a restricted API key, and set a From address on
that domain. Use `EMAIL_MODE=console` locally and `resend` in production. Connect a Vercel
Blob store and keep `BLOB_READ_WRITE_TOKEN` server-only; source files, receipts, and
financial reports use private authorized delivery.

## Jobs and Vercel

Use `JOB_DRIVER=database` locally. In production, select `vercel-queues` only after
registering the runtime queue publisher; otherwise keep the database fallback. Configure
Vercel Cron from `vercel.json` and add `CRON_SECRET`. Cron only dispatches bounded jobs.
Keep queue region, functions, and Neon geographically close.

## Verify

Open `/api/health` and `/app/sync-health`. They report configuration presence, selected
driver, and freshness without returning values. Then test OAuth account discovery,
AdMob reporting, Ads reporting, Play app discovery, Play bucket read, Blob private
write/read, Resend sender, cron authorization, and one queued task.
