<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';

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
	<title>Projects | Bene Fundraising</title>
</svelte:head>

<h1>All Projects</h1>
<div class="projects-grid">
	{#each projects as project (project.id)}
		<ProjectCard {project} />
	{/each}
</div>

<style>
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}
</style>
