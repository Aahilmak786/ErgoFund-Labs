# Development setup

## Prerequisites

- Node.js **20** (see `.nvmrc`)
- PostgreSQL **16** (local or Docker)

## 1. Environment

```bash
cp .env.example .env
```

Set `DATABASE_URL` for the backend (e.g. `postgresql://bene:bene@localhost:5432/bene`).

## 2. Database

```bash
psql -U bene -d bene -f apps/backend/db/init.sql
psql -U bene -d bene -f apps/backend/db/02-seed.sql
```

Or use `npm run docker:up` and rely on Compose init scripts.

## 3. Run services

**Terminal A — backend**

```bash
npm --prefix apps/backend install
npm --prefix apps/backend run dev
```

**Terminal B — frontend**

```bash
npm --prefix packages/sdk install && npm --prefix packages/sdk run build
npm --prefix apps/frontend install
npm --prefix apps/frontend run dev
```

The Vite dev server proxies `/api` and `/health` to `http://127.0.0.1:8080`.

## 4. Verify

- Open `http://localhost:5173`
- `curl http://localhost:8080/health`

## 5. API smoke script

With the backend running:

```bash
node scripts/test-api.mjs http://127.0.0.1:8080
```

Expected: JSON for `health`, `campaigns`, and `summary`, ending with `OK`.
