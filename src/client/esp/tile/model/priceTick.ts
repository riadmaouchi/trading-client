export interface Price {
  quantity: number;
  price: number;
}

export interface PriceLadder {
  id: number;
  time: string;
  symbol: string;
  bids: Price[];
  asks: Price[];
  priceStale?: boolean;
}
