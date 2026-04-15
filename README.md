# BenefactionPlatform-Ergo

**Expanding fundraising capabilities on Ergo**

The **Bene Fundraising Platform** on the Ergo blockchain uses a unique token system (**APT** / **PFT**) to support fundraising projects. This initiative improves the Ergo version by adding support for **multiple tokens**, including **stablecoins**, and aligning it with the **EVM** version—making Bene easier to use, more powerful, and more welcoming to new users, and helping grow the Ergo fundraising community.

---

## Organization

| | |
| --- | --- |
| **Organization** | AOSSIE |

---

## People

| Role | Name |
| --- | --- |
| **Contributor** | AdityaGupta256 |
| **Mentors** | Bruno, Aditya Bhattad, Yogesh Agrawal, José Miguel Avellana, ldgaetano |

---

## Goals

- **Multi-token & stablecoin support** — Extend beyond APT/PFT so campaigns can raise in stablecoins and other approved assets.
- **Multiple wallets** — Integrate several Ergo wallets for connect, switch, and a smooth Web3 UX.
- **Referral system** — Reward participation with token-based incentives, with **protection against misuse** (self-referrals, abuse patterns, and duplicate accounts).
- **Project analytics** — Dashboard for campaign performance, contributions, and growth trends.
- **UI & accessibility** — Improve layout, clarity, and **accessibility** so the platform is usable for a broader audience.

---

## Technologies

`docker` · `typescript` · `vite` · `SvelteKit` · `ErgoScript` · `Fleet SDK`

| Area | Stack |
| --- | --- |
| Frontend | SvelteKit, Vite, TypeScript |
| Smart contracts | ErgoScript |
| Blockchain integration | Fleet SDK |
| DevOps | Docker |

---

## Topics

smart contracts · Web3 · Frontend Development · Blockchain Development · Token Economics

---

## Setup

```bash
cp .env.example .env
npm install
npm --prefix packages/sdk install
npm --prefix apps/backend install
npm --prefix apps/frontend install
npm --prefix packages/sdk run build
```

**Dev (two terminals):** `npm run dev:backend` · `npm run dev:frontend` — UI at `http://localhost:5173` (Vite proxies `/api` to `:8080`).

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for UTXO flow, token model, and referral notes.

## Environment variables

All services read RPC/explorer and URLs from the environment — see **`.env.example`**. Production: set **`PUBLIC_API_URL`** on the frontend host and **`CORS_ORIGIN`** / **`DATABASE_URL`** on the API.

## Deployment (GSoC)

Stack stays **SvelteKit + Node API + Postgres + Ergo tooling**; hosts below only change how it runs.

| Platform | Role | Config in repo |
| --- | --- | --- |
| **[Vercel](https://vercel.com)** | SvelteKit frontend (`VERCEL` → adapter-vercel) | `vercel.json` |
| **[Netlify](https://netlify.com)** | SvelteKit frontend (`NETLIFY` → adapter-netlify) | `netlify.toml` |
| **[Render](https://render.com)** | API + Postgres, `/health` | `render.yaml` |
| **[Railway](https://railway.app)** | API + Postgres | `apps/backend/railway.toml` |
| **[Fly.io](https://fly.io)** | API via Docker (optional) | `infra/fly.backend.toml` |
| **Docker Compose** | Full stack locally / VM | `infra/docker-compose.yml` |

**Firebase Hosting** is for static assets; use Vercel/Netlify for this SSR app and Render/Railway for the API (Firebase can still be used for analytics or extra static pages if you add them).

Fill in after you deploy:

| | URL |
| --- | --- |
| **Frontend** | _your Vercel or Netlify URL_ |
| **Backend/API** | _your Render or Railway URL_ |
| **Wiki** | [github.com/Aahilmak786/ErgoFund-Labs/wiki](https://github.com/Aahilmak786/ErgoFund-Labs/wiki) — full map in `docs/wiki/`; enable Wikis + **`WIKI_PUSH_TOKEN`** so [Wiki sync](.github/workflows/wiki-sync.yml) runs on each push to `main` |
| **Netlify (team)** | [ErgoFund-Labs](https://ergofund-labs.netlify.app/) — import this repo; see `docs/wiki/Netlify-setup.md` |
| **Repository** | [github.com/Aahilmak786/ErgoFund-Labs](https://github.com/Aahilmak786/ErgoFund-Lab) |

## Cursor rules

Project AI rules are in **`.cursor/rules/`** (GSoC deployment edition: stack, Docker, live URL, security).

---

## License

[MIT](./LICENSE)
