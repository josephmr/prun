import axios from 'axios';
import type { AxiosResponse } from 'axios';
import {
  getExchangeAll,
  getExchangeExchangeTicker,
  getExchangeOrdersCompanyCode
} from './generated/fio';

axios.defaults.baseURL = `https://rest.fnar.net`;

function setupClient() {
  return {
    exchange: {
      getExchangeAll: getExchangeAll<AxiosResponse<ExchangeSummary[]>>,
      getExchangeOrdersCompanyCode: getExchangeOrdersCompanyCode<AxiosResponse<CXOS[]>>,
      getExchangeExchangeTicker: getExchangeExchangeTicker<AxiosResponse<CXOB>>
    }
  };
}

const client = setupClient();

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

export default client;
