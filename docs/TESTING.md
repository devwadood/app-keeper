# Testing

Run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, then
`pnpm test:e2e`. Unit tests cover decimal money, zero denominators, currency grouping,
token encryption/rotation, OAuth state/PKCE, mapping confirmation, permissions,
idempotency, retry behavior, and tenant context.

Collection-backed integration tests require a disposable PostgreSQL database and must
never target production. E2E tests use local/mock integrations and do not contact live
Google APIs. CI runs every static/unit/build gate; install Playwright browsers before
local E2E with `pnpm exec playwright install chromium`.
