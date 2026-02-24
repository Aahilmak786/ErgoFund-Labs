<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	// Mock projects - replace with real data from Ergo/API
	const projects = [
		{
			id: '1',
			title: 'Community Education Fund',
			description: 'Funding educational programs for underserved communities on Ergo.',
			raised: 125000n,
			goal: 500000n,
			token: 'ERG',
			backers: 42,
			deadline: '2025-03-15'
		},
		{
			id: '2',
			title: 'Open Source Development',
			description: 'Support Ergo protocol improvements and developer tools.',
			raised: 89000n,
			goal: 200000n,
			token: 'ERG',
			backers: 28,
			deadline: '2025-04-01'
		}
	];
</script>

<svelte:head>
	<title>Bene Fundraising | Ergo Blockchain</title>
</svelte:head>

<section class="hero">
	<h1>Fundraising on Ergo</h1>
	<p class="tagline">
		Multi-token support · Stablecoins · Referrals · Transparent & trustless
	</p>
	<a href="/create" class="cta">Create a Project</a>
</section>

<section class="projects-section">
	<h2>Explore Projects</h2>
	<div class="projects-grid">
		{#each projects as project (project.id)}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 4rem 2rem;
		background: linear-gradient(180deg, var(--color-surface) 0%, transparent 100%);
		border-radius: var(--radius);
		margin-bottom: 3rem;
	}
	.hero h1 {
		font-size: 2.5rem;
		margin: 0 0 1rem;
	}
	.tagline {
		color: var(--color-muted);
		font-size: 1.125rem;
		margin: 0 0 2rem;
	}
	.cta {
		display: inline-block;
		padding: 0.75rem 2rem;
		background: var(--color-accent);
		color: #fff;
		border-radius: var(--radius);
		font-weight: 600;
		transition: background 0.2s;
	}
	.cta:hover {
		background: var(--color-accent-hover);
		color: #fff;
	}
	.projects-section h2 {
		font-size: 1.5rem;
		margin-bottom: 1.5rem;
	}
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
	}
</style>
