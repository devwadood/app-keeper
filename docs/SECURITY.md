# Security

- Payload Auth uses HttpOnly cookies, email verification, lockout, and bounded sessions.
- OAuth uses exact redirects, signed ten-minute state, PKCE, nonce, incremental scopes,
  offline access, and HttpOnly transient cookies.
- Refresh tokens use AES-256-GCM with a versioned 32-byte key. Ciphertext fields are
  hidden from API/Admin reads.
- Google adapters expose explicit read/report methods only. No mutation wrapper exists.
- Route boundaries validate tenant ownership, input, origin, and rate limits.
- CSP, frame denial, MIME sniffing protection, referrer and permissions policies apply.
- Private financial downloads are resolved only after tenant ownership and expiry checks.
- Structured logs recursively redact tokens, secrets, passwords, cookies, and auth data.

Rotate token keys by retaining old versions in the decrypt keyring, re-encrypting each
record with the new version, then removing the old key only after validation. A production
rate-limit adapter should use shared durable state; the included memory limiter is a
single-instance safety layer.
