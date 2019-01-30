import { createAction } from 'redux-actions';
import { TileData, LastExecutionStatus } from './model/tileData';
import { PriceLadder } from './model/index';
import { ActionUnion } from '../../actionType';
import { TradeRequest } from './model/tradeRequest';
import { ConnectionStatus } from '../../layout/loader/model/serviceStatus';

export enum TILE_ACTION_TYPES {
  EDIT_NOTIONAL = 'EDIT_NOTIONAL',
  UPDATE_PRICE = 'UPDATE_PRICE',
  TILE_SUBSCRIBE = 'TILE_SUBSCRIBE',
  EXECUTE_TRADE = 'EXECUTE_TRADE',
  TRADE_EXECUTED = 'TRADE_EXECUTED',
  DISMISS_EXECUTION_NOTIFICATION = 'DISMISS_EXECUTION_NOTIFICATION',
  SUBSCRIBE_PRICING_CONNECTION_STATE = 'SUBSCRIBE_PRICING_CONNECTION_STATE',
  PRICING_CONNECTION_STATUS_UPDATED = 'PRICING_CONNECTION_STATUS_UPDATED'
}

export const TileActions = {
  editNotional: createAction<TileData>(TILE_ACTION_TYPES.EDIT_NOTIONAL),
  updatePrice: createAction<PriceLadder>(TILE_ACTION_TYPES.UPDATE_PRICE),
  tileSubscribe: createAction<TileData>(TILE_ACTION_TYPES.TILE_SUBSCRIBE),
  executeTrade: createAction<TradeRequest>(TILE_ACTION_TYPES.EXECUTE_TRADE),
  tradeExecuted: createAction<LastExecutionStatus>(
    TILE_ACTION_TYPES.TRADE_EXECUTED
  ),
  dismissExecutionNotification: createAction<TileData>(
    TILE_ACTION_TYPES.DISMISS_EXECUTION_NOTIFICATION
  ),
  subscribePricingConnectionState: createAction(
    TILE_ACTION_TYPES.SUBSCRIBE_PRICING_CONNECTION_STATE
  ),
  onPricingConnectionStatusUpdated: createAction<ConnectionStatus>(
    TILE_ACTION_TYPES.PRICING_CONNECTION_STATUS_UPDATED
  )
};

export type TileActions = ActionUnion<typeof TileActions>;
