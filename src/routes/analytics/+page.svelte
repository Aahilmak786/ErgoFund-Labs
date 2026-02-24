<script lang="ts">
	// Analytics dashboard - project stats, referral metrics, etc.
	const stats = [
		{ label: 'Total Raised', value: '214,000 ERG', trend: '+12%' },
		{ label: 'Active Projects', value: '24', trend: '+3' },
		{ label: 'Total Backers', value: '1,247', trend: '+89' },
		{ label: 'Referral Rewards', value: '8,500 ERG', trend: '+5%' }
	];
</script>

<svelte:head>
	<title>Analytics | Bene Fundraising</title>
</svelte:head>

<h1>Project Analytics</h1>

<div class="stats-grid">
	{#each stats as stat}
		<div class="stat-card">
			<span class="stat-label">{stat.label}</span>
			<span class="stat-value">{stat.value}</span>
			<span class="stat-trend">{stat.trend}</span>
		</div>
	{/each}
</div>

<section class="section">
	<h2>Referral System</h2>
	<p>Share your unique referral link to earn rewards when others fund projects. Protection against misuse via rate limiting and verification.</p>
</section>

<style>
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 2rem 0;
	}
	.stat-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		padding: 1.5rem;
	}
	.stat-label {
		display: block;
		color: var(--color-muted);
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
	}
	.stat-value {
		font-size: 1.5rem;
		font-weight: 700;
	}
	.stat-trend {
		display: block;
		color: #4ade80;
		font-size: 0.8rem;
		margin-top: 0.25rem;
	}
	.section {
		margin-top: 3rem;
	}
</style>
