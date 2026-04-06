<script lang="ts">
  import { onMount } from 'svelte';
  import { apiGet } from '$lib/api';

  type Campaign = {
    slug: string;
    title: string;
    goal_token: string;
    goal_amount: string;
    raisedByToken: Record<string, string>;
    uniqueContributors: number;
  };

  let loading = $state(true);
  let error = $state<string | null>(null);
  let campaigns = $state<Campaign[]>([]);

  onMount(async () => {
    try {
      const data = await apiGet<{ campaigns: Campaign[] }>('/api/campaigns');
      campaigns = data.campaigns;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load';
    } finally {
      loading = false;
    }
  });
</script>

<h1>Campaigns</h1>
<p class="muted">Data from the Node API (PostgreSQL-backed).</p>

{#if loading}
  <p role="status">Loading campaigns…</p>
{:else if error}
  <p role="alert">{error}</p>
{:else}
  <div class="grid">
    {#each campaigns as c}
      <article class="card">
        <h2><a href={`/campaign/${c.slug}`}>{c.title}</a></h2>
        <p class="muted">Goal: {c.goal_amount} {c.goal_token}</p>
        <p>Contributors: {c.uniqueContributors}</p>
      </article>
    {/each}
  </div>
{/if}
