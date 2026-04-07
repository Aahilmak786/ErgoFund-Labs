# Deployment

The **application stack does not change** across hosts: **SvelteKit + Vite + TypeScript** (frontend), **Node + Express + PostgreSQL** (API), **ErgoScript + Fleet SDK** (on-chain). Only **hosting adapters** and **env vars** differ.

## Docker Compose (full stack)

From the repository root:

```bash
docker compose -f infra/docker-compose.yml up --build
```

- **API:** `http://localhost:8080` — `GET /health` must return `200`.
- **Frontend:** `http://localhost:3000` — set `PUBLIC_API_URL` in production so the browser reaches your public API (see `.env.example`).

Schema: `apps/backend/db/init.sql` · seed: `apps/backend/db/02-seed.sql`.

## Vercel (frontend)

1. Import [ErgoFund-Labs](https://github.com/Aahilmak786/ErgoFund-Labs) on [Vercel](https://vercel.com).
2. Leave the **project root** at the **repository root** (where `vercel.json` lives).
3. Vercel sets `VERCEL=1` during build → **@sveltejs/adapter-vercel** runs (Linux builders; symlink-friendly).
4. In the Vercel dashboard, set **`PUBLIC_API_URL`** to your deployed API URL (e.g. Render/Railway).
5. On the API, set **`CORS_ORIGIN`** to your Vercel site origin (or `*` for demos only).

## Netlify (frontend)

1. Create a site from the same GitHub repo.
2. Netlify reads **`netlify.toml`** at the repo root; `NETLIFY=true` selects **@sveltejs/adapter-netlify**.
3. Set **`PUBLIC_API_URL`** in Netlify environment variables.
4. Align API **CORS** with your Netlify URL.

## Render (API + Postgres)

1. Add a **PostgreSQL** database and a **Web Service** using [`render.yaml`](https://github.com/Aahilmak786/ErgoFund-Labs/blob/main/render.yaml) (Blueprint) or manually:
   - **Root directory:** `apps/backend`
   - **Build:** `npm ci && npm run build`
   - **Start:** `npm run start`
   - **Health check:** `/health`
2. Set **`DATABASE_URL`** to the Render Postgres connection string.

## Railway (API)

1. New project → deploy from GitHub → select this repo.
2. Set the service **root** to **`apps/backend`** (where `railway.toml` + `package.json` live).
3. Attach **PostgreSQL** and set **`DATABASE_URL`** for the service.

## Fly.io (API, Docker)

Example config: [`infra/fly.backend.toml`](https://github.com/Aahilmak786/ErgoFund-Labs/blob/main/infra/fly.backend.toml). Build context must be the **monorepo root** (Dockerfile copies `apps/backend`). Point Fly at `infra/docker/Dockerfile.backend` and provide **`DATABASE_URL`** (e.g. Fly Postgres).

## DigitalOcean App Platform

Comparable to Render/Fly: use **Docker** with `infra/docker/Dockerfile.backend` or a **Node** build with root `apps/backend`, same env vars as Render.

## Firebase

**Firebase Hosting** fits **static** sites. This project uses **SvelteKit SSR** and a **separate REST API**; use **Vercel/Netlify** for the Kit app and **Render/Railway** for the API. Firebase can still be used for **analytics** or **optional** static microsites if you add them later.

## GitHub Wiki

Source pages live in **`docs/wiki/`**. Enable **Wikis** under repo **Settings → General → Features**, then either paste pages manually or add a **`WIKI_PUSH_TOKEN`** (fine-grained PAT with wiki write) and use the **Wiki sync** GitHub Action.
