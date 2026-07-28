# MASTER CODEX BUILD PROMPT

## AppLedger — Multi-Tenant Android App Revenue, Advertising and Profitability SaaS

> Copy this entire document into Codex as the primary build instruction. Codex must treat it as the project constitution and source of truth.

---

## 1. Your role

Act as a principal full-stack architect, senior product designer, security engineer, data engineer, and QA lead. Build a complete, production-ready SaaS application from an empty repository.

Do not build a demo-only dashboard, static prototype, or collection of disconnected pages. Build the complete working application, including authentication, multi-tenancy, Google integrations, scheduled synchronization, database persistence, financial calculations, exports, emails, tests, migrations, documentation, and deployment configuration.

Work autonomously. Do not stop after scaffolding. Continue until the acceptance criteria in this document are met.

When an external credential is unavailable, implement the complete integration behind a typed adapter, provide a realistic mock adapter for development, add clear setup instructions, and ensure the application becomes live simply by adding the documented environment variables and completing the documented Google account permissions.

---

## 2. Product name and objective

Use the working product name **AppLedger**. Centralize the product name so it can be changed using configuration.

AppLedger is a multi-tenant SaaS for Android application development agencies and publishers. It combines:

1. Google Play Console reporting and financial exports.
2. Google Ads campaign spend and performance.
3. Google AdMob advertising revenue and performance.
4. Manual operating expenses.
5. App-level, account-level, and organization-level profit reporting.

The main business question is:

> For each Android app, developer account, and organization, how much revenue was generated, how much was spent on promotion, and what was the resulting profit or loss for a selected date range?

The system must support many organizations. Each organization can connect multiple Google identities, multiple Google Play Console/developer accounts, multiple Google Ads customer or manager accounts, multiple AdMob publisher accounts, and hundreds of Android apps.

---

## 3. Existing manual workflow that must be replaced

The existing spreadsheet tracks monthly and annual figures. Its current model contains:

- Application name.
- Developer/account name.
- Google Ads campaign spend.
- AdMob revenue.
- In-app revenue.
- Combined revenue: `AdMob revenue + in-app revenue`.
- Outcome in money: `combined revenue - campaign spend`.
- Profit, loss, or break-even label.
- Developer-account totals.
- Whole-company totals.
- Profit percentage.
- Average per month and average per day.

The current sample includes developer/account groupings such as:

- WalrusTech.
- WingTech.
- HyperLumen.
- XentroLabs.

It includes apps such as Naat Ringtones, Islamic Ringtones, Ramadan Ringtones, Azaan Ringtones, Ertugrul Ringtones, Turkish Ringtones, Funny Ringtones, Islamic Wallpapers, Qibla Finder, Barcode Scanner, Animal Ringtones, Birds Ringtones, Notification Ringtones, Simple Calculator, Animal Wallpapers, Flash Light, Marla Calculator, Unit Converter, Device-Info, and Prayer Times.

The spreadsheet also contains an overall organization summary labelled WyndGo.

The new application must preserve this business meaning while correcting spreadsheet weaknesses:

- Never store profit/loss as a formatted text string.
- Store money as numeric values plus currency code.
- Compute profit state separately.
- Do not rely on row positions or hardcoded month sheet names.
- Do not omit months from yearly calculations.
- Do not use fragile text extraction formulas for averages.
- Support any number of accounts and apps.
- Keep source data, calculation basis, freshness, and sync history auditable.
- Allow historical backfills and recalculation.

---

## 4. Locked technology stack

Use this stack unless an official compatibility issue requires a narrowly justified adjustment:

### Application

- Next.js App Router.
- TypeScript with strict mode.
- React Server Components by default.
- Payload CMS integrated inside the same Next.js application and repository.
- Tailwind CSS.
- shadcn/ui primitives where useful.
- Lucide icons.
- Recharts for dashboard charts.
- TanStack Table for advanced data tables.
- React Hook Form and Zod for forms and validation.
- `pnpm` as package manager.

### Data and hosting

- Neon PostgreSQL.
- Payload PostgreSQL adapter.
- Vercel for deployment.
- Vercel Cron Jobs for scheduled dispatch.
- Vercel Queues for durable asynchronous sync work when available.
- A database-backed queue fallback behind the same interface, so local development and deployments without Vercel Queues still work.
- Vercel Blob for uploaded files, generated reports, organization logos, app icons cached by the product, and optional raw import archives.
- Resend for transactional emails.

### Quality

- Vitest for unit and integration tests.
- Playwright for end-to-end tests.
- ESLint and Prettier.
- GitHub Actions for CI.

Use the newest stable mutually compatible versions available at implementation time. Verify compatibility from official documentation, pin exact versions in `package.json`, and document why any package is intentionally not latest.

Do not add another database, Firebase, Supabase Auth, Clerk, Auth.js, Redis, S3, or a separate backend service unless explicitly required. Payload authentication is the product authentication system. Google OAuth is an external account-connection feature, not the SaaS login system.

---

## 5. High-level architecture

Use one deployable Next.js/Payload application with clear internal module boundaries:

```text
Browser
  |
  v
Next.js customer dashboard
  |
  +--> Payload authentication and access control
  |
  +--> Server actions / route handlers
  |
  +--> Domain services
         |
         +--> Neon PostgreSQL
         +--> Google OAuth token service
         +--> Google Play reporting import
         +--> Google Ads reporting service
         +--> AdMob reporting service
         +--> Financial calculation service
         +--> Vercel Blob
         +--> Resend
         +--> Queue dispatcher
                   |
                   +--> Vercel Queues production adapter
                   +--> PostgreSQL fallback adapter
```

Keep the customer-facing dashboard separate from Payload Admin.

- `/app` is the customer SaaS.
- `/admin` is Payload Admin and must be restricted to platform administrators by default.
- Organization owners and members manage their business through the custom dashboard, not the raw Payload Admin interface.

