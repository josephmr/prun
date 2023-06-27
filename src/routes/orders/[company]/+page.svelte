<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const interval = setInterval(() => {
		invalidateAll();
	}, 5000);

	onDestroy(() => clearInterval(interval));
</script>

<div class="max-w-4xl mx-auto">
	<h1 class="text-2xl pb-8 pt-8">Orders for {data.company}</h1>
	<div class="table">
		<div class="table-header-group">
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				MAT
			</div>
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				CX
			</div>
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				TYPE
			</div>
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				AMT
			</div>
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				PRICE
			</div>
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				BID
			</div>
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				ASK
			</div>
			<div
				class="table-cell p-4 font-medium text-left border-b border-slate-200 dark:border-slate-400/20"
			>
				SPRD
			</div>
		</div>
		{#each data.orders as order, index}
			{@const last = index === data.orders.length - 1}
			{#each order.Orders as ord}
				{@const sniped = order.Market[ord.Type === 'Buy' ? 'Bid' : 'Ask'] !== ord.Cost}
				<div class="table-row">
					<div
						class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{order.Ticker.split('.')[0]}
					</div>
					<div
						class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{order.Ticker.split('.')[1]}
					</div>
					<div
						class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{ord.Type === 'Buy' ? 'BUY' : 'SELL'}
					</div>
					<div
						class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{ord.Count}
					</div>
					<div
						class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{ord.Cost}
					</div>
					<div
						class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{order.Market.Bid}
					</div>
					<div
						class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{order.Market.Ask}
					</div>
					<div
						class="table-cell p-4 text-left border-slate-200 dark:border-slate-400/20"
						class:border-b={!last}
						class:sniped
					>
						{order.Market.Ask - order.Market.Bid}
					</div>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style lang="postcss">
	.grid-item {
		border: 1px solid rgba(var(--theme-font-color-dark));
		padding: 5px;
	}
	.sniped {
		background-color: rgba(var(--color-error-500));
	}
</style>
