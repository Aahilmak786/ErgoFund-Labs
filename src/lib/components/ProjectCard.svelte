<script lang="ts">
	import { formatTokenAmount } from '$lib/ergo/tokens';

	interface Project {
		id: string;
		title: string;
		description: string;
		raised: bigint;
		goal: bigint;
		token: string;
		backers: number;
		deadline: string;
	}

	let { project } = $props<{ project: Project }>();

	const progress = $derived(
		project.goal > 0n ? Number((project.raised * 100n) / project.goal) : 0
	);
</script>

<a href="/projects/{project.id}" class="card">
	<h3>{project.title}</h3>
	<p class="description">{project.description}</p>
	<div class="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
		<div class="progress-fill" style="width: {Math.min(progress, 100)}%"></div>
	</div>
	<div class="stats">
		<span>{formatTokenAmount(project.raised, project.token)} / {formatTokenAmount(project.goal, project.token)} {project.token}</span>
		<span>{project.backers} backers</span>
	</div>
	<p class="deadline">Ends {project.deadline}</p>
</a>

<style>
	.card {
		display: block;
		padding: 1.5rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius);
		transition: border-color 0.2s;
		color: inherit;
	}
	.card:hover {
		border-color: var(--color-accent);
	}
	.card h3 {
		margin: 0 0 0.5rem;
		font-size: 1.25rem;
	}
	.description {
		color: var(--color-muted);
		font-size: 0.9rem;
		margin: 0 0 1rem;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.progress-bar {
		height: 8px;
		background: var(--color-border);
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 1rem;
	}
	.progress-fill {
		height: 100%;
		background: var(--color-accent);
		transition: width 0.3s;
	}
	.stats {
		display: flex;
		justify-content: space-between;
		font-size: 0.875rem;
		margin-bottom: 0.5rem;
	}
	.deadline {
		font-size: 0.8rem;
		color: var(--color-muted);
		margin: 0;
	}
</style>