Use feature-oriented modules, not a flat folder full of helpers.

Suggested structure:

```text
src/
  app/
    (marketing)/
    (auth)/
    (dashboard)/
    api/
  collections/
  components/
    ui/
    charts/
    tables/
    forms/
    layout/
  features/
    organizations/
    members/
    integrations/
    google-play/
    google-ads/
    admob/
    apps/
    finance/
    expenses/
    reports/
    notifications/
    sync/
  lib/
    auth/
    db/
    encryption/
    env/
    errors/
    logging/
    money/
    pagination/
    permissions/
    rate-limit/
    tenant/
  payload.config.ts
  migrations/
  jobs/
  emails/
  tests/
docs/
```

No business calculations inside React components. No direct Google API calls from the browser.

---

## 6. Multi-tenant SaaS model

### 6.1 Core hierarchy

```text
Platform
  |
  +-- Organization A
  |     +-- Members
  |     +-- Google connections
  |     +-- Play Console profiles
  |     +-- Google Ads accounts
  |     +-- AdMob accounts
  |     +-- Apps
  |     +-- Campaigns
  |     +-- Revenue and spend
  |     +-- Expenses
  |     +-- Reports
  |
  +-- Organization B
        +-- Completely isolated data
```

A user may belong to multiple organizations through memberships. They must select an active organization. Never assume one permanent organization per user.

### 6.2 Roles

Implement organization-scoped roles:

- `owner`: complete organization control, billing-ready role, can delete organization.
- `admin`: manage members, integrations, apps, mappings, reports, and expenses.
- `finance`: view financial data, add expenses, generate/export reports.
- `analyst`: view analytics and generate reports, no integration/token management.
- `developer`: view app quality and app metrics, restricted financial access configurable by permission.
- `viewer`: read-only access to explicitly permitted modules.

Implement a permission matrix rather than scattered role comparisons.

Platform roles:

- `platform-admin`.
- `platform-support` with safe impersonation/audit design but no token visibility.

### 6.3 Isolation rules

Every tenant-owned collection must include a required `organization` relationship. Every unique constraint for tenant data must include organization identity where appropriate.

Never accept `organizationId` from the client as authorization. The server must derive the active organization from the authenticated session plus membership validation.

Create one mandatory helper:

```ts
requireTenantContext(request): {
  userId: string
  organizationId: string
  membershipId: string
  role: OrganizationRole
  permissions: Permission[]
}
```

All customer-facing server actions, route handlers, repositories, exports, and jobs must use this helper or an equivalent trusted job context.

Payload access control must apply organization filters to read, update, and delete. Creation hooks must inject the organization from trusted context and reject a mismatched client-supplied organization.

Add cross-tenant security tests for every major collection and API. A request authenticated as Organization A must never read, update, delete, export, or infer Organization B data.

For high-volume analytics queries, create tenant-aware repositories that require `organizationId` as a non-optional argument. Do not expose a repository method that queries all rows unless it is explicitly platform-admin-only.

PostgreSQL row-level security may be added only where it can be correctly enforced with the Payload connection lifecycle. Do not add decorative or broken RLS. The minimum required isolation is strict Payload access control, mandatory tenant repositories, compound constraints, and automated adversarial tests. If RLS is implemented for custom analytics tables, use a restricted runtime role, transaction-local tenant context, `FORCE ROW LEVEL SECURITY`, and documented migration/runtime connection separation.

---

## 7. Authentication and organization onboarding

Use Payload Auth for:

- Email/password signup and login.
- Secure HttpOnly cookies.
- Email verification.
- Forgot/reset password.
- Session invalidation.
- Login throttling and account lock protection.
- Optional TOTP-ready architecture, but do not delay MVP for MFA.

Use Resend for verification, invitation, password reset, and security emails.

First-run flow:

1. User signs up.
2. User verifies email.
3. User creates organization:
   - organization name;
   - slug;
   - base currency, default `USD` for the imported spreadsheet workflow;
   - timezone;
   - fiscal year start;
   - reporting day cutoff.
4. User optionally imports the provided spreadsheet as a one-time migration aid.
5. User connects Google integrations.
6. User maps discovered accounts/apps.
7. Initial backfill starts.
8. Dashboard shows sync progress and data freshness.

Invitation flow:

- Owner/admin invites by email and role.
- Invitation is organization-scoped, signed, expiring, and one-time-use.
- Existing users can accept into another organization.
- New users create an account then accept.
- All invitation events are audited.

---

## 8. Google integration architecture

### 8.1 Important separation

A Google connection represents one authorized Google identity and its encrypted OAuth tokens. It is not itself a Play Console account, Google Ads customer account, or AdMob publisher account.

One organization can have many Google connections. One Google connection may expose access to several Google products and multiple downstream accounts.

Model:

```text
Organization
  +-- GoogleConnection 1
  |     +-- PlayConsoleProfile A
  |     +-- GoogleAdsCustomer 123...
  |     +-- GoogleAdsCustomer 456...
  |     +-- AdMobPublisher pub-...
  |
  +-- GoogleConnection 2
        +-- PlayConsoleProfile B
        +-- GoogleAdsManager ...
        +-- AdMobPublisher ...
```

### 8.2 Incremental authorization

Do not request every Google permission during the first connection by default. Let the user choose:

- Connect Play reporting.
- Connect Google Ads.
- Connect AdMob.

Use incremental authorization and display a human-readable explanation before redirecting.

Required identity scopes:

```text
openid
email
profile
```

Product scopes:

```text
Google Ads:
https://www.googleapis.com/auth/adwords

AdMob reporting:
https://www.googleapis.com/auth/admob.report

AdMob account/inventory discovery when required:
https://www.googleapis.com/auth/admob.readonly

Google Play Developer Reporting:
https://www.googleapis.com/auth/playdeveloperreporting

Read-only access to Play Console report files in Google Cloud Storage:
https://www.googleapis.com/auth/devstorage.read_only
```

