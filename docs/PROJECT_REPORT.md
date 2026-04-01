# Project Report: Bene Fundraising Platform (ErgoFund-Labs)

## 1. Abstract
Bene Fundraising Platform is a blockchain-based fundraising dApp on Ergo designed to support multi-token contributions, wallet interoperability, referral incentives, and transparent analytics. The implementation uses SvelteKit + TypeScript + Vite for frontend and Node-based API routes for backend integration with Ergo Explorer APIs. Smart contract logic is modeled through ErgoScript contracts under `contracts/`.

## 2. Problem Statement
Traditional fundraising systems are centralized and opaque. This project aims to provide a trust-minimized crowdfunding experience where users can verify campaign behavior and on-chain state, with lower entry barrier through modern UI and wallet integrations.

## 3. Objectives
- Build a modern fundraising platform on Ergo.
- Support multiple wallets (Nautilus, Yoroi, SAFEW via EIP-12).
- Support multiple tokens (ERG, SigUSD, extensible token list).
- Add referral and analytics foundation.
- Prepare Docker-first deployment with CI/CD.

## 4. Tech Stack
- Frontend: SvelteKit, TypeScript, Vite
- Backend/API: SvelteKit server routes (Node runtime)
- Blockchain: ErgoScript, Fleet SDK, Ergo Explorer API
- DevOps: Docker, Docker Compose, GitHub Actions, Render/Fly configs
- Quality: ESLint, Prettier, Jest

## 5. Architecture
1. UI routes (`src/routes`) provide pages for projects, creation, analytics.
2. Wallet layer (`src/lib/ergo/wallet.ts`) handles EIP-12 wallet interactions.
3. Token/explorer modules (`src/lib/ergo/tokens.ts`, `explorer.ts`) provide chain data and formatting.
4. API routes under `src/routes/api/*` expose backend-safe endpoints (e.g. explorer and health).
5. Smart contracts in `contracts/` define campaign and refund logic skeleton.

## 6. Smart Contracts
- `BeneCampaign.ergo`: goal/deadline/recipient register-based campaign with contribution and collection paths.
- `BeneRefund.ergo`: placeholder for full refund-on-failure flow.

## 7. Deployment
Docker-first deployment is implemented and preferred.
- Local docker: `docker-compose up --build`
- Render: `render.yaml`
- Fly.io: `fly.toml`
- Health endpoint: `/api/health`

## 8. Testing and Quality
- Unit tests: Jest-based tests in `src/lib/__tests__/`
- Lint and formatting: ESLint + Prettier
- CI pipeline: GitHub Actions workflow for lint, check, test, build

## 9. Current Status
Implemented:
- UI shell and key pages
- Wallet/connectivity foundation
- Explorer API integration
- ErgoScript contract foundation
- Docker and CI/CD infrastructure

Pending for full production completion:
- End-to-end on-chain create/contribute/collect transaction flows
- Full refund implementation and tests
- Persistent project storage and real analytics wiring

## 10. Conclusion
The project provides a strong, deployment-ready foundation for a professional Ergo fundraising dApp and aligns with the evaluation requirement of live-host readiness with Docker-first deployment.
