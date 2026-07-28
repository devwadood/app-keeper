# Multi-tenancy

`requireTenantFromRequest` authenticates through Payload, resolves the user's active
organization, and independently validates an active membership. UI-supplied organization
IDs never authorize access.

Payload `tenantAccess` applies an organization filter to reads, updates, and deletes.
`injectTenant` stamps creates from trusted context and rejects mismatches. Local API jobs
must pass a non-optional organization and use explicit `overrideAccess` only after trusted
job validation. Unique constraints and cache/report identifiers include the tenant.
Platform support cannot see token fields; only platform administrators receive global
admin access.

Adversarial tests cover active-organization membership and tenant derivation. Add
collection-backed integration tests against a disposable PostgreSQL database whenever a
new tenant collection or route is introduced.
