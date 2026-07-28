# AppLedger Environment and External Service Setup Guide

This guide accompanies `MASTER_CODEX_BUILD_PROMPT.md`. Codex must also generate and maintain an in-repository version at `docs/ENVIRONMENT_SETUP.md`.

## 1. Core application variables

```env
NEXT_PUBLIC_APP_NAME=AppLedger
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_URL=http://localhost:3000
NODE_ENV=development

PAYLOAD_SECRET=
CRON_SECRET=
TOKEN_ENCRYPTION_KEY=
TOKEN_ENCRYPTION_KEY_VERSION=v1
```

### `PAYLOAD_SECRET`

Generate a long random secret, for example:

```bash
openssl rand -base64 48
```

Use separate values for local, preview, and production.

### `CRON_SECRET`

Generate another independent secret:

```bash
openssl rand -hex 32
```

Vercel Cron requests must be validated against this value.

### `TOKEN_ENCRYPTION_KEY`

Use a 32-byte encryption key for AES-256-GCM:

```bash
openssl rand -base64 32
```

Do not reuse `PAYLOAD_SECRET`. Do not change it without implementing token-key rotation, because existing encrypted Google refresh tokens depend on it.

---

## 2. Neon PostgreSQL

```env
DATABASE_URL=
DATABASE_URL_UNPOOLED=
MIGRATION_DATABASE_URL=
```

Setup:

1. Create a Neon project.
2. Create separate development and production branches/databases.
3. Copy the pooled connection string into `DATABASE_URL`.
4. Copy the direct/unpooled connection string into `DATABASE_URL_UNPOOLED`.
5. Use the direct privileged connection for `MIGRATION_DATABASE_URL`.
6. Enable SSL as required by the provided Neon URL.
7. Put production values in Vercel Production environment variables and separate preview values in Preview.

Never run destructive development schema push against production. Use checked-in migrations.

---

## 3. Google Cloud OAuth and APIs

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/api/oauth/google/callback
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_API_VERSION=
GOOGLE_OAUTH_SCOPES_BASE=openid email profile
```

### Create the Google Cloud project

1. Create a dedicated Google Cloud project for AppLedger.
2. Configure the OAuth consent screen.
3. Add the production domain and required policy pages.
4. Create an OAuth 2.0 Web Application client.
5. Add exact authorized redirect URIs:
   - `http://localhost:3000/api/oauth/google/callback`
   - `https://YOUR_DOMAIN/api/oauth/google/callback`
   - add a stable preview callback only if you intentionally support preview OAuth.
6. Copy client ID and secret.

### Enable APIs

Enable:

- Google Ads API.
- AdMob API.
- Google Play Developer Reporting API.
- Cloud Storage JSON API.

The application requests product permissions incrementally.

### Required scopes

Base:

```text
openid
email
profile
```

Google Ads:

```text
https://www.googleapis.com/auth/adwords
```

AdMob:

```text
https://www.googleapis.com/auth/admob.report
https://www.googleapis.com/auth/admob.readonly
```

Play reporting:

```text
https://www.googleapis.com/auth/playdeveloperreporting
https://www.googleapis.com/auth/devstorage.read_only
```

Do not request Cloud Storage write access. Do not request broad `cloud-platform` when read-only storage is sufficient. Do not request Android Publisher scope in the reporting-only MVP.

### OAuth verification

A public multi-user SaaS using sensitive Google scopes may require OAuth consent verification. Prepare:

- verified domain;
- privacy policy;
- terms;
- scope justification;
- demo video if Google requests it;
- test users while the app remains in testing mode.

### Google Ads developer token

1. Open a Google Ads Manager account.
2. Go to the Google Ads API Center.
3. Apply for a developer token.
4. Use test access during development where applicable.
5. Put the token in `GOOGLE_ADS_DEVELOPER_TOKEN`.

The OAuth scope is not read-only. Customers should grant the connected Google user **Read-only** access to their Google Ads accounts. AppLedger must only issue reporting/search calls.

### Customer Google Ads onboarding

The customer should:

