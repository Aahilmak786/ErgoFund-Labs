<script lang="ts">
	import { page } from '$app/stores';
	import { formatTokenAmount } from '$lib/ergo/tokens';
	import { SUPPORTED_TOKENS } from '$lib/ergo/tokens';

	const projectId = $derived($page.params.id);

	// Mock project - replace with load function / API
	const project = {
		id: projectId,
		title: 'Community Education Fund',
		description: 'Funding educational programs for underserved communities on Ergo. We believe in accessible learning for everyone.',
		raised: 125000n,
		goal: 500000n,
		token: 'ERG',
		backers: 42,
		deadline: '2025-03-15',
		creator: '9gNvAv97...'
	};

	const progress = $derived(
		project.goal > 0n ? Number((project.raised * 100n) / project.goal) : 0
	);
</script>

<svelte:head>
	<title>{project.title} | Bene Fundraising</title>
</svelte:head>

<a href="/projects" class="back">← Back to Projects</a>

<article class="project-detail">
	<h1>{project.title}</h1>
	<p class="description">{project.description}</p>

	<div class="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
		<div class="progress-fill" style="width: {Math.min(progress, 100)}%"></div>
	</div>

	<div class="stats">
		<span>{formatTokenAmount(project.raised, project.token)} raised</span>
		<span>{formatTokenAmount(project.goal, project.token)} goal</span>
		<span>{project.backers} backers</span>
	</div>

	<div class="fund-section">
		<h2>Fund this project</h2>
		<select>
			{#each SUPPORTED_TOKENS as token}
				<option value={token.id}>{token.symbol}</option>
			{/each}
		</select>
		<input type="number" placeholder="Amount" min="1" />
		<button class="fund-btn">Contribute</button>
	</div>
</article>

<style>
	.back {
		display: inline-block;
		margin-bottom: 1.5rem;
		color: var(--color-muted);
	}
	.project-detail {
		max-width: 600px;
	}
	.description {
		margin: 1rem 0;
		line-height: 1.7;
	}
	.progress-bar {
		height: 12px;
		background: var(--color-border);
		border-radius: 6px;
		overflow: hidden;
		margin: 1.5rem 0;
	}
	.progress-fill {
		height: 100%;
		background: var(--color-accent);
	}
	.stats {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		color: var(--color-muted);
	}
	.fund-section {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		padding: 1.5rem;
	}
	.fund-section h2 {
		font-size: 1.125rem;
		margin: 0 0 1rem;
	}
	.fund-section select,
	.fund-section input {
		display: block;
		width: 100%;
		padding: 0.75rem;
		margin-bottom: 0.75rem;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		color: var(--color-text);
	}
	.fund-btn {
		padding: 0.75rem 1.5rem;
		background: var(--color-accent);
		color: #fff;
		border: none;
		border-radius: var(--radius);
		font-weight: 600;
	}
</style>