Do not request `cloud-platform`, storage write scopes, or Google Ads mutation-specific behaviour.

Do not request `androidpublisher` for the reporting-only MVP unless a defined feature cannot be implemented without it. That scope can authorize both read and write-capable Android Publisher operations subject to Play Console permissions. The product goal is analytics, not publishing, order management, subscription mutation, review replies, release changes, or app configuration changes.

If `androidpublisher` is added later, place it behind an explicit feature flag, separate consent screen explanation, restricted Play Console permissions, and a code-level allowlist of read-only methods.

### 8.3 Read-only protection

Google Ads uses one broad OAuth scope for API access. Read-only versus write access is controlled by the connected user's Google Ads account role, not a separate read-only OAuth scope. Therefore:

- Onboarding must instruct the organization to grant the connected Google identity `Read-only` access to the required Google Ads accounts.
- The application code must contain only GAQL search/report calls.
- Do not implement create, mutate, pause, enable, remove, bidding, budget, ad, asset, or campaign mutation services.
- Do not include generic mutation wrappers.
- Add a static test or lintable allowlist that rejects use of Google Ads mutation methods.
- Display the effective access guidance and a connection health warning if the account appears overprivileged where this can be determined.

For Play reporting:

- Instruct users to grant only global `View app information` and, when financial reports are required, global `View financial data`.
- Do not ask for release, store listing, user management, order management, or app-signing permissions.
- The app must never modify Play Console settings.

For AdMob:

- Use reporting and read-only account discovery only.
- Do not add campaign-management features.
- Make clear that AdMob estimated earnings can change before finalization.

### 8.4 OAuth security

Implement Authorization Code flow with:

- exact redirect URI matching;
- cryptographically random `state`;
- PKCE where supported;
- nonce for identity tokens;
- short-lived OAuth state stored server-side;
- organization, user, intended services, and return path bound into signed state;
- `access_type=offline`;
- consent prompting only when necessary to obtain a refresh token;
- secure handling when Google does not return a new refresh token;
- refresh token rotation/update support;
- token revocation on disconnect;
- no tokens in URLs, logs, analytics, browser storage, or client components.

Encrypt refresh tokens and any service-account JSON at application level using AES-256-GCM or an equivalent authenticated encryption scheme.

Use:

```text
TOKEN_ENCRYPTION_KEY
TOKEN_ENCRYPTION_KEY_VERSION
```

Store encryption version, IV/nonce, authentication tag, and ciphertext. Build a rotation-ready encryption service. Never store plaintext refresh tokens.

Google OAuth must remain separate from Payload login.

---

## 9. Discovering and configuring Google resources

### 9.1 Google Ads

After authorization:

1. Call the official accessible-customer listing endpoint.
2. Persist all accessible customer IDs as discovered records.
3. Fetch customer metadata and manager relationships.
4. Let the user select which customers to activate.
5. Support manager accounts using `login-customer-id`.
6. Keep one unique record per organization/customer ID.
7. Record currency code and timezone from the Ads customer.
8. Never assume all Ads accounts use the organization base currency.

Sync non-removed campaigns and daily metrics.

For Android App campaigns, query and persist:

- campaign ID;
- campaign name;
- status;
- channel type/subtype;
- `campaign.app_campaign_setting.app_id`;
- `campaign.app_campaign_setting.app_store`;
- daily cost micros;
- impressions;
- clicks;
- conversions;
- all conversions;
- conversion value where available;
- interaction rate;
- start/end dates.

The App Campaign `app_id` should normally match the Android package name and is the primary automatic mapping key.

### 9.2 AdMob

After authorization:

1. List accessible AdMob publisher accounts.
2. Let the user activate one or more.
3. Store publisher ID, display name, timezone, and reporting currency.
4. Discover apps/ad units when scope and API permit.
5. Generate daily network reports grouped by `DATE` and `APP`.
6. Add optional breakdowns by country, platform, ad unit, format, and mediation source without making the default sync unnecessarily large.

Persist metrics:

- estimated earnings in micros and normalized numeric value;
- ad requests;
- matched requests;
- impressions;
- clicks;
- impression CTR;
- impression RPM/eCPM;
- match rate;
- show rate;
- publisher currency.

### 9.3 Google Play Console/reporting

Use two complementary sources:

#### A. Play Developer Reporting API

Use it for:

- accessible app discovery;
- package identity;
- Android vitals;
- crash rate;
- ANR rate;
- error counts/issues;
- quality metrics available from the API.

#### B. Play Console private Google Cloud Storage reports

Use read-only Cloud Storage access for:

- statistics exports, including installs and other available app statistics;
- user acquisition exports where configured;
- estimated sales;
- earnings and finalized financial reports;
- subscriptions data available through exported reports.

Play exports are monthly CSV files that receive daily additions and may arrive with a delay. Build the importer so it:

- does not assume a file is updated at an exact time;
- lists expected prefixes safely;
- supports UTF-16 CSV input and converts/parses correctly;
- records source object name, generation/import timestamp, checksum/etag, month, and report type;
- re-imports changed source files idempotently;
- upserts transactions and daily aggregates using stable source keys;
- marks estimated data as preliminary;
- replaces or reconciles preliminary values when finalized earnings reports become available;
- supports manual backfill by date range.

Because one Google identity may access more than one Play developer account and API discovery may not expose a perfect developer-account grouping, build a Play Console profile configuration screen. Each profile contains:

- user-defined label;
- developer account ID when known;
- private report bucket ID/URI, such as the `pubsite_prod_rev_...` identifier;
- linked Google connection;
- enabled report types;
- selected apps;
- permission validation status;
- last successful import;
- timezone/currency metadata.

Validate that the authorized identity can list/read the configured bucket. Never allow arbitrary public bucket browsing; only accept and validate the expected Play report bucket format.

---

## 10. App identity and cross-source mapping

The canonical Android app identity is:

