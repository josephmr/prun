import type { PageLoad } from './$types';
import client, { type CXOB } from '$lib/api/fio';

export const load = (async ({ params }) => {
  const response = await client.exchange.getExchangeOrdersCompanyCode(params.company);
  let latestExchangeOrders;
  if (response.data.length > 5) {
    latestExchangeOrders = (await client.exchange.getExchangeFull()).data;
  } else {
    latestExchangeOrders = await Promise.all(
      response.data.map(async (order) => {
        const response = await client.exchange.getExchangeExchangeTicker(order.Ticker);
        return response.data;
      })
    );
  }
  const latestExchangeOrdersByMat = latestExchangeOrders.reduce((acc, v) => {
    acc[`${v.MaterialTicker}.${v.ExchangeCode}`] = v;
    return acc;
  }, {} as { [ticker: string]: CXOB });
  return {
    company: params.company,
    orders: response.data.map((order) => ({
      Ticker: order.Ticker,
      Orders: [
        ...order.Buys.map((buy) => ({ ...buy, Type: 'Buy' })),
        ...order.Sells.map((sell) => ({ ...sell, Type: 'Sell' }))
      ],
      Market: latestExchangeOrdersByMat[order.Ticker]
    }))
  };
}) satisfies PageLoad;
