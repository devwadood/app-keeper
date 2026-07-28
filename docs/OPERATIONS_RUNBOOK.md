# Operations runbook

Check `/api/health`, sync health, dead-letter tasks, integration errors, latest successful
source date, queue backlog, and repeated auth failures. Never paste tokens into logs or
tickets. For a source outage, preserve prior facts, mark freshness delayed/failed, retry
with backoff, and notify affected tenants. For suspected cross-tenant or token exposure,
disable affected credentials, preserve audit evidence, rotate secrets, and follow the
organization's incident policy.
