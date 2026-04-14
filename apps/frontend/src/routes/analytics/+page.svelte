<script lang="ts">
  import { onMount } from 'svelte';
  import { Chart, registerables } from 'chart.js';
  import ChartBar from '$lib/components/ChartBar.svelte';
  import TokenBar from '$lib/components/TokenBar.svelte';

  type AnalyticsData = {
    totalCampaigns: number;
    totalRaisedErg: number;
    activeContributors: number;
    successRate: number;
    contributionsOverTime: { date: string; amount: number }[];
    topCampaigns: { name: string; raised: number }[];
    tokenDistribution: Record<string, string>;
  };

  let loading = $state(true);
  let error = $state<string | null>(null);
  let analytics = $state<AnalyticsData | null>(null);

  let tokenCanvas: HTMLCanvasElement | undefined;
  let tokenChart: Chart | null = null;

  function buildMockAnalytics(): AnalyticsData {
    const today = new Date();
    const contributionsOverTime = Array.from({ length: 30 }, (_, idx) => {
      const current = new Date(today);
      current.setDate(today.getDate() - (29 - idx));
      const date = current.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const amount = 120 + idx * 8 + ((idx % 6) * 11 + (idx % 3) * 7);

      return { date, amount };
    });

    return {
      totalCampaigns: 42,
      totalRaisedErg: 125480.75,
      activeContributors: 1892,
      successRate: 78.4,
      contributionsOverTime,
      topCampaigns: [
        { name: 'Solar Village Project', raised: 31200 },
        { name: 'Open Source Education Fund', raised: 27850 },
        { name: 'Community Water Initiative', raised: 24190 },
        { name: 'Rural Healthcare Equipment', raised: 19820 },
        { name: 'Tech Scholarships 2026', raised: 17400 }
      ],
      tokenDistribution: {
        ERG: '72%',
        SigUSD: '14%',
        APT: '8%',
        PFT: '6%'
      }
    };
  }

  async function loadAnalytics() {
    loading = true;
    error = null;

    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      analytics = buildMockAnalytics();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to load analytics dashboard';
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    Chart.register(...registerables);
    loadAnalytics();

    return () => {
      tokenChart?.destroy();
    };
  });

  const topCampaignLabels = $derived(analytics ? analytics.topCampaigns.map((c) => c.name) : []);
  const topCampaignValues = $derived(analytics ? analytics.topCampaigns.map((c) => c.raised) : []);

  const trendLabels = $derived(
    analytics ? analytics.contributionsOverTime.map((entry) => entry.date) : []
  );

  const tokenLabels = $derived(analytics ? Object.keys(analytics.tokenDistribution) : []);
  const tokenValues = $derived(
    analytics
      ? Object.values(analytics.tokenDistribution).map((value) => Number(value.replace('%', '')))
      : []
  );

  const lineChartGeometry = $derived.by(() => {
    if (!analytics?.contributionsOverTime.length) {
      return { polylinePoints: '', areaPath: '', markers: [] as { cx: number; cy: number }[] };
    }

    const entries = analytics.contributionsOverTime;
    const amounts = entries.map((entry) => entry.amount);
    const min = Math.min(...amounts);
    const max = Math.max(...amounts);
    const range = Math.max(max - min, 1);

    const left = 4;
    const right = 96;
    const top = 8;
    const bottom = 42;
    const width = right - left;
    const height = bottom - top;

    const points = entries.map((entry, idx) => {
      const x = left + (idx / Math.max(entries.length - 1, 1)) * width;
      const y = bottom - ((entry.amount - min) / range) * height;
      return { x, y };
    });

    const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(' ');
    const areaPath =
      points.length > 1
        ? `M ${points[0].x} ${bottom} L ${points[0].x} ${points[0].y} ${points
            .map((point) => `L ${point.x} ${point.y}`)
            .join(' ')} L ${points[points.length - 1].x} ${bottom} Z`
        : '';

    const markers = points.filter((_, idx) => idx === 0 || idx === points.length - 1 || idx % 7 === 0);

    return { polylinePoints, areaPath, markers };
  });

  $effect(() => {
    if (!tokenCanvas || !tokenLabels.length || !tokenValues.length) return;

    tokenChart?.destroy();
    tokenChart = new Chart(tokenCanvas, {
      type: 'doughnut',
      data: {
        labels: tokenLabels,
        datasets: [
          {
            data: tokenValues,
            borderColor: 'var(--surface)',
            borderWidth: 2,
            backgroundColor: [
              'rgba(34, 211, 238, 0.9)',
              'rgba(56, 189, 248, 0.85)',
              'rgba(45, 212, 191, 0.85)',
              'rgba(147, 197, 253, 0.85)'
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'var(--text)' }
          }
        }
      }
    });
  });
</script>

<svelte:head>
  <title>Platform Analytics — BenefactionPlatform-Ergo</title>
</svelte:head>

<div class="page-head">
  <div>
    <h1>Platform Analytics</h1>
    <p class="muted">Overview of fundraising performance and contribution trends.</p>
  </div>
  <button class="btn" on:click={loadAnalytics} disabled={loading}>
    {loading ? 'Loading…' : 'Reload data'}
  </button>
</div>