1. Choose or create a dedicated Google identity for analytics.
2. Add it to the relevant Google Ads manager/customer account.
3. Grant `Read-only` role.
4. Sign in through AppLedger.
5. Select the discovered customer accounts.
6. Run the connection test.

### Customer Google Play onboarding

For each Play developer account:

1. Add the connected Google identity in Play Console Users and permissions.
2. Grant only global `View app information`.
3. Grant global `View financial data` only when financial imports are required.
4. Do not grant release, store listing, order management, user management, or app signing permissions.
5. In Play Console Download reports, copy the private Cloud Storage bucket URI beginning with `pubsite_prod_rev_...`.
6. Add that bucket identifier to the AppLedger Play Console profile.
7. Validate the connection.
8. Select the apps to synchronize.

Play report exports can be delayed. The UI must display source freshness.

### Customer AdMob onboarding

1. Ensure the Google identity has access to the AdMob publisher account.
2. Connect AdMob through AppLedger.
3. Select the discovered publisher account.
4. Run an initial report test.
5. Confirm the publisher currency and timezone.

---

## 4. Resend

```env
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_FROM_NAME=AppLedger
EMAIL_MODE=console
SUPPORT_EMAIL=
```

Setup:

1. Create a Resend account.
2. Add and verify the sending domain.
3. Configure required DNS records.
4. Create a restricted API key for the application.
5. Use an address on the verified domain, such as `notifications@example.com`.
6. Use `EMAIL_MODE=console` locally and `EMAIL_MODE=resend` in production.

Do not use an unverified arbitrary From address.

---

## 5. Vercel Blob

```env
BLOB_READ_WRITE_TOKEN=
```

Setup:

1. Create or connect a Vercel Blob store to the Vercel project.
2. Let Vercel add the Blob token, or copy it into the correct environment.
3. Use private/authorized delivery for financial reports, receipts, and source imports.
4. Do not expose the read-write token to the browser.

---

## 6. Jobs, Cron, and Vercel

```env
JOB_DRIVER=database
VERCEL_QUEUE_REGION=
VERCEL_QUEUE_TOPIC_PREFIX=appledger
CRON_TIMEZONE=UTC
VERCEL_ENV=
VERCEL_URL=
```

### Local development

Use:

```env
JOB_DRIVER=database
```

The PostgreSQL fallback worker should be runnable with a documented local command.

### Production

Use Vercel Queues when configured:

```env
JOB_DRIVER=vercel-queues
VERCEL_QUEUE_REGION=fra1
VERCEL_QUEUE_TOPIC_PREFIX=appledger-production
```

Choose a queue region close to the Vercel functions and Neon database.

Configure Vercel Cron in `vercel.json`. Protect dispatch routes with `CRON_SECRET`.

Do not perform all sync work in the cron invocation. Cron dispatches small durable jobs.

---

## 7. Optional observability

```env
LOG_LEVEL=info
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

Sentry is optional. When absent, the application must still run with structured logs.

Never include OAuth tokens or authorization codes in telemetry.

---

## 8. Platform admin bootstrap

Codex may support optional seed-only variables:

```env
SEED_PLATFORM_ADMIN_EMAIL=
SEED_PLATFORM_ADMIN_PASSWORD=
SEED_DEMO_DATA=true
```

Do not use a default production password. Production seeding must require explicit values and must not rerun destructively.

---

## 9. Vercel environment separation

Configure separate values for:

- Development/local.
- Preview.
- Production.

Use separate Neon branches/databases and separate OAuth redirect handling where practical.

Never point a preview deployment at the production database by default.

After changing environment variables, redeploy the Vercel project.

---

## 10. Verification checklist

The application must provide a setup/health screen that checks:

- database connection;
- Payload secret loaded;
- Blob write/read test;
- Resend sender test;
- Google OAuth client configuration;
- Google Ads developer token presence;
- Google Ads accessible accounts;
- AdMob account/report test;
- Play Reporting app discovery;
- Play report bucket read test;
- cron authentication;
- selected job driver;
- latest successful sync.

The health screen must never reveal secret values.
