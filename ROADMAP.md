# ErgoFund-Labs: 2-Month Roadmap

**Last updated:** 2026-02-17  
**Start:** Feb 17, 2026  
**Target completion:** Apr 17, 2026  
**Commit goal:** 5 commits per day (visible on GitHub)

---

## Commit habit: 5 per day

Aim for **5 small, atomic commits every day** so your GitHub profile shows steady activity:

| # | Type | Examples |
|---|------|----------|
| 1 | **Feature** | New function, component, or API |
| 2 | **Fix** | Bug fix, typo, or lint error |
| 3 | **Refactor** | Cleanup, rename, or simplify |
| 4 | **Tests** | Add or update a test |
| 5 | **Docs/config** | README, comments, .env.example, CI |

Tips: Split a big change into 2–3 commits. Use clear messages: `feat: add contribute tx builder`, `fix: wallet disconnect`, `test: explorer getBoxById`.

---

## Month 1: Core flows & persistence

### Week 1 (Feb 17 – Feb 23)

- [ ] **Fleet SDK: create campaign box** – Build unsigned tx that creates one output with BeneCampaign contract (R4=goal, R5=deadline, R6=recipient).
- [ ] **API: POST /api/projects** – Accept title, description, goal, deadline, tokenId; return project id (store in JSON/DB later).
- [ ] **Create project page** – On submit, call wallet for inputs/height, build campaign tx with Fleet, sign & submit (or copy unsigned tx).
- [ ] **Explorer: fetch boxes by ergoTree** – Helper to list campaign boxes for a given script (optional).
- [ ] **5 commits/day** – At least one commit per day; build toward 5/day by end of week.

### Week 2 (Feb 24 – Mar 2)

- [ ] **Fleet SDK: contribute tx** – Build tx that spends campaign box (contribute path) and creates one new campaign box with same script + higher value.
- [ ] **Project detail page** – Load project by id; show goal, deadline, raised (from campaign box value), backers count.
- [ ] **Contribute button** – Amount + token; build contribute tx, sign with wallet, submit; refresh raised amount.
- [ ] **Persistence** – Store projects in JSON file or SQLite (id, title, description, campaignBoxId, creatorAddress, goal, deadline, tokenId).
- [ ] **5 commits/day** – Keep 5 commits/day; use feature/fix/refactor/test/docs split.

### Week 3 (Mar 3 – Mar 9)

- [ ] **Fleet SDK: collect tx** – Build tx for recipient: spend campaign box (collect path), send value to recipient address.
- [ ] **Collect button** – Show only to recipient when value >= goal; build collect tx, sign, submit.
- [ ] **Projects list from persistence** – Load all projects from DB/file; show on /projects and home.
- [ ] **Basic error handling** – Toasts or inline errors for failed tx, API errors, wallet reject.
- [ ] **5 commits/day** – Maintain streak; push to GitHub daily.

### Week 4 (Mar 10 – Mar 16)

- [ ] **Referral: share link** – Generate referral code from wallet address; page “My referral” with copy link.
- [ ] **Referral: track in backend** – Store referral code → address; on contribute, optional referral param; count per code.
- [ ] **Analytics: real data** – Total raised, active projects, backer count from persistence + Explorer (campaign box values).
- [ ] **Dashboard** – /analytics shows live totals; optional chart (e.g. raised over time).
- [ ] **5 commits/day** – Stay consistent; fix any regressions from new features.

---

## Month 2: Refunds, tests, polish

### Week 5 (Mar 17 – Mar 23)

- [ ] **BeneRefund.ergo** – Implement refund path: after deadline, goal not met; refund tokens (design: mint on contribute, burn on claim).
- [ ] **Refund claim flow** – UI: “Campaign failed – claim refund”; build tx that burns refund token and sends share of campaign box to user.
- [ ] **Testnet deploy** – Deploy app against Ergo Testnet; test create → contribute → collect and refund on Testnet.
- [ ] **5 commits/day** – Plenty of small commits from contract + off-chain refund logic.

### Week 6 (Mar 24 – Mar 30)

- [ ] **Jest: integration-style tests** – Tests that call Explorer API (Testnet) for address/box (mocked or real Testnet); document how to run.
- [ ] **E2E or critical path test** – One test that simulates: create project → contribute → collect (or use Playwright/Cypress for UI).
- [ ] **Multi-token in txs** – Support contributing in SigUSD (or other token) where contract/design allows; display in ERG equivalent if needed.
- [ ] **5 commits/day** – Test files and small fixes count as commits.

### Week 7 (Apr 1 – Apr 7)

- [ ] **Rate limiting & validation** – API: rate limit /api/projects and /api/explorer; validate goal/deadline/tokenId on create.
- [ ] **Accessibility** – Focus order, ARIA, keyboard nav on modals and forms; fix any a11y issues.
- [ ] **UI polish** – Loading states, empty states, success messages; mobile layout check.
- [ ] **5 commits/day** – Refactors and polish are good for commit count.

### Week 8 (Apr 8 – Apr 14)

- [ ] **Documentation** – README: how to run, Testnet vs mainnet, env vars; contracts/README: how to compile and deploy.
- [ ] **Security pass** – No secrets in frontend; validate all inputs; review contract spending paths.
- [ ] **Docker & CI** – Ensure `docker-compose up` runs app; CI runs lint, format, tests, build on every push.
- [ ] **5 commits/day** – Docs and CI changes spread across the week.

### Week 9 (Apr 15 – Apr 17)

- [ ] **Final testing** – Full flow on Testnet: create → contribute → collect; refund path; referral.
- [ ] **Deploy** – Deploy to Vercel/Node server or keep Docker; document production URL.
- [ ] **Retro** – Note what’s done vs optional (EVM alignment, etc.); update ROADMAP with “Completed” dates.
- [ ] **5 commits/day** – Bug fixes and last docs; keep pushing to GitHub.

---

## Checklist: 5 commits per day

Use this as a daily reminder (copy into a note or issue):

```
[ ] Commit 1: feature / main task
[ ] Commit 2: fix or small improvement
[ ] Commit 3: refactor or cleanup
[ ] Commit 4: test or test fix
[ ] Commit 5: docs, comments, or config
[ ] git push origin main (or your branch)
```

---

## Quick reference

| Item | Target |
|------|--------|
| **Start** | Feb 17, 2026 |
| **End** | Apr 17, 2026 |
| **Commits/day** | 5 |
| **~Total commits** | ~300 (60 days × 5) |
| **Repo** | https://github.com/Aahilmak786/ErgoFund-Labs |

Push to the same branch (e.g. `main`) daily so your GitHub contribution graph and commit history show steady progress.
