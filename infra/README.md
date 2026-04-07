# Infrastructure

- **`docker-compose.yml`** — Postgres, API, SvelteKit (production-like). Frontend image receives `PUBLIC_API_URL` as a **build arg** so Vite embeds the API base URL.
- **`docker/Dockerfile.backend`** — Express API.
- **`docker/Dockerfile.frontend`** — Builds SDK + SvelteKit adapter-node; runs `node build/index.js`.

See [docs/DEPLOYMENT.md](../docs/DEPLOYMENT.md).
