import { createAction } from 'redux-actions';
import { TileData } from './model/tileData';
import { PriceLadder } from './model/index';
import { ActionUnion } from '../../actionType';
import { TradeRequest } from './model/tradeRequest';

export enum TILE_ACTION_TYPES {
  EDIT_NOTIONAL = 'EDIT_NOTIONAL',
  UPDATE_PRICE = 'UPDATE_PRICE',
  TILE_SUBSCRIBE = 'TILE_SUBSCRIBE',
  EXECUTE_TRADE = 'EXECUTE_TRADE',
  TRADE_EXECUTED = 'TRADE_EXECUTED'
}

export const TileActions = {
  editNotional: createAction<TileData>(TILE_ACTION_TYPES.EDIT_NOTIONAL),
  updatePrice: createAction<PriceLadder>(TILE_ACTION_TYPES.UPDATE_PRICE),
  tileSubscribe: createAction<TileData>(TILE_ACTION_TYPES.TILE_SUBSCRIBE),
  executeTrade: createAction<TradeRequest>(TILE_ACTION_TYPES.EXECUTE_TRADE),
  tradeExecuted: createAction<TradeRequest>(TILE_ACTION_TYPES.TRADE_EXECUTED)
};

export type TileActions = ActionUnion<typeof TileActions>;
