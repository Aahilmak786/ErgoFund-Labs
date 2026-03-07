# Bene Fundraising Platform

A fundraising platform on the Ergo blockchain with multi-token support, stablecoins, referrals, and analytics. Built for AOSSIE Technologies.

**2-month plan:** See [ROADMAP.md](./ROADMAP.md) (Feb 17 – Apr 17, 2026). Goal: 5 commits/day, project complete by Apr 17.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | SvelteKit, TypeScript, Vite |
| **Backend** | Node.js (SvelteKit server), Ergo Explorer APIs |
| **DevOps** | Docker, GitHub Actions |
| **Quality** | ESLint, Prettier |
| **Testing** | Jest, Ergo Testnet |

## Features

- Multi-token support (ERG, SigUSD, custom tokens)
- Multiple wallet integration (Nautilus, Yoroi, SAFEW via EIP-12)
- Ergo Explorer API integration for blockchain data
- Referral system with misuse protection
- Project analytics dashboard
- Ergo Testnet support for integration testing

## Setup

```bash
npm install
cp .env.example .env   # optional: customize Ergo API URL
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run check` | SvelteKit sync + type check |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check Prettier formatting |
| `npm test` | Run Jest unit tests |

## Ergo Testnet

Set `PUBLIC_ERGO_EXPLORER_URL=https://api-testnet.ergoplatform.com` for Testnet. Use a Testnet wallet (Nautilus/Yoroi) when testing.

## API Routes

- `GET /api/explorer/address?address=<addr>&testnet=true` - Fetch address balance and UTXOs from Ergo Explorer

## Docker

```bash
docker-compose up --build
```

## CI/CD

GitHub Actions runs on push/PR to `main` and `develop`:
- ESLint & Prettier
- SvelteKit check
- Jest tests
- Build

## Project Structure

```
src/
├── lib/
│   ├── ergo/           # Ergo wallet, tokens, Explorer API
│   ├── components/     # Shared UI
│   ├── stores/         # Svelte stores
│   └── __tests__/      # Jest unit tests
├── routes/
│   ├── api/            # Node.js API routes
│   └── ...             # Pages
```

## Wallet Requirements

Install [Nautilus](https://nautilus.io/) or [Yoroi](https://yoroi-wallet.com/) for Ergo.

## License

MIT. See repository for details.
