# Architecture

## Layers
1. Frontend (SvelteKit routes and components)
2. Wallet & blockchain integration (`src/lib/ergo/*`)
3. API route layer (`src/routes/api/*`)
4. Smart contracts (`contracts/*.ergo`)

## Important Modules
- `wallet.ts`: EIP-12 wallet connection + balances
- `tokens.ts`: token metadata and formatting
- `explorer.ts`: Ergo Explorer API client
- `referral.ts`: referral generation + anti-misuse basics

## Contracts
- `BeneCampaign.ergo`
- `BeneRefund.ergo` (placeholder)
