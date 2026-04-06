# API smoke tests and example output

With the **backend running** and the database migrated (Docker or local PostgreSQL), you can verify endpoints manually or with the bundled script.

## Script

```bash
node scripts/test-api.mjs http://127.0.0.1:8080
```

When all checks pass, the process prints `OK` and exits with code `0`.

## Example working output (shape)

Responses follow [docs/API.md](https://github.com/Aahilmak786/ErgoFund-Labs/blob/main/docs/API.md). Typical successful run:

**`GET /health`**

```json
{ "status": "ok", "service": "benefaction-backend" }
```

**`GET /api/campaigns`**

```json
{
  "campaigns": [
    {
      "id": "<uuid>",
      "slug": "solar-village",
      "title": "Solar Village Fund",
      "description": "...",
      "owner_address": "...",
      "goal_amount": "2000000000000",
      "goal_token": "APT",
      "deadline": "2026-06-30T00:00:00.000Z",
      "created_at": "...",
      "raisedByToken": { "apt-placeholder-token-id": "120000000000" },
      "uniqueContributors": 1
    }
  ]
}
```

**`GET /api/analytics/summary`**

```json
{
  "totalRaisedByToken": { "apt-placeholder-token-id": "120000000000" },
  "uniqueContributors": 1
}
```

Token keys are **token IDs** from the indexer or seed data; placeholder IDs appear when environment variables for real token IDs are not set (see SDK `token-registry`).

## Referral validation

`POST /api/referrals/validate` — see API doc for body and success/error shapes.
