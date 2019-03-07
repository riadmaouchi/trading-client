export interface Price {
  quantity: number;
  price: number;
  mouvement?: Movements;
}

export interface PriceLadder {
  id: number;
  time: string;
  symbol: string;
  mid: number;
  bids: Price[];
  asks: Price[];
  priceStale?: boolean;
}

export enum Movements {
  Up = 'up',
  Down = 'down',
  None = 'none'
}
