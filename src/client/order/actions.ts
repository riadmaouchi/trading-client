import { createAction } from 'redux-actions';
import { OrderData } from './model/orderData';
import { Order } from './model/order';
import { LastTrade } from './model/lastTrade';
import { SubmitOrder } from './model/submitOrder';

export enum TILE_ACTION_TYPES {
  EDIT_NOTIONAL = 'EDIT_NOTIONAL',
  EDIT_ORDER_TYPE = 'EDIT_ORDER_TYPE',
  EDIT_LIMIT = 'EDIT_LIMIT',
  SUBSCRIBE_ORDER_BOOK = 'SUBSCRIBE_ORDER_BOOK',
  SUBSCRIBE_LAST_TRADES = 'SUBSCRIBE_LAST_TRADES',
  UPDATE_ORDER = 'UPDATE_ORDER',
  UPDATE_TRADE = 'UPDATE_TRADE',
  SUBSCRIBE_MARKET_PRICE = 'SUBSCRIBE_MARKET_PRICE',
  UPDATE_MARKET_PRICE = 'UPDATE_MARKET_PRICE',
  SUBMIT_ORDER = 'SUBMIT_ORDER',
  ORDER_PLACED = 'ORDER_PLACED'
}

export const OrderAction = {
  editOrderType: createAction<OrderData>(TILE_ACTION_TYPES.EDIT_ORDER_TYPE),
  editLimit: createAction<OrderData>(TILE_ACTION_TYPES.EDIT_LIMIT),
  editNotional: createAction<OrderData>(TILE_ACTION_TYPES.EDIT_NOTIONAL),
  subscribeOrderBook: createAction(TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK),
  subscribeLastTrades: createAction(TILE_ACTION_TYPES.SUBSCRIBE_LAST_TRADES),
  updateOrder: createAction<Order[]>(TILE_ACTION_TYPES.UPDATE_ORDER),
  updateTrade: createAction<LastTrade[]>(TILE_ACTION_TYPES.UPDATE_TRADE),
  subscribeToMarketPrice: createAction(
    TILE_ACTION_TYPES.SUBSCRIBE_MARKET_PRICE
  ),
  updateMarketPrice: createAction<LastTrade>(
    TILE_ACTION_TYPES.UPDATE_MARKET_PRICE
  ),
  submitOrder: createAction<SubmitOrder>(TILE_ACTION_TYPES.SUBMIT_ORDER),
  onOrderPlaced: createAction<SubmitOrder>(TILE_ACTION_TYPES.ORDER_PLACED)
};
