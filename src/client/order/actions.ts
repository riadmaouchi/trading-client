import { createAction } from 'redux-actions';
import { OrderData, LastOrderPlacingStatus } from './model/orderData';
import { Order } from './model/order';
import { LastTrade } from './model/lastTrade';
import { SubmitOrder } from './model/submitOrder';
import { ConnectionStatus } from '../layout/loader/model/serviceStatus';

export enum TILE_ACTION_TYPES {
  EDIT_NOTIONAL = 'EDIT_NOTIONAL',
  EDIT_ORDER_TYPE = 'EDIT_ORDER_TYPE',
  EDIT_LIMIT = 'EDIT_LIMIT',
  SUBSCRIBE_ORDER_BOOK = 'SUBSCRIBE_ORDER_BOOK',
  SUBSCRIBE_LAST_TRADES = 'SUBSCRIBE_LAST_TRADES',
  UPDATE_ORDER = 'UPDATE_ORDER',
  UPDATE_TRADE = 'UPDATE_TRADE',
  UPDATE_INDICATORS = 'UPDATE_INDICATORS',
  SUBSCRIBE_MARKET_PRICE = 'SUBSCRIBE_MARKET_PRICE',
  UPDATE_MARKET_PRICE = 'UPDATE_MARKET_PRICE',
  SUBMIT_ORDER = 'SUBMIT_ORDER',
  ORDER_PLACED = 'ORDER_PLACED',
  SUBSCRIBE_ORDER_BOOK_CONNECTION_STATE = 'SUBSCRIBE_ORDER_BOOK_CONNECTION_STATE',
  ORDER_BOOK_CONNECTION_STATUS_UPDATED = 'ORDER_BOOK_CONNECTION_STATUS_UPDATED',
  DISMISS_ORDER_NOTIFICATION = 'DISMISS_ORDER_NOTIFICATION',
  SUBSCRIBE_INDICATORS = 'SUBSCRIBE_INDICATORS',
  EXECUTION_API_URL_UPDATED = 'EXECUTION_API_URL_UPDATED',
  UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE = 'UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE'
}

export const OrderAction = {
  editOrderType: createAction<OrderData>(TILE_ACTION_TYPES.EDIT_ORDER_TYPE),
  editLimit: createAction<OrderData>(TILE_ACTION_TYPES.EDIT_LIMIT),
  editNotional: createAction<OrderData>(TILE_ACTION_TYPES.EDIT_NOTIONAL),
  subscribeOrderBook: createAction(TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK),
  subscribeLastTrades: createAction(TILE_ACTION_TYPES.SUBSCRIBE_LAST_TRADES),
  subscribeIndicators: createAction(TILE_ACTION_TYPES.SUBSCRIBE_INDICATORS),
  subscribeOrderbookConnectionState: createAction<string>(
    TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK_CONNECTION_STATE
  ),
  unsubscribeOrderbookConnectionState: createAction(
    TILE_ACTION_TYPES.UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE
  ),
  updateOrder: createAction<Order[]>(TILE_ACTION_TYPES.UPDATE_ORDER),
  updateTrade: createAction<LastTrade[]>(TILE_ACTION_TYPES.UPDATE_TRADE),
  updateIndicators: createAction<LastTrade>(
    TILE_ACTION_TYPES.UPDATE_INDICATORS
  ),
  dismissOrderNotification: createAction<OrderData>(
    TILE_ACTION_TYPES.DISMISS_ORDER_NOTIFICATION
  ),
  subscribeToMarketPrice: createAction(
    TILE_ACTION_TYPES.SUBSCRIBE_MARKET_PRICE
  ),
  updateMarketPrice: createAction<LastTrade>(
    TILE_ACTION_TYPES.UPDATE_MARKET_PRICE
  ),
  submitOrder: createAction<SubmitOrder>(TILE_ACTION_TYPES.SUBMIT_ORDER),
  onOrderPlaced: createAction<LastOrderPlacingStatus>(
    TILE_ACTION_TYPES.ORDER_PLACED
  ),
  onOrderbookConnectionStatusUpdated: createAction<ConnectionStatus>(
    TILE_ACTION_TYPES.ORDER_BOOK_CONNECTION_STATUS_UPDATED
  ),
  executionApiUrlUpdated: createAction<string>(
    TILE_ACTION_TYPES.EXECUTION_API_URL_UPDATED
  )
};