{#if loading}
  <div class="skeleton-grid" aria-busy="true" aria-label="Loading analytics dashboard">
    <div class="sk card"></div>
    <div class="sk card"></div>
    <div class="sk card"></div>
    <div class="sk card"></div>
    <div class="sk card wide"></div>
    <div class="sk card wide"></div>
  </div>
{:else if error}
  <section class="card error-card" role="alert">
    <h2>Could not load analytics</h2>
    <p class="error-text">{error}</p>
  </section>
{:else if analytics}
  <div class="stats-grid">
    <section class="card stat-card">
      <p class="label">Total Campaigns</p>
      <p class="value">{analytics.totalCampaigns}</p>
    </section>
    <section class="card stat-card">
      <p class="label">Total Raised (ERG)</p>
      <p class="value">{analytics.totalRaisedErg.toLocaleString()}</p>
    </section>
    <section class="card stat-card">
      <p class="label">Active Contributors</p>
      <p class="value">{analytics.activeContributors.toLocaleString()}</p>
    </section>
    <section class="card stat-card">
      <p class="label">Success Rate</p>
      <p class="value">{analytics.successRate}%</p>
    </section>
  </div>

  <div class="charts-grid">
    <section class="card line-card">
      <h2>Contributions over time</h2>
      <p class="muted">Last 30 days</p>
      <div class="chart-wrap">
        <svg viewBox="0 0 100 50" role="img" aria-label="Contributions over time line chart">
          <title>Contributions over time (last 30 days)</title>
          <line x1="4" y1="42" x2="96" y2="42" class="axis-line" />
          <line x1="4" y1="8" x2="4" y2="42" class="axis-line" />
          {#if lineChartGeometry.areaPath}
            <path d={lineChartGeometry.areaPath} class="trend-area"></path>
            <polyline points={lineChartGeometry.polylinePoints} class="trend-line"></polyline>
            {#each lineChartGeometry.markers as marker}
              <circle cx={marker.cx} cy={marker.cy} r="0.8" class="trend-dot"></circle>
            {/each}
          {/if}
        </svg>
        {#if trendLabels.length}
          <div class="x-labels">
            <span>{trendLabels[0]}</span>
            <span>{trendLabels[Math.floor(trendLabels.length / 2)]}</span>
            <span>{trendLabels[trendLabels.length - 1]}</span>
          </div>
        {/if}
      </div>
    </section>

    <section class="card">
      <h2>Top Campaigns by funds raised</h2>
      <p class="muted">Ranked by total ERG raised</p>
      <ChartBar labels={topCampaignLabels} values={topCampaignValues} />
    </section>

    <section class="card token-card">
      <h2>Token distribution</h2>
      <p class="muted">Current contribution mix by token</p>
      <div class="token-layout">
        <div class="chart-wrap donut-wrap">
          <canvas bind:this={tokenCanvas} aria-label="Token distribution doughnut chart"></canvas>
        </div>
        <div class="token-list">
          {#each Object.entries(analytics.tokenDistribution) as [token, portion]}
            <TokenBar label={token} value={portion} />
          {/each}
        </div>
      </div>
    </section>
  </div>
{/if}

<style>
  .page-head {
    margin-bottom: 1.25rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .page-head h1 {
    margin-bottom: 0.25rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .stat-card .label {
    margin: 0;
    color: var(--muted);
    font-size: 0.9rem;
  }

  .stat-card .value {
    margin: 0.35rem 0 0;
    color: var(--brand);
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    line-height: 1.1;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .line-card {
    grid-column: 1 / -1;
  }

  .chart-wrap {
    min-height: 250px;
    margin-top: 0.5rem;
  }

  .chart-wrap svg {
    width: 100%;
    height: 230px;
    display: block;
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, var(--surface) 92%, var(--brand) 8%),
      var(--surface)
    );
    border: 1px solid var(--border);
    border-radius: 12px;
  }

  .axis-line {
    stroke: var(--border);
    stroke-width: 0.4;
  }

  .trend-area {
    fill: color-mix(in srgb, var(--brand) 22%, transparent);
  }

  .trend-line {
    fill: none;
    stroke: var(--brand);
    stroke-width: 0.9;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .trend-dot {
    fill: var(--brand-2);
  }

  .x-labels {
    margin-top: 0.45rem;
    display: flex;
    justify-content: space-between;
    color: var(--muted);
    font-size: 0.78rem;
  }

  .token-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: center;
  }

  .donut-wrap {
    height: 240px;
  }

  .token-list {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .error-card {
    border-color: rgba(220, 80, 80, 0.45);
  }

  .error-text {
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.95rem;
  }

  .skeleton-grid {
    display: grid;
    gap: 1rem;
  }

  .sk {
    min-height: 110px;
    background: linear-gradient(
      90deg,
      var(--surface) 0%,
      var(--border) 50%,
      var(--surface) 100%
    );
    background-size: 200% 100%;
    animation: pulse 1.2s ease-in-out infinite;
  }

  .sk.wide {
    min-height: 260px;
    grid-column: 1 / -1;
  }

  @media (min-width: 720px) {
    .stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .charts-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .token-card {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 1080px) {
    .stats-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .token-layout {
      grid-template-columns: minmax(220px, 320px) 1fr;
    }
  }

  @media (max-width: 560px) {
    .page-head {
      flex-direction: column;
    }
  }

  @keyframes pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
