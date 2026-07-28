# Troubleshooting

- Startup environment error: compare `.env.local` with `.env.example`.
- Database connection: use Neon pooled runtime URL, SSL, and verify branch/IP policy.
- OAuth state invalid: restart from Integrations; state and PKCE expire in ten minutes.
- Missing refresh token: revoke prior consent or reconnect only when a new grant is
  needed; AppLedger preserves an existing encrypted token when Google omits a new one.
- Play data delayed: inspect source date and bucket object generation; monthly exports
  are not real-time.
- Queue idle: confirm `JOB_DRIVER`, task `nextAttemptAt`, and consumer bearer secret.
