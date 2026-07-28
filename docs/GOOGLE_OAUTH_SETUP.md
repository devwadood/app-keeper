# Google OAuth setup

Configure the consent screen, verified domain, privacy/terms URLs, client credentials, and
exact callbacks described in `ENVIRONMENT_SETUP.md`.

```mermaid
sequenceDiagram
  actor U as Organization member
  participant A as AppLedger
  participant G as Google
  U->>A: Choose Ads, AdMob, or Play
  A->>A: Bind tenant/user/services + PKCE to signed state
  A->>G: Incremental authorization request
  G->>A: Code + state
  A->>A: Verify state, cookie, expiry, PKCE
  A->>G: Exchange code
  A->>A: AES-GCM encrypt refresh token
  A-->>U: Queue discovery
```

Google OAuth connects reporting identities; it is not AppLedger login. Disconnect revokes
future sync and deletes stored token material while preserving historical data.
