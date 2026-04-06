# Development setup

## Prerequisites

- **Node.js 20** (matches CI)
- **npm**
- **PostgreSQL 16** (or use [Docker stack](Docker-stack) only)

## One-time configuration

From the repository root:

```bash
cp .env.example .env
```

Edit `.env` for your network and deployment targets. Never commit secrets.

## Install and build (matches CI)

```bash
npm --prefix packages/sdk install
npm --prefix packages/sdk run build

npm --prefix apps/backend install
npm --prefix apps/backend run lint
npm --prefix apps/backend run build

npm --prefix apps/frontend install
npm --prefix apps/frontend run check
npm --prefix apps/frontend run build
```

Root `package.json` provides shortcuts such as `npm run build` and `npm run dev:frontend` / `npm run dev:backend`.

## Backend with a local database

Apply the schema (see `apps/backend/db/init.sql`):

```bash
# Example: PostgreSQL listening on localhost, database `bene`, user/password from your env
set DATABASE_URL=postgresql://bene:bene@localhost:5432/bene   # Windows PowerShell: $env:DATABASE_URL="..."
npm --prefix apps/backend run dev
```

## Frontend API base URL

- **Development:** the frontend can call `/api` via Vite proxy when `PUBLIC_API_URL` is unset.
- **Production / Docker:** set `PUBLIC_API_URL` to the public API origin the browser can reach.
