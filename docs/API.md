# API

Customer mutations require Payload authentication, active membership, same-origin
requests, Zod input, rate limits, and ownership validation.

- `GET /api/oauth/google/start`
- `GET /api/oauth/google/callback`
- `POST /api/integrations/:id/disconnect|sync`
- `GET /api/integrations/:id/health`
- `GET|POST /api/cron/dispatch` (cron bearer)
- `POST /api/jobs/consume` (worker bearer)
- `POST /api/imports/spreadsheet`
- `GET /api/exports/apps|finance`
- `GET /api/reports/:id/download`
- `GET /api/health`
- `POST /api/onboarding/organization`

Errors use `{ ok: false, error: { code, message } }`. Large future list endpoints must use
cursor pagination rather than unbounded offsets.
