const baseUrl = `https://rest.fnar.net`;

interface FetchOptions {
  fetch?: typeof fetch;
  apiKey?: string;
}

async function request<T>(slug: string, options: FetchOptions | undefined): Promise<T> {
  const response = await (options?.fetch || fetch)(`${baseUrl}/${slug}`, options?.apiKey ? {
    headers: {
      'Authorization': options.apiKey
    }
  } : {});
  const data = await response.json();
  return data;
}

export async function exchangeFull(options?: FetchOptions): Promise<CXOB[]> {
  return request('exchange/full', options);
}

export async function exchangeAll(options?: FetchOptions): Promise<ExchangeSummary> {
  return request('exchange/all', options);
}

export async function exchangeOrdersForCompany(company: string, options?: FetchOptions): Promise<CXOS[]> {
  return request(`exchange/orders/${company}`, options);
}

export async function exchangeForTicker(ticker: string, options?: FetchOptions): Promise<CXOB> {
  return request(`exchange/${ticker}`, options);
}

export async function productionForUser(username: string, options?: FetchOptions): Promise<Production[]> {
  return request(`production/${username}`, options);
}

interface Production {
  StandardRecipeName: string;
}

interface ExchangeSummary {
  MaterialTicker: string;
  ExchangeCode: string;
  MMBuy: number | null;
  MMSell: number | null;
  PriceAverage: number;
  AskCount: number | null;
  Ask: number | null;
  Supply: number;
  BidCount: number | null;
  Bid: number | null;
  Demand: number;
}

interface CXOSDetails {
  Count: number;
  Cost: number;
}

interface CXOS {
  Ticker: string;
  Buys: CXOSDetails[];
  Sells: CXOSDetails[];
}

export interface CXOB {
  BuyingOrders: CXOBOrder[];
  SellingOrders: CXOBOrder[];
  CXDataModelId: string;
  MaterialName: string;
  MaterialTicker: string;
  MaterialId: string;
  ExchangeName: string;
  ExchangeCode: string;
  Currency: string;
  Previous: number | null; // TODO figure out
  Price: number;
  PriceTimeEpochMs: number;
  High: number;
  AllTimeHigh: number;
  Low: number;
  AllTimeLow: number;
  Ask: number;
  AskCount: number;
  Bid: number;
  BidCount: number;
  Supply: number;
  Demand: number;
  Traded: number;
  VolumeAmount: number;
  PriceAverage: number;
  NarrowPriceBandLow: number;
  NarrowPriceBandHigh: number;
  WidePriceBandLow: number;
  WidePriceBandHigh: number;
  MMBuy: number | null;
  MMSell: number | null;
  UserNameSubmitted: string;
  Timestamp: string;
}

export interface CXOBOrder {
  OrderId: string;
  CompanyId: string;
  CompanyName: string;
  CompanyCode: string;
  ItemCount: number;
  ItemCost: number;
}
