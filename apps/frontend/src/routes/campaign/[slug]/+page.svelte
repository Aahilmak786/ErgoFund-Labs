<script lang="ts">
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { apiGet } from '$lib/api';

  type Campaign = {
    slug: string;
    title: string;
    description: string | null;
    goal_token: string;
    goal_amount: string;
    raisedByToken: Record<string, string>;
    uniqueContributors: number;
  };

  let loading = $state(true);
  let error = $state<string | null>(null);
  let campaign = $state<Campaign | null>(null);

  onMount(async () => {
    const slug = get(page).params.slug;
    if (!slug) return;
    try {
      const data = await apiGet<{ campaign: Campaign }>(`/api/campaigns/${slug}`);
      campaign = data.campaign;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load';
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p role="status">Loading…</p>
{:else if error}
  <p role="alert">{error}</p>
{:else if campaign}
  <article class="card">
    <h1>{campaign.title}</h1>
    {#if campaign.description}
      <p>{campaign.description}</p>
    {/if}
    <p class="muted">Goal: {campaign.goal_amount} {campaign.goal_token}</p>
    <p>Unique contributors: {campaign.uniqueContributors}</p>
    <h2>Raised by token</h2>
    <ul>
      {#each Object.entries(campaign.raisedByToken) as [token, amount]}
        <li><strong>{token}</strong>: {amount}</li>
      {/each}
    </ul>
  </article>
{/if}
