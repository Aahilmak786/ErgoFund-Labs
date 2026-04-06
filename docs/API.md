# BenefactionPlatform-Ergo — HTTP API

Base URL: `PUBLIC_API_URL` (e.g. `http://localhost:8080` in development).

## Health

### `GET /health`

Returns `200` when the API process and database connection are healthy.

**Response**

```json
{ "status": "ok", "service": "benefaction-backend" }
```

## Campaigns

### `GET /api/campaigns`

List campaigns with aggregated raised amounts per token and unique contributor counts.

**Response**

```json
{
  "campaigns": [
    {
      "id": "uuid",
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

### `GET /api/campaigns/:slug`

Fetch a single campaign by slug. **404** if not found.

## Analytics

### `GET /api/analytics/summary`

Global totals across all indexed contributions.

**Response**

```json
{
  "totalRaisedByToken": { "apt-placeholder-token-id": "120000000000" },
  "uniqueContributors": 1
}
```

## Referrals

### `POST /api/referrals/validate`

Validates referral usage with anti-abuse rules (self-referral block, code ownership, rate limits).

**Body**

```json
{
  "code": "BENE-ERG-01",
  "referrerWallet": "9eg...",
  "referredWallet": "9fh..."
}
```

**200** — `{ "ok": true, "referralId": "uuid" }`  
**400** — `{ "ok": false, "reason": "..." }`

## Rate limiting

Default: **120** requests per **60s** per IP (configurable via `RATE_LIMIT_*` env vars).
