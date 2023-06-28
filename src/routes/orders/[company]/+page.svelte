<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import type { PageData } from './$types';
  import { browser } from '$app/environment';
  import { round } from '$lib/utils';
  import { Datatable, Th, DataHandler } from '@vincjo/datatables';

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
  <Datatable {handler} rowsPerPage={false} pagination={false} rowCount={false}>
    <table>
      <thead>
        <tr>
          <Th {handler} orderBy="material">MAT</Th>
          <Th {handler} orderBy="exchange">CX</Th>
          <Th {handler} orderBy="type">TYPE</Th>
          <Th {handler} orderBy="count">AMT</Th>
          <Th {handler} orderBy="cost">COST</Th>
          <Th {handler} orderBy="bid">BID</Th>
          <Th {handler} orderBy="ask">ASK</Th>
          <Th {handler} orderBy="spread">SPRD</Th>
          <Th {handler} orderBy="snipe">OUTBID</Th>
        </tr>
      </thead>
      <tbody>
        {#each $rows as row}
          <tr class:sniped={!!row.snipe}>
            <td>{row.material}</td>
            <td>{row.exchange}</td>
            <td>{row.type}</td>
            <td>{row.count}</td>
            <td>{row.cost}</td>
            <td>{row.bid}</td>
            <td>{row.ask}</td>
            <td>{row.spread}</td>
            <td>{row.snipe}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Datatable>
</div>

<style lang="postcss">
  .sniped {
    background-color: rgba(var(--color-error-500));
  }
</style>
