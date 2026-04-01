# Deployment

## Docker (Preferred)
```bash
docker-compose up --build
```
Live locally at `http://localhost:3000`.

## Render
- Repo includes `render.yaml`
- Runtime: Docker
- Health check: `/api/health`

## Fly.io
- Repo includes `fly.toml`
- Run `fly launch` and `fly deploy`

## Other
- `vercel.json` and `netlify.toml` are included for alternate hosting paths.
