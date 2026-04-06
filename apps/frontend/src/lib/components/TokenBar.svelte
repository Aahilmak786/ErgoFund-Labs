<script lang="ts">
  let { label, value }: { label: string; value: string } = $props();
</script>

<div class="token-bar" role="group" aria-label={label}>
  <span class="muted">{label}</span>
  <strong>{value}</strong>
</div>

<style>
  .token-bar {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border);
  }
  .muted {
    color: var(--muted);
  }
</style>
