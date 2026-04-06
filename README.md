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
# Install dependencies when package.json is present:
# npm install
# npm run dev
```

See **[ARCHITECTURE.md](./ARCHITECTURE.md)** for UTXO flow, token model, and referral notes.

## Documentation

| | |
| --- | --- |
| **GitHub Wiki** | [github.com/Aahilmak786/ErgoFund-Labs/wiki](https://github.com/Aahilmak786/ErgoFund-Labs/wiki) — local dev, Docker, API smoke tests, project layout |
| **Wiki source (reviewable in PRs)** | [`docs/github-wiki/`](./docs/github-wiki/) — sync to the GitHub Wiki with `scripts/push-github-wiki.ps1` |

## Environment variables

All services must read RPC/explorer and app URLs from environment — see **`.env.example`**.

## Deployment (GSoC)

| Target | Role |
| --- | --- |
| **Vercel** or **Netlify** | SvelteKit frontend (auto-deploy from GitHub, PR previews) |
| **Render** or **Railway** | API/indexer if used — must expose **`GET /health`** |
| **Docker Compose** | Full stack (frontend + optional API + optional PostgreSQL) |

Fill in after you deploy:

| | URL |
| --- | --- |
| **Frontend** | _TBD — e.g. `https://<project>.vercel.app`_ |
| **Backend/API** | _TBD if applicable_ |
| **Repository** | `https://github.com/Aahilmak786/ErgoFund-Labs` |

## Cursor rules

Project AI rules are in **`.cursor/rules/`** (GSoC deployment edition: stack, Docker, live URL, security).

---

## License

See the repository license file when present (e.g. MIT).
