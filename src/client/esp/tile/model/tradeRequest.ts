export interface TradeRequest {
  id: number;
  price: number;
  symbol: string;
  broker: string;
  side: string;
  quantity: number;
  url: string;
}
