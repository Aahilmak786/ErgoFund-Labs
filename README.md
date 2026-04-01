# BenefactionPlatform-Ergo

Production-ready monorepo for a multi-token fundraising platform on Ergo.

## Monorepo Layout

- `apps/frontend`: SvelteKit app (wallet UX, campaign UI, analytics dashboard)
- `packages/contracts`: ErgoScript contracts and contract-level tests
- `packages/sdk`: Fleet SDK abstractions (transaction manager, wallet provider)
- `packages/services`: Node services (analytics/referral protection API)
- `packages/ui`: Shared design tokens and reusable UI primitives
- `infra`: Docker and deployment manifests

## Quick Start

1. Install dependencies:
   - `npm install`
2. Run frontend:
   - `npm run dev`
3. Run contract tests:
   - `npm run test --workspace @benefaction/contracts`
4. Run services locally:
   - `npm run dev --workspace @benefaction/services`

## Security Notes

- Token IDs are allowlisted for anti-spoofing
- Referral service blocks self-referrals and duplicate source fingerprints
- Fleet transaction queue includes retries and status transitions

## Deployment

- Frontend: deploy `apps/frontend` to Vercel or Netlify
- Full stack: run `docker compose -f infra/docker-compose.yml up --build`
- CI/CD: `.github/workflows/ci.yml`