```text
organization_id + package_name
```

Package name is required and normalized to lowercase for matching while preserving original display.

An app may be linked to:

- one Play Console profile;
- one or more Google Ads campaigns;
- one or more AdMob app records;
- multiple historical account assignments if the app changes ownership;
- optional manual revenue/expense records.

Mapping priority:

### Google Ads campaign to app

1. Exact Android package match from `campaign.app_campaign_setting.app_id`.
2. Existing confirmed mapping.
3. Suggested fuzzy match from campaign name, clearly marked as unconfirmed.
4. Manual selection.

Never automatically finalize a fuzzy-name match.

### AdMob app to canonical app

1. Exact package name from AdMob app metadata where available.
2. Existing confirmed mapping.
3. Manual selection.

Use explicit mapping collections with:

- source type;
- source account;
- source external ID;
- app;
- mapping method: `exact-id`, `confirmed-auto`, `manual`, `fuzzy-suggestion`;
- confidence;
- confirmed by;
- confirmed at;
- valid from/to;
- audit history.

Allow many campaigns to one app. Do not assume one campaign per app.

Unmapped spend/revenue must remain visible in an “Unmapped data” reconciliation screen and must not silently disappear from organization totals. Organization totals should include unmapped source totals, while app-level totals should show only mapped data and disclose the difference.

---

## 11. Data model

Implement these Payload collections or equivalent strongly typed Postgres-backed entities. High-volume collections can be hidden from Payload Admin and queried through repositories.

### Identity and tenancy

1. `users`
2. `organizations`
3. `organization_memberships`
4. `organization_invitations`
5. `organization_settings`

### Integrations

6. `google_connections`
7. `google_connection_scopes`
8. `play_console_profiles`
9. `google_ads_accounts`
10. `admob_accounts`

### Product objects

11. `apps`
12. `google_ads_campaigns`
13. `admob_apps`
14. `admob_ad_units`
15. `campaign_app_mappings`
16. `admob_app_mappings`

### Analytics and finance

17. `google_ads_daily_stats`
18. `admob_daily_stats`
19. `play_daily_stats`
20. `play_financial_transactions`
21. `play_financial_daily_aggregates`
22. `app_daily_financials`
23. `account_daily_financials`
24. `organization_daily_financials`
25. `manual_expenses`
26. `expense_categories`
27. `expense_allocations`
28. `currency_rates` only if explicit conversion is enabled later; do not fabricate FX rates.

### Operations

29. `sync_runs`
30. `sync_tasks`
31. `sync_cursors`
32. `source_files`
33. `integration_errors`
34. `notifications`
35. `saved_reports`
36. `report_exports`
37. `audit_logs`
38. `media`

Use UUID IDs.

Every tenant collection requires `organization`.

Add appropriate compound unique constraints, including:

- `(organization, package_name)` for apps.
- `(organization, external_customer_id)` for Ads accounts.
- `(organization, publisher_id)` for AdMob accounts.
- `(organization, source_account, external_campaign_id)` for campaigns.
- `(organization, app, date, source_account)` or a more precise source-grain key for daily facts.
- Stable transaction/source keys for Play financial rows.
- `(organization, sync_source, source_object, checksum)` for imported report files where appropriate.

Create indexes for:

- organization and date;
- app and date;
- account and date;
- campaign and date;
- sync status and next attempt;
- mapping status;
- source external IDs.

Avoid JSON blobs for metrics that need filtering or aggregation. JSON may store raw source metadata in addition to normalized fields.

Use precise decimals or integer micros/minor units. Never use JavaScript floating-point arithmetic for persisted financial calculations.

Recommended money representation:

- source amounts: `numeric(24, 6)` plus ISO currency code;
- Google micros: preserve original `bigint` micros plus normalized decimal;
- calculated fields: `numeric(24, 6)`;
- UI formatting: locale-aware and currency-aware.

---

## 12. Financial definitions

Store source facts, then calculate deterministic derived facts.

For an app and date:

```text
admob_revenue
in_app_gross_sales
in_app_refunds
google_fees
taxes_or_adjustments
in_app_net_revenue
total_revenue
google_ads_spend
direct_manual_expenses
allocated_shared_expenses
marketing_profit
operating_profit
roas
roi
gross_margin
profit_status
```

Default formulas:

```text
total_revenue =
  admob_revenue + in_app_net_revenue + other_app_revenue

marketing_profit =
  total_revenue - google_ads_spend

operating_profit =
  total_revenue
  - google_ads_spend
  - direct_manual_expenses
  - allocated_shared_expenses

roas =
  total_revenue / google_ads_spend

roi =
  marketing_profit / google_ads_spend

gross_margin =
  operating_profit / total_revenue
```

Rules:

- When denominator is zero, return `null`, not infinity.
- `profit_status` is `profit`, `loss`, or `break-even`, based on a small configurable decimal tolerance.
- Preserve both preliminary and finalized financial states.
- Never overwrite raw source facts with calculated data.
- Recalculation must be idempotent and versioned by calculation definition.
- Show formula tooltips in the UI.
- Distinguish ROAS from ROI and margin. Do not label them all as “profit percentage.”
- Account and organization totals must aggregate underlying numeric facts, not sum previously rounded percentages.
- Average per day uses the number of calendar days represented by the selected range.
- Average per active day can be shown separately.
- Average per month uses exact partial-month weighting only when clearly labelled; otherwise calculate monthly grouped averages.
- Use source currency by default. If multiple currencies exist, do not sum them into one misleading total. Group by currency or require an explicit, dated FX conversion module.

Create a finance setting allowing the organization to choose:

- in-app revenue basis: estimated sales or finalized earnings;
- whether AdMob estimated earnings are included in preliminary profit;
- expense allocation strategy;
- reporting currency behaviour.

---

## 13. Expense and balance-sheet-style module

