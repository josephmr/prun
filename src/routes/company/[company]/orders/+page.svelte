<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import { round } from '$lib/utils';
  import { DataHandler } from '@vincjo/datatables';
  import { Datatable } from '$lib/components/datatable';

  export let data: PageData;

  onMount(() => {
    const interval = setInterval(() => {
      invalidate('orders:');
    }, 10000);

    return () => clearInterval(interval);
  });

  const handler = new DataHandler();

  const rowDefinitions = [
    {
      header: 'MAT',
      key: 'material'
    },
    {
      header: 'CX',
      key: 'exchange'
    },
    {
      header: 'TYPE',
      key: 'type'
    },
    {
      header: 'UNITS',
      key: 'count',
      asNumber: true
    },
    {
      header: 'COST',
      key: 'cost',
      asNumber: true
    },
    {
      header: 'TOTAL',
      key: 'total',
      asNumber: true
    },
    {
      header: 'BID',
      key: 'bid',
      asNumber: true
    },
    {
      header: 'ASK',
      key: 'ask',
      asNumber: true
    },
    {
      header: 'SPRD',
      key: 'spread',
      asNumber: true
    },
    {
      header: 'OUTBID',
      key: 'snipe',
      orderBy: 'snipeSort'
    }
  ];

  $: {
    handler.setRows(
      data.orders.flatMap((order) => {
        const [material, exchange] = order.Ticker.split('.');
        return order.Orders.map((details) => {
          const snipes =
            details.Type === 'Buy'
              ? order.Market.BuyingOrders.filter((otherOrder) => otherOrder.ItemCost > details.Cost)
              : order.Market.SellingOrders.filter(
                  (otherOrder) => otherOrder.ItemCost < details.Cost
                );
          const snipeOutbid =
            details.Type === 'Buy'
              ? order.Market.Bid - details.Cost
              : details.Cost - order.Market.Ask;
          return {
            material,
            exchange,
            type: details.Type,
            count: details.Count,
            cost: details.Cost,
            total: details.Count * details.Cost,
            bid: order.Market.Bid,
            ask: order.Market.Ask,
            spread: order.Market.Ask - order.Market.Bid,
            snipeSort: snipeOutbid,
            snipe: snipes.length
              ? `${snipes.reduce((acc, o) => acc + o.ItemCount, 0)} @ ± ${round(snipeOutbid)}`
              : ''
          };
        });
      })
    );
  }
</script>

<div class="max-w-6xl mx-auto">
  <h1 class="text-2xl pb-4 pt-8">Orders for {data.company}</h1>
  <Datatable {handler} {rowDefinitions} />
</div>
