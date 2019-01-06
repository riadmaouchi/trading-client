import { Order } from './order';
import { LastTrade } from './lastTrade';

export interface OrderData {
  orderPanelData: OrderPanelData;
  buyOrder: Order[];
  sellOrder: Order[];
  lastTrades: LastTrade[];
}

export interface OrderPanelData {
  symbol: string;
  tenor: string;
  settlementDate: string;
  notional: number;
  limit: number;
  orderType: string;
}

