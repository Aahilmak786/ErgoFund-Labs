# Project layout

| Path | Role |
| --- | --- |
| `apps/frontend` | SvelteKit (Vite, TypeScript), wallet stores, campaign/analytics/referral pages |
| `apps/backend` | HTTP API, PostgreSQL repositories, `/health`, rate limiting |
| `packages/sdk` | Fleet wallet connectors, token registry, validation helpers, transaction queue |
| `contracts/` | ErgoScript sources (`BeneFundraising.ergo`, `ReferralReward.ergo`) |
| `infra/` | `docker-compose.yml`, Dockerfiles |
| `docs/` | API reference and GitHub Wiki source (`docs/github-wiki/`) |
| `scripts/` | e.g. `test-api.mjs` smoke test |

Monorepo scripts are defined in the root `package.json`.