The spreadsheet currently focuses on contribution/profit, not a formal accounting balance sheet. Name the main report **Profit & Loss / App Profitability**, not “Balance Sheet,” unless true assets, liabilities, and equity are implemented later.

Manual expenses support:

- date;
- vendor/payee;
- description;
- category;
- amount;
- currency;
- tax amount;
- recurring flag;
- receipt upload to Vercel Blob;
- app-specific, developer-account-specific, or organization-wide scope;
- allocation method;
- notes;
- creator and audit history.

Allocation methods:

- direct to one app;
- fixed percentage across selected apps;
- proportional to revenue;
- proportional to ad spend;
- equal allocation;
- excluded from app P&L but included in organization P&L.

Build category defaults:

- salaries;
- contractor costs;
- software subscriptions;
- office rent;
- internet;
- legal/accounting;
- taxes;
- marketing other than Google Ads;
- hosting;
- miscellaneous.

Do not implement double-entry accounting in MVP. Architect the module so a future accounting ledger can be added.

---

## 14. Synchronization and background jobs

Do not perform a full multi-account sync inside a user request.

### 14.1 Dispatch

Use Vercel Cron to dispatch scheduled work:

- daily full prior-day sync;
- frequent lightweight connection health checks;
- periodic re-import of current-month Play report files;
- nightly financial recalculation;
- weekly summary email generation;
- cleanup of expired OAuth state and old temporary exports.

The cron route must authenticate using `CRON_SECRET` and reject ordinary public requests.

### 14.2 Queue abstraction

Create:

```ts
interface JobDispatcher {
  publish<T>(topic: JobTopic, payload: T, options: JobOptions): Promise<JobReceipt>
}
```

Implement:

1. `VercelQueuesJobDispatcher`.
2. `PostgresJobDispatcher` fallback.

Use idempotency keys.

Example job topics:

- `integration.discover`.
- `google-ads.sync-account-day`.
- `admob.sync-account-day`.
- `play.sync-vitals`.
- `play.scan-report-bucket`.
- `play.import-report-file`.
- `finance.recalculate-app-day`.
- `report.generate`.
- `email.weekly-summary`.

Break large syncs into small account/date/app chunks.

### 14.3 Job reliability

Implement:

- at-least-once safe processing;
- idempotent upserts;
- exponential backoff with jitter;
- retryable versus permanent error classification;
- maximum attempts;
- dead-letter/permanent failure status;
- concurrency limits per Google connection/account;
- quota-aware throttling;
- cursor/checkpoint persistence;
- cancellation on integration disconnect;
- distributed lock or unique in-progress constraint;
- correlation ID;
- structured logs;
- user-visible sync progress.

A failed connection must not stop other connections or organizations.

### 14.4 Freshness

Every dashboard dataset must expose:

- source;
- last source date;
- last successful sync;
- data state: `live`, `preliminary`, `finalized`, `delayed`, `failed`, `not-connected`;
- expected source delay;
- next scheduled sync.

Do not present stale data as current.

---

## 15. Spreadsheet import and migration

Create a one-time Excel import assistant compatible with the provided workbook pattern.

The importer should:

1. Accept `.xlsx` via secure upload.
2. Store the original in a private Vercel Blob location.
3. Parse monthly sheets and annual sheet only as a reference.
4. Prefer monthly source rows over annual formulas.
5. Detect columns using aliases:
   - Application;
   - Account;
   - Campaign/Compaign;
   - AdMob;
   - inApp;
   - Revenue;
   - Outcome.
6. Create or suggest developer accounts and apps.
7. Import campaign spend, AdMob revenue, and in-app revenue as manual historical facts.
8. Ignore spreadsheet-calculated text outcomes and recalculate using the product’s numeric engine.
9. Validate duplicate months, missing months, invalid values, and currencies.
10. Preview all changes before commit.
11. Produce an import report with accepted rows, warnings, errors, and skipped rows.
12. Keep source cell/sheet provenance for audit.
13. Never trust workbook formulas or macros.
14. Prevent formula injection in exported CSV/Excel.

Seed development/demo data using the current spreadsheet’s account and app names, but do not include private OAuth credentials.

---

## 16. Customer-facing pages

### Public/marketing

- Landing page.
- Features.
- Security.
- Pricing placeholder with configuration, no fake checkout.
- Documentation/help link.
- Login.
- Signup.
- Privacy and terms placeholders clearly marked for legal review.

### Authenticated application

- `/app/onboarding`
- `/app/overview`
- `/app/apps`
- `/app/apps/[appId]`
- `/app/accounts/play`
- `/app/accounts/google-ads`
- `/app/accounts/admob`
- `/app/campaigns`
- `/app/mappings`
- `/app/finance`
- `/app/expenses`
- `/app/reports`
- `/app/imports`
- `/app/integrations`
- `/app/sync-health`
- `/app/notifications`
- `/app/settings/organization`
- `/app/settings/members`
- `/app/settings/security`
- `/app/settings/data`

### Platform administration

- `/admin` restricted Payload Admin.
- Platform overview.
- Organizations.
- Users.
- Integration health without revealing secrets.
- Failed jobs.
- Audit logs.
- Feature flags.

---

## 17. Dashboard requirements

### 17.1 Organization overview

KPI cards:

- total revenue;
- AdMob revenue;
- in-app net revenue;
- Google Ads spend;
- marketing profit;
- operating profit;
- ROAS;
- active apps;
- connected accounts;
- unmapped spend/revenue;
- data freshness.

Charts:

- revenue versus ad spend over time;
- profit trend;
- revenue source mix;
- top apps by profit;
- top apps by revenue;
- apps with negative contribution;
- account comparison;
- preliminary versus finalized values.

Filters:

- date range;
- timezone;
- currency;
- developer/Play profile;
- Ads account;
- AdMob account;
- app;
- data status;
- mapped/unmapped.

### 17.2 App detail

Header:

- icon;
- app name;
- package name;
- developer account;
- mapping/connection health;
- last sync;
- date range.

