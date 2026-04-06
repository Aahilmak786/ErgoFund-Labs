# Docker stack

Full stack: **PostgreSQL**, **backend** (port `8080`), **frontend** (port `3000`).

From the repository root:

```bash
docker compose -f infra/docker-compose.yml up --build
```

- **Backend health:** `GET http://localhost:8080/health`
- **Frontend:** `http://localhost:3000`
- **Optional seed:** after containers are up, from the repo root:

```bash
npm run db:seed
```

Environment variables for the backend and frontend are wired in `infra/docker-compose.yml`. Override `PUBLIC_API_URL` for the frontend if the browser must reach the API at a host other than `http://localhost:8080`.

## Multi-stage images

Dockerfiles live under `infra/docker/` and are validated in CI (`docker build` smoke step).
