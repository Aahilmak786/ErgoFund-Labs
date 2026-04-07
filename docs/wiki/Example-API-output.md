# Example API output

Captured from a healthy backend after seed data (IDs and amounts may differ).

## `GET /health`

```json
{
  "status": "ok",
  "service": "benefaction-backend"
}
```

## `GET /api/campaigns`

```json
{
  "campaigns": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "slug": "demo-solar",
      "title": "Demo Solar Campaign",
      "description": "Example campaign for local development.",
      "owner_address": "9eg...",
      "goal_amount": "2000000000000",
      "goal_token": "APT",
      "deadline": "2026-12-31T00:00:00.000Z",
      "created_at": "2026-04-01T12:00:00.000Z",
      "raisedByToken": {
        "apt-placeholder-token-id": "1000000000"
      },
      "uniqueContributors": 1
    }
  ]
}
```

## `GET /api/analytics/summary`

```json
{
  "totalRaisedByToken": {
    "apt-placeholder-token-id": "1000000000"
  },
  "uniqueContributors": 1
}
```

Token keys are **on-chain token IDs** (or placeholders from `.env` when unset). See `packages/sdk/src/token-registry.ts`.

## `POST /api/referrals/validate`

Request:

```json
{
  "code": "BENE-ERG-01",
  "referrerWallet": "9eg...",
  "referredWallet": "9fh..."
}
```

Success:

```json
{
  "ok": true,
  "referralId": "uuid"
}
```

Failure (example):

```json
{
  "ok": false,
  "reason": "Self-referral not allowed"
}
```
