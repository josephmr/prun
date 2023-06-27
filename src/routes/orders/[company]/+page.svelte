<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import type { PageData } from './$types';
  import { browser } from '$app/environment';
  import { round } from '$lib/utils';

  export let data: PageData;

  if (browser) {
    const interval = setInterval(() => {
      invalidateAll();
    }, 5000);

    onDestroy(() => clearInterval(interval));
  }

  $: orders = [...data.orders].sort((a, b) => (a.Ticker < b.Ticker ? -1 : 1));
</script>

<div class="max-w-4xl mx-auto">
  <h1 class="text-2xl pb-8 pt-8">Orders for {data.company}</h1>
  <div class="table shadow-lg border border-slate-200 dark:border-slate-400/20">
    <div class="table-header-group">
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        MAT
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        CX
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        TYPE
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        AMT
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        PRICE
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        BID
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        ASK
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-r border-slate-200 dark:border-slate-400/20"
      >
        SPRD
      </div>
      <div
        class="table-cell p-4 font-medium text-left border-b-4 border-slate-200 dark:border-slate-400/20"
      >
        OUTBID
      </div>
    </div>
    {#each orders as order, index}
      {@const last = index === orders.length - 1}
      {#each order.Orders as ord}
        {@const sniped = order.Market[ord.Type === 'Buy' ? 'Bid' : 'Ask'] !== ord.Cost}
        {@const snipes =
          ord.Type === 'Buy'
            ? order.Market.BuyingOrders.filter((otherOrder) => otherOrder.ItemCost > ord.Cost)
            : order.Market.SellingOrders.filter((otherOrder) => otherOrder.ItemCost < ord.Cost)}
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
            {round(ord.Cost)}
          </div>
          <div
            class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
            class:border-b={!last}
            class:sniped
          >
            {round(order.Market.Bid)}
          </div>
          <div
            class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
            class:border-b={!last}
            class:sniped
          >
            {round(order.Market.Ask)}
          </div>
          <div
            class="table-cell p-4 text-left border-r border-slate-200 dark:border-slate-400/20"
            class:border-b={!last}
            class:sniped
          >
            {round(order.Market.Ask - order.Market.Bid)}
          </div>
          <div
            class="table-cell p-4 text-left border-slate-200 dark:border-slate-400/20"
            class:border-b={!last}
            class:sniped
          >
            {#if sniped}
              {snipes.reduce((acc, o) => acc + o.ItemCount, 0)} @ ±{ord.Type === 'Buy'
                ? round(order.Market.Bid - ord.Cost)
                : round(ord.Cost - order.Market.Ask)}
            {/if}
          </div>
        </div>
      {/each}
    {/each}
  </div>
</div>

<style lang="postcss">
  .sniped {
    background-color: rgba(var(--color-error-500));
  }
</style>
