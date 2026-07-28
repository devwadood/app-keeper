# Data model

The Payload configuration declares all 38 required entities. UUIDs are used throughout.
Every tenant collection has a required indexed `organization` relationship. Key compound
constraints cover canonical package names, Google customer/publisher IDs, campaigns, and
daily source grains.

```mermaid
erDiagram
  USER ||--o{ MEMBERSHIP : belongs
  ORGANIZATION ||--o{ MEMBERSHIP : has
  ORGANIZATION ||--o{ GOOGLE_CONNECTION : owns
  GOOGLE_CONNECTION ||--o{ ADS_ACCOUNT : discovers
  GOOGLE_CONNECTION ||--o{ ADMOB_ACCOUNT : discovers
  GOOGLE_CONNECTION ||--o{ PLAY_PROFILE : configures
  ORGANIZATION ||--o{ APP : owns
  APP ||--o{ DAILY_FINANCIAL : aggregates
  ADS_ACCOUNT ||--o{ CAMPAIGN : has
  CAMPAIGN }o--|| APP : maps
  APP ||--o{ EXPENSE_ALLOCATION : receives
```

Money stores a numeric value and ISO currency. Micros are retained at source grain.
Source metadata is supplementary JSON; filterable metrics have typed columns.
