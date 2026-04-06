<script lang="ts">
  import { onMount } from 'svelte';
  import { apiGet } from '$lib/api';
  import ChartBar from '$lib/components/ChartBar.svelte';
  import TokenBar from '$lib/components/TokenBar.svelte';

  type Summary = {
    totalRaisedByToken: Record<string, string>;
    uniqueContributors: number;
  };

  let loading = $state(true);
  let error = $state<string | null>(null);
  let summary = $state<Summary | null>(null);

  onMount(async () => {
    try {
      summary = await apiGet<Summary>('/api/analytics/summary');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load';
    } finally {
      loading = false;
    }
  });

  const labels = $derived(summary ? Object.keys(summary.totalRaisedByToken) : []);
  const values = $derived(
    summary ? Object.values(summary.totalRaisedByToken).map((v) => Number(v)) : []
  );
</script>

<h1>Analytics</h1>
{#if loading}
  <p role="status">Loading analytics…</p>
{:else if error}
  <p role="alert">{error}</p>
{:else if summary}
  <section class="card">
    <h2>Overview</h2>
    <p>Unique contributors (on-chain indexed in DB): <strong>{summary.uniqueContributors}</strong></p>
  </section>
  <section class="card">
    <h2>Token totals</h2>
    {#each Object.entries(summary.totalRaisedByToken) as [token, amount]}
      <TokenBar label={token} value={amount} />
    {/each}
  </section>
  {#if labels.length}
    <section class="card">
      <h2>Distribution</h2>
      <ChartBar {labels} {values} />
    </section>
  {/if}
{/if}
