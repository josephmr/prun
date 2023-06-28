<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import type { PageData } from './$types';
  import { browser } from '$app/environment';
  import { round } from '$lib/utils';
  import { DataHandler } from '@vincjo/datatables';
  // import { DataHandler, Th } from '@vincjo/datatables';
  import Datatable from '$lib/datatable/Datatable.svelte';
  import Th from '$lib/datatable/Th.svelte';

  export let data: PageData;

  if (browser) {
    const interval = setInterval(() => {
      invalidateAll();
    }, 10000);

    onDestroy(() => clearInterval(interval));
  }

  const handler = new DataHandler();
  const rows = handler.getRows();

  $: {
    handler.setRows(
      data.orders.flatMap((order) => {
        return order.Orders.map((details) => {
          const snipes =
            details.Type === 'Buy'
              ? order.Market.BuyingOrders.filter((otherOrder) => otherOrder.ItemCost > details.Cost)
              : order.Market.SellingOrders.filter(
                  (otherOrder) => otherOrder.ItemCost < details.Cost
                );
          return {
            material: order.Market.MaterialTicker,
            exchange: order.Market.ExchangeCode,
            type: details.Type,
            count: details.Count,
            cost: round(details.Cost),
            bid: round(order.Market.Bid),
            ask: round(order.Market.Ask),
            spread: round(order.Market.Ask - order.Market.Bid),
            snipe: snipes.length
              ? `${snipes.reduce((acc, o) => acc + o.ItemCount, 0)} @ ± ${
                  details.Type === 'Buy'
                    ? round(order.Market.Bid - details.Cost)
                    : round(details.Cost - order.Market.Ask)
                }`
              : ''
          };
        });
      })
    );
  }
</script>

<div class="max-w-4xl mx-auto">
  <h1 class="text-2xl pb-4 pt-8">Orders for {data.company}</h1>
  <Datatable {handler}>
    <div class="max-h-screen-80 overflow-scroll">
      <div class="table overflow-scroll">
        <div class="table-header-group">
          <Th {handler} orderBy="material">MAT</Th>
          <Th {handler} orderBy="exchange">CX</Th>
          <Th {handler} orderBy="type">TYPE</Th>
          <Th {handler} orderBy="count">AMT</Th>
          <Th {handler} orderBy="cost">COST</Th>
          <Th {handler} orderBy="bid">BID</Th>
          <Th {handler} orderBy="ask">ASK</Th>
          <Th {handler} orderBy="spread">SPRD</Th>
          <Th {handler} orderBy="snipe">OUTBID</Th>
        </div>
        {#each $rows as row}
          <div class:sniped={!!row.snipe} class="table-row">
            <div class="table-cell p-4 pb-2 pt-2">{row.material}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.exchange}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.type}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.count}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.cost}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.bid}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.ask}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.spread}</div>
            <div class="table-cell p-4 pb-2 pt-2">{row.snipe}</div>
          </div>
        {/each}
      </div>
    </div>
  </Datatable>
</div>

<style lang="postcss">
  .sniped {
    background-color: rgba(var(--color-error-500));
  }
  .table {
    border-collapse: separate;
    border-spacing: 0;
  }
  .table-header-group {
    position: sticky;
    inset-block-start: 0;
    background-color: rgba(var(--color-surface-800));
  }
  .max-h-screen-80 {
    max-height: 80vh;
  }
</style>
