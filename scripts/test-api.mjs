/**
 * Smoke test against a running backend (default http://127.0.0.1:8080).
 * Usage: node scripts/test-api.mjs [baseUrl]
 */
const base = (process.argv[2] ?? 'http://127.0.0.1:8080').replace(/\/$/, '');

async function main() {
  const health = await fetch(`${base}/health`);
  if (!health.ok) throw new Error(`health ${health.status}`);
  console.log('health:', await health.json());

  const campaigns = await fetch(`${base}/api/campaigns`);
  if (!campaigns.ok) throw new Error(`campaigns ${campaigns.status}`);
  console.log('campaigns:', await campaigns.json());

  const summary = await fetch(`${base}/api/analytics/summary`);
  if (!summary.ok) throw new Error(`summary ${summary.status}`);
  console.log('summary:', await summary.json());

  console.log('OK');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
