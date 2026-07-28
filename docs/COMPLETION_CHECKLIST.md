# Production completion checklist

- [ ] Legal review replaces Privacy/Terms placeholders.
- [ ] Production Neon database and checked migration applied.
- [ ] Platform admin seeded with an explicit strong password, then password rotated.
- [ ] Google consent verification and least-privilege customer roles complete.
- [ ] Live queue publisher registered if `JOB_DRIVER=vercel-queues`.
- [ ] Private Blob access tested for uploads and downloads.
- [ ] Resend verified sender test succeeds.
- [ ] Cross-tenant integration suite passes against disposable Postgres.
- [ ] Playwright browsers installed and critical journeys pass.
- [ ] Backup, retention, deletion, incident, and key-rotation policies approved.