Tabs:

- Overview.
- Revenue.
- Acquisition.
- AdMob.
- In-app.
- Quality.
- Campaigns.
- Expenses.
- Source data.
- Audit history.

Metrics:

- total revenue;
- AdMob revenue;
- in-app revenue;
- Ads spend;
- marketing profit;
- operating profit;
- ROAS;
- paid installs where available;
- total installs from Play reports;
- CPI;
- impressions;
- clicks;
- CTR;
- AdMob impressions;
- AdMob eCPM/RPM;
- match rate;
- crash rate;
- ANR rate.

### 17.3 Account summaries

Recreate and improve the right-hand account summary from the spreadsheet:

- organization total;
- each Play/developer account total;
- each Ads account total;
- each AdMob account total;
- revenue;
- spend;
- profit/loss;
- ROI;
- average per month;
- average per day;
- app count;
- freshness.

Allow drill-down.

### 17.4 Reconciliation

Provide screens for:

- unmapped campaigns;
- unmapped AdMob apps;
- apps not found in one or more sources;
- source totals versus mapped totals;
- preliminary versus final revenue differences;
- currency mismatches;
- duplicated source rows;
- sync gaps.

---

## 18. Professional UI and design system

The application must look like a premium B2B financial analytics product, not a generic admin template.

Use Stripe Dashboard, Linear, and Vercel as quality references only. Do not copy branding or layouts.

### Visual direction

- Calm, precise, trustworthy, data-first.
- Light and dark modes.
- Neutral zinc/slate base with one configurable accent.
- High contrast and WCAG-aware.
- Subtle borders and shadows.
- Minimal gradients; no excessive glassmorphism.
- Dense enough for professionals but not cramped.
- Typography with strong numeric legibility and tabular numbers.
- Consistent 4/8px spacing system.
- Responsive from mobile to large desktop.
- Full keyboard navigation.
- Visible focus states.
- Reduced-motion support.

### Layout

- Collapsible left sidebar.
- Top bar with organization switcher, global date range, command palette, sync indicator, notifications, and user menu.
- Persistent contextual filters on analytics pages.
- Page headers with clear title, description, primary action, and freshness state.
- Mobile navigation that remains usable for tables and filters.

### Components

Build reusable components:

- KPI card with comparison and sparkline.
- Money value with currency and preliminary/final badge.
- Profit badge.
- Freshness badge.
- Integration status card.
- Sync progress stepper.
- Empty state.
- Error state with retry.
- Data table with column visibility, sorting, filtering, pagination, export, sticky headers, and row actions.
- Date range picker.
- Account/app multi-select.
- Chart legend and tooltip with accessible text.
- Reconciliation banner.
- Audit timeline.
- Skeletons that match final layout.

### Chart quality

- Avoid rainbow charts.
- Use consistent semantic colours:
  - revenue;
  - spend;
  - profit;
  - loss;
  - neutral comparison.
- Never rely on colour alone.
- Tooltips must show exact date, amount, currency, and source state.
- Large ranges should aggregate intelligently.
- Tables must be available as an accessible alternative.

### UX details

- Optimistic UI only for safe local operations, not external sync completion.
- Never show fake success before a Google connection or sync is verified.
- Show progress for initial imports/backfills.
- Explain why data may be delayed.
- Preserve filters in URL search parameters.
- Save user filter presets.
- Use confirmation dialogs for destructive actions.
- Disconnecting an integration must preserve historical data by default and stop future sync.
- Provide an explicit separate purge flow for deletion.

---

## 19. API and server actions

Prefer server actions for authenticated UI mutations and route handlers for OAuth callbacks, cron, queues, exports, and integration endpoints.

Required route groups include:

```text
/api/oauth/google/start
/api/oauth/google/callback
/api/integrations/[id]/disconnect
/api/integrations/[id]/health
/api/integrations/[id]/sync
/api/cron/dispatch
/api/jobs/consume
/api/reports/[id]/download
/api/imports/spreadsheet
/api/exports/apps
/api/exports/finance
```

Rules:

- Validate every input with Zod.
- Require tenant context.
- Return typed error envelopes.
- Use cursor pagination for large datasets.
- Add rate limiting for auth, OAuth start, imports, exports, and manual sync.
- Prevent IDOR by validating tenant ownership after lookup.
- Do not expose raw Payload local API operations directly to untrusted client code.
- Do not expose token fields through REST or GraphQL.
- Disable GraphQL if not needed.
- Limit Payload depth and query complexity.
- Add security headers.

---

## 20. Reporting and exports

Reports:

- Daily app profitability.
- Monthly app profitability.
- Developer-account summary.
- Organization P&L.
- Revenue source report.
- Google Ads campaign report.
- AdMob performance report.
- Expense report.
- Data reconciliation report.
- Sync health report.

Exports:

- CSV.
- XLSX.
- PDF.

For XLSX, create a professional workbook with:

- Overview.
- App detail.
- Account summary.
- Source reconciliation.
- Parameters and generated timestamp.

Generate exports asynchronously. Store in private Vercel Blob with expiration metadata and authorized download routes. Never expose a predictable public URL for financial reports.

Emails:

- Report ready.
- Weekly organization summary.
- Sync failed.
- Reauthorization required.
- Unmapped data detected.
- Significant spend/revenue anomaly using deterministic thresholds, not unverified AI.

---

## 21. Resend email requirements

Create branded responsive email templates for:

- email verification;
- password reset;
- organization invitation;
- connection failure;
- reauthorization required;
- weekly performance summary;
- generated report ready.

Use plain-text alternatives.

Centralize sender name and address. Do not hardcode a personal email.

Add development behaviour:

- log email preview safely when `EMAIL_MODE=console`;
- use Resend when `EMAIL_MODE=resend`;
- never print reset/invitation tokens in production logs.

---

## 22. Vercel Blob requirements

Use Vercel Blob for:

