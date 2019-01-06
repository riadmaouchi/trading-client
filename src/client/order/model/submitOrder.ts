export interface SubmitOrder {
  price: number;
  symbol: string;
  broker: string;
  side: string;
  amount: number;
  type: string;
}
