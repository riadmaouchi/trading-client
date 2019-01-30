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
  executingBuy: boolean;
  executingSell: boolean;
  lastExecutionStatus?: LastExecutionStatus | null;
  executing: boolean;
  pricingConnectionState: ConnectionStatus;
}

export interface LastExecutionStatus {
  request: TradeRequest;
  hasError: boolean;
  error?: string;
  trade: TradeReport;
}
