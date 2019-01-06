import { PriceLadder } from './priceTick';

export interface TileData {
  id: number;
  tenor: string;
  settlementDate: string;
  notional: number;
  price: PriceLadder;
  executingBuy: boolean;
  executingSell: boolean;
}