- organization logos;
- expense receipts;
- spreadsheet imports;
- generated CSV/XLSX/PDF exports;
- optional cached app icons;
- optional raw source report archive.

Use private access for financial/source documents.

Store file metadata in Postgres:

- organization;
- blob pathname;
- content type;
- size;
- checksum;
- original filename;
- category;
- uploader;
- created at;
- retention/expiry;
- associated record.

Validate MIME type, extension, and size. Sanitize filenames. Do not execute uploaded content.

---

## 23. Security requirements

Non-negotiable:

- strict multi-tenant authorization;
- encrypted OAuth refresh tokens;
- no secrets in client bundles;
- no Google mutation operations;
- CSRF protection for cookie-authenticated mutations;
- OAuth state and PKCE;
- secure cookies in production;
- rate limiting;
- input validation;
- output encoding;
- CSP and security headers;
- SQL injection prevention through parameterized APIs;
- no raw SQL interpolation;
- SSRF protections for any fetched icon/URL;
- file upload validation;
- logs with token/PII redaction;
- audit logs;
- dependency vulnerability checks;
- least-privilege external account instructions;
- no sensitive data in error messages;
- no cross-tenant cache keys;
- cache tags include organization ID;
- signed/authorized report downloads;
- soft-delete or archival behaviour for business records;
- explicit data export and deletion flows.

Audit events:

- login/security events;
- organization changes;
- member invitations and role changes;
- Google connection added/removed/reauthorized;
- account activation;
- mapping changes;
- manual financial changes;
- report exports;
- import operations;
- data purge requests.

Never expose encrypted token ciphertext through the API or Admin UI.

---

## 24. Environment configuration

Create:

- `.env.example` with safe placeholders.
- `docs/ENVIRONMENT_SETUP.md` with exact setup steps.
- `src/lib/env/server.ts` with Zod validation.
- `src/lib/env/client.ts` containing only explicitly public variables.
- startup failure with a clear message when a required production variable is missing.

Expected variables:

```env
# Public application
NEXT_PUBLIC_APP_NAME=AppLedger
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Application
NODE_ENV=development
APP_URL=http://localhost:3000
PAYLOAD_SECRET=
CRON_SECRET=
TOKEN_ENCRYPTION_KEY=
TOKEN_ENCRYPTION_KEY_VERSION=v1

# Neon / Payload
DATABASE_URL=
DATABASE_URL_UNPOOLED=
MIGRATION_DATABASE_URL=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/api/oauth/google/callback
GOOGLE_ADS_DEVELOPER_TOKEN=
GOOGLE_ADS_API_VERSION=
GOOGLE_OAUTH_SCOPES_BASE=openid email profile

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=
RESEND_FROM_NAME=AppLedger
EMAIL_MODE=console

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Vercel / jobs
VERCEL_ENV=
VERCEL_URL=
JOB_DRIVER=database
VERCEL_QUEUE_REGION=
VERCEL_QUEUE_TOPIC_PREFIX=appledger
CRON_TIMEZONE=UTC

# Security and observability
LOG_LEVEL=info
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SUPPORT_EMAIL=
```

Do not require users to paste Google refresh tokens into environment variables. Refresh tokens are created by OAuth and encrypted in the database.

Document:

- local values;
- Vercel preview values;
- Vercel production values;
- redirect URI differences;
- how to create a Neon project and obtain pooled/unpooled URLs;
- how to create Payload secret;
- how to generate a 32-byte encryption key;
- how to create Google Cloud OAuth credentials;
- which APIs to enable;
- OAuth consent screen and verification;
- how to obtain a Google Ads developer token;
- how users grant read-only Ads access;
- how users grant Play report permissions and find the report bucket URI;
- how to enable AdMob API;
- how to create Resend API key and verify sender domain;
- how to connect Vercel Blob;
- how to configure Vercel Cron;
- how to enable Vercel Queues or choose database fallback;
- how to verify each integration with a built-in connection test.

Never include real secrets in committed files.

---

## 25. Database migrations and seed data

Use checked-in migrations. Do not use destructive schema push in production.

Provide commands:

```text
pnpm db:migrate
pnpm db:migrate:create
pnpm db:seed
pnpm db:reset:local
```

Seed:

- platform admin from optional environment variables;
- demo organization;
- demo memberships;
- sample developer accounts;
- sample apps matching the spreadsheet;
- 90 days of realistic demo Ads, AdMob, in-app revenue, expenses, and quality metrics;
- mapped and unmapped examples;
- sync health examples.

Demo data must be deterministic and clearly marked.

---

## 26. Testing

### Unit tests

- money arithmetic;
- profit/ROAS/ROI/margin;
- zero denominators;
- currency grouping;
- OAuth state;
- encryption/decryption and rotation;
- campaign mapping;
- CSV UTF-16 parser;
- idempotency key generation;
- retry classification;
- permission matrix.

### Integration tests

- Payload collection access control;
- cross-tenant reads/writes blocked;
- invitation acceptance;
- Google connection persistence using mocks;
- daily stat upserts;
- recalculation;
- expense allocation;
- import reconciliation;
- report export authorization.

### E2E tests

- signup and organization creation;
- invite member;
- switch organization;
- connect mocked Google account;
- discover/select accounts;
- map campaign to app;
- initial sync progress;
- dashboard filters;
- add expense;
- generate report;
- disconnect integration;
- verify Organization A cannot access Organization B URL/ID.

Use test factories. Do not make tests depend on live Google APIs.

Target meaningful coverage, not vanity coverage. CI must fail on lint, type, unit, integration, or critical E2E failures.

---

## 27. Observability and operations

Implement structured JSON logging with:

- timestamp;
- level;
- event;
- request ID;
- correlation ID;
- organization ID;
- integration/account ID;
- sync run/task ID;
- duration;
- error class;
- retryable flag.

Never log tokens, authorization codes, raw service credentials, or complete financial report rows.

