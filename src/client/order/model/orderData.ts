import { Order } from './order';
import { LastTrade } from './lastTrade';
import { SubmitOrder } from './submitOrder';
import { ConnectionStatus } from '../../layout/loader/model/serviceStatus';

export interface OrderData {
  orderPanelData: OrderPanelData;
  buyOrder: Order[];
  sellOrder: Order[];
  lastTrades: LastTrade[];
  indicators: LastTrade[];
  connectionState: ConnectionStatus;
  lastOrderPlacingStatus?: LastOrderPlacingStatus | null;
  placing: boolean;
}

export interface LastOrderPlacingStatus {
  request: SubmitOrder;
  hasError: boolean;
  error?: string;
}

export interface OrderPanelData {
  symbol: string;
  tenor: string;
  settlementDate: string;
  notional: number;
  limit: number;
  orderType: string;
}
