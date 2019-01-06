export interface OrderUpdate {
  id: string;
  symbol: string;
  direction: string;
  requestedAmount: number;
  leftAmount: number;
  amount: number;
  price: number;
  status: string;
  type: string;
}
