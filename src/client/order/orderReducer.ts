import { handleActions, Action } from 'redux-actions';
import moment from 'moment';
import { TILE_ACTION_TYPES } from './actions';
import { OrderData, LastOrderPlacingStatus } from './model/orderData';
import { Order } from './model/order';
import { LastTrade } from './model/lastTrade';
import { ConnectionStatus } from '../layout/loader/model/serviceStatus';

const initialState: OrderData = {
  orderPanelData: {
    symbol: 'EURUSD',
    tenor: 'SP',
    settlementDate: moment()
      .add(2, 'days')
      .format('L'),
    notional: 1000000,
    limit: 0,
    orderType: 'limit'
  },
  buyOrder: [],
  sellOrder: [],
  lastTrades: [],
  indicators: [],
  connectionState: null,
  lastOrderPlacingStatus: null,
  placing: false
};

export default handleActions<OrderData, any>(
  {
    [TILE_ACTION_TYPES.EDIT_NOTIONAL]: (
      state: OrderData,
      action: Action<OrderData>
    ): OrderData => {
      return { ...state, orderPanelData: action.payload.orderPanelData };
    },
    [TILE_ACTION_TYPES.EDIT_ORDER_TYPE]: (
      state: OrderData,
      action: Action<OrderData>
    ): OrderData => {
      return { ...state, orderPanelData: action.payload.orderPanelData };
    },
    [TILE_ACTION_TYPES.EDIT_LIMIT]: (
      state: OrderData,
      action: Action<OrderData>
    ): OrderData => {
      return { ...state, orderPanelData: action.payload.orderPanelData };
    },
    [TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK]: (state: OrderData): OrderData =>
      state,
    [TILE_ACTION_TYPES.UPDATE_ORDER]: (
      state: OrderData,
      action: Action<Order[]>
    ): OrderData => {
      const buyOrders = new Map();
      state.buyOrder.forEach(order => buyOrders.set(order.price, order));
      action.payload
        .filter(order => order.side === 'BUY')
        .forEach(order => buyOrders.set(order.price, order));

      const sellOrders = new Map();
      state.sellOrder.forEach(order => sellOrders.set(order.price, order));
      action.payload
        .filter(order => order.side === 'SELL')
        .forEach(order => sellOrders.set(order.price, order));

      return {
        ...state,
        buyOrder: [...buyOrders.values()].filter(order => order.size !== 0),
        sellOrder: [...sellOrders.values()].filter(order => order.size !== 0)
      };
    },
    [TILE_ACTION_TYPES.SUBSCRIBE_LAST_TRADES]: (state: OrderData): OrderData =>
      state,
    [TILE_ACTION_TYPES.UPDATE_TRADE]: (
      state: OrderData,
      action: Action<LastTrade[]>
    ): OrderData => {
      return {
        ...state,
        lastTrades: [...state.lastTrades, ...action.payload]
      };
    },
    [TILE_ACTION_TYPES.SUBSCRIBE_INDICATORS]: (state: OrderData): OrderData =>
      state,
    [TILE_ACTION_TYPES.UPDATE_INDICATORS]: (
      state: OrderData,
      action: Action<LastTrade>
    ): OrderData => {
      return {
        ...state,
        indicators: [...state.indicators, action.payload]
      };
    },
    [TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK_CONNECTION_STATE]: (
      state: OrderData
    ): OrderData => state,
    [TILE_ACTION_TYPES.ORDER_BOOK_CONNECTION_STATUS_UPDATED]: (
      state: OrderData,
      action: Action<ConnectionStatus>
    ): OrderData => {
      return { ...state, connectionState: action.payload };
    },
    [TILE_ACTION_TYPES.SUBSCRIBE_MARKET_PRICE]: (state: OrderData): OrderData =>
      state,
    [TILE_ACTION_TYPES.UPDATE_MARKET_PRICE]: (
      state: OrderData,
      action: Action<LastTrade>
    ): OrderData => {
      return {
        ...state,
        orderPanelData: {
          ...state.orderPanelData,
          limit: action.payload.lastPrice
        }
      };
    },
    [TILE_ACTION_TYPES.SUBMIT_ORDER]: (state: OrderData): OrderData => {
      return { ...state, placing: true };
    },
    [TILE_ACTION_TYPES.DISMISS_ORDER_NOTIFICATION]: (
      state: OrderData
    ): OrderData => {
      return {
        ...state,
        lastOrderPlacingStatus: null
      };
    },
    [TILE_ACTION_TYPES.ORDER_PLACED]: (
      state: OrderData,
      action: Action<LastOrderPlacingStatus>
    ): OrderData => {
      return {
        ...state,
        lastOrderPlacingStatus: action.payload,
        placing: false
      };
    }
  },
  initialState
);
