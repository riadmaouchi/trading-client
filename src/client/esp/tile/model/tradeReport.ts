export interface TradeReport {
  tradeDate: string;
  id: string;
  symbol: string;
  direction: string;
  notional: number;
  price: number;
  status: string;
}
