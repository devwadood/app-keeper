# AppLedger

AppLedger is a multi-tenant Android app profitability SaaS. It combines Google Play
reporting, Google Ads spend, AdMob revenue, and allocated operating expenses in one
auditable ledger.

## Quick start

Requirements: Node.js 20.9+ (24 recommended), pnpm 9, and PostgreSQL/Neon.

```bash
cp .env.example .env.local
pnpm install
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Open `http://localhost:3000` for marketing, `/app/overview` for the customer workspace,
and `/admin` for platform administration. The dashboard contains deterministic preview
data before a database is seeded; integrations clearly distinguish mock and live modes.

## Commands

| Command                        | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| `pnpm dev`                     | Next.js/Payload development server        |
| `pnpm build`                   | Production build                          |
| `pnpm lint` / `pnpm typecheck` | Static quality gates                      |
| `pnpm test`                    | Unit and security tests                   |
| `pnpm test:e2e`                | Playwright critical journeys              |
| `pnpm db:migrate`              | Apply checked migrations                  |
| `pnpm db:migrate:create`       | Generate a migration after schema changes |
| `pnpm db:seed`                 | Seed deterministic demo data              |
| `pnpm jobs:work`               | Show local database worker instructions   |

## Architecture

The application is one deployable Next.js 16.2/Payload 3.86 service. Payload Auth owns
login and sessions; Google OAuth connects external reporting identities. Tenant-owned
records are filtered and stamped through shared access/hook functions. Google clients
expose reporting calls only. Financial calculations use `decimal.js`, never binary
floating point.

Start with [environment setup](docs/ENVIRONMENT_SETUP.md),
[architecture](docs/ARCHITECTURE.md), [security](docs/SECURITY.md), and
[testing](docs/TESTING.md).

## External setup

Live integrations require Neon, Google Cloud OAuth/API credentials, a Google Ads
developer token, Resend, and Vercel Blob. The app remains usable with mock Google
adapters and console email until those credentials are added. Never commit `.env*`,
OAuth tokens, source exports, or financial reports.
