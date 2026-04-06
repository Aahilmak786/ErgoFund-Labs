<section class="hero card">
  <h1>Decentralized fundraising on Ergo</h1>
  <p class="muted">
    Multi-token campaigns (APT, PFT, stablecoins), secure ErgoScript contracts, Fleet SDK signing, and analytics—built
    for production.
  </p>
  <div class="cta">
    <a class="btn" href="/campaigns">Browse campaigns</a>
    <a class="btn secondary" href="/analytics">View analytics</a>
  </div>
</section>

<section class="grid" aria-label="Highlights">
  <article class="card">
    <h2>Token registry</h2>
    <p class="muted">Dynamic allowlist with validation to prevent spoofed assets.</p>
  </article>
  <article class="card">
    <h2>Wallets</h2>
    <p class="muted">Nautilus and Ergo Wallet flows with clear error handling.</p>
  </article>
  <article class="card">
    <h2>Referrals</h2>
    <p class="muted">Server-side validation, rate limits, and anti self-referral checks.</p>
  </article>
</section>

<style>
  .hero {
    margin-bottom: 1.5rem;
  }
  .cta {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  .btn {
    display: inline-block;
    padding: 0.55rem 0.9rem;
    border-radius: 10px;
    font-weight: 800;
    text-decoration: none;
  }
  .btn:not(.secondary) {
    background: var(--brand);
    color: #041018;
  }
  .btn.secondary {
    border: 1px solid var(--border);
    color: var(--brand);
  }
</style>
