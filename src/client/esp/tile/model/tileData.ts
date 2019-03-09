import { PriceLadder } from './priceTick';
import { TradeRequest } from './tradeRequest';
import { TradeReport } from './tradeReport';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';

export interface TileData {
  id: number;
  tenor: string;
  settlementDate: string;
  notional: number;
  price: PriceLadder;
  precision: number;
  lastExecutionStatus?: LastExecutionStatus | null;
  executing: boolean;
  pricingConnectionState: ConnectionStatus;
  url?: string | null;
  pricingConnectionUrl?: string | null;
}

export interface LastExecutionStatus {
  request: TradeRequest;
  hasError: boolean;
  error?: string;
  trade: TradeReport;
}
