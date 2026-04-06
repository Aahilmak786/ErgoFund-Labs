<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';

  let { labels, values }: { labels: string[]; values: number[] } = $props();
  let canvas: HTMLCanvasElement | undefined;

  onMount(() => {
    Chart.register(...registerables);
    if (!canvas) return;
    const chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Raised (raw units)',
            data: values,
            backgroundColor: 'rgba(110, 231, 249, 0.5)',
            borderColor: 'rgba(110, 231, 249, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
    return () => chart.destroy();
  });
</script>

<canvas bind:this={canvas} aria-label="Token distribution chart"></canvas>
