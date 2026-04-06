# ErgoScript contracts — BenefactionPlatform-Ergo

Place compiled **ErgoTree** hex in environment (`PUBLIC_BENE_CAMPAIGN_ERGOTREE`, etc.) for mainnet/testnet after building with the Ergo compiler toolchain.

| File | Purpose |
| --- | --- |
| `BeneFundraising.ergo` | Campaign box: contributions, goal check, refunds |
| `ReferralReward.ergo` | Referral payout guards (compose with app policy) |

## Audit checklist (pre-mainnet)

- [ ] All token IDs from registry only (no arbitrary minted tokens in guarded paths)
- [ ] MIN_ERG preserved on each output box
- [ ] Deadline and goal checks are explicit in sigma proposition
- [ ] No replay: nonce or unique box chaining per contribution
- [ ] Refund path cannot drain unrelated collateral