Add:

- health route;
- database connectivity check;
- integration health checks;
- queue health;
- sync dashboard;
- Sentry-ready error integration controlled by env;
- alert email for repeated failures;
- audit retention setting;
- job cleanup.

---

## 28. Performance

- Use server components for initial analytics rendering.
- Aggregate in SQL, not in browser JavaScript.
- Add daily aggregate tables/materialized summaries as specified.
- Recalculate only affected app/date ranges.
- Use cache cautiously; every key/tag must include organization and filters.
- Paginate source and audit data.
- Lazy-load heavy charts.
- Avoid N+1 queries.
- Use Neon pooled connections at runtime and unpooled/admin connection for migrations where recommended.
- Limit report export size and use asynchronous generation.
- Use indexes verified by query plans for main dashboard queries.
- Include a basic load-test script for dashboard and sync endpoints.

---

## 29. Accessibility and localization

- WCAG 2.1 AA target.
- Semantic headings and landmarks.
- Full keyboard support.
- Screen-reader labels.
- Accessible chart summaries.
- Do not use colour as the only status indicator.
- Locale-aware dates and numbers.
- Organization timezone for reports.
- ISO currency codes.
- English UI for MVP, but all customer strings must be centralized for future i18n.
- Preserve the spreadsheet’s USD values; do not silently convert them.

---

## 30. Documentation to generate

Create:

```text
README.md
docs/
  PRODUCT_REQUIREMENTS.md
  ARCHITECTURE.md
  DATA_MODEL.md
  MULTI_TENANCY.md
  SECURITY.md
  GOOGLE_OAUTH_SETUP.md
  GOOGLE_PLAY_SETUP.md
  GOOGLE_ADS_SETUP.md
  ADMOB_SETUP.md
  ENVIRONMENT_SETUP.md
  DEPLOYMENT_VERCEL.md
  BACKGROUND_JOBS.md
  SPREADSHEET_IMPORT.md
  FINANCIAL_DEFINITIONS.md
  TESTING.md
  TROUBLESHOOTING.md
  OPERATIONS_RUNBOOK.md
  API.md
```

Each integration setup document must explain both administrator setup and customer onboarding permissions.

Include Mermaid diagrams for architecture, OAuth, data sync, and entity relationships.

---

## 31. Implementation sequence

Implement in this order and keep the application runnable after every phase:

1. Scaffold compatible Next.js, Payload, Tailwind, Neon setup.
2. Environment validation and core layout/design system.
3. Payload auth.
4. Organizations, memberships, invitations, active organization.
5. Tenant access controls and adversarial tests.
6. Core account/app/campaign data model.
7. Dashboard with deterministic demo data.
8. Encryption and Google OAuth connection framework.
9. Google Ads adapter, discovery, reporting, and mapping.
10. AdMob adapter and reporting.
11. Play reporting/app discovery.
12. Play Cloud Storage report importer.
13. Queue/cron infrastructure.
14. Financial calculation engine and aggregate tables.
15. Expense allocation.
16. Reconciliation screens.
17. Spreadsheet import.
18. Reports and Blob exports.
19. Resend emails.
20. Observability, security hardening, performance.
21. Full test suite and documentation.
22. Vercel deployment configuration and production checklist.

Commit in logical stages if Codex has Git access.

---

## 32. Definition of done

The project is done only when:

- It installs with `pnpm install`.
- `.env.example` is complete.
- Local development starts with documented commands.
- Migrations run on a blank Neon/Postgres database.
- A user can sign up, verify email in configured mode, create an organization, and invite members.
- Multiple organizations are isolated.
- One organization can connect multiple Google identities.
- Multiple Play profiles, Ads accounts, and AdMob accounts can be activated.
- Apps are canonicalized by package name.
- App campaigns map automatically through app ID and manually as fallback.
- Daily Ads spend, AdMob revenue, Play stats, and Play financial reports persist idempotently using mock fixtures and live adapters when credentials exist.
- Preliminary/final data and freshness are visible.
- App, account, and organization profitability calculates correctly.
- Manual expenses and allocation work.
- The current spreadsheet can be imported.
- Reports export to CSV, XLSX, and PDF.
- Financial files are access-controlled.
- Cron dispatch and queued/fallback jobs work.
- Failed jobs retry without duplicating data.
- Email templates work in console and Resend modes.
- UI is polished in desktop and mobile, light and dark modes.
- Lint, typecheck, tests, and production build pass.
- No secret or OAuth token is exposed.
- No Google Ads or Play mutation operations exist.
- Setup documentation allows a developer to deploy by adding environment variables and completing external console permissions.

---

## 33. Rules for Codex while building

1. Do not replace the requested stack with a different service.
2. Do not stop at mock UI.
3. Do not hardcode organization IDs, app IDs, account IDs, currencies, dates, or spreadsheet row positions.
4. Do not put secrets in public environment variables.
5. Do not expose OAuth tokens.
6. Do not add Google mutation methods.
7. Do not skip access-control tests.
8. Do not store formatted money strings.
9. Do not calculate financial values with unsafe floating-point logic.
10. Do not hide source delays or unmapped data.
11. Do not silently swallow API errors.
12. Do not claim live integration success when using mocks.
13. Do not use `any` to bypass TypeScript design problems.
14. Do not create oversized client components for server-owned data.
15. Do not use one giant service or one giant collection file.
16. Do not generate placeholder lorem ipsum in final customer UI.
17. Do not leave critical TODOs except where an external credential, legal text, or business policy is genuinely required.
18. When ambiguous, choose the safest maintainable implementation and document the decision.
19. Before finishing, run format, lint, typecheck, tests, migrations against a test DB, and production build.
20. Produce a final implementation report listing completed modules, commands, required external setup, test results, and any honest limitations.

Begin by creating the repository plan and compatibility matrix, then implement the application phase by phase. Do not merely repeat this specification back to me.
