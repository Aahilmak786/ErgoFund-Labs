# API reference

The HTTP API is documented in the repo: [docs/API.md](https://github.com/Aahilmak786/ErgoFund-Labs/blob/main/docs/API.md).

## Summary

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Liveness + DB check |
| GET | `/api/campaigns` | List campaigns with aggregates |
| GET | `/api/campaigns/:slug` | Single campaign |
| GET | `/api/analytics/summary` | Global totals |
| POST | `/api/referrals/validate` | Referral validation |

Rate limiting is configurable via `RATE_LIMIT_*` environment variables.
