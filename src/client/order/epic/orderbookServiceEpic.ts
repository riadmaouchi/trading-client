import { map, mergeMap, bufferTime, filter } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { OrderAction } from '../actions';
import { ApplicationEpic } from '../../actionType';
import OrderbookService from './orderbookService';
import { TILE_ACTION_TYPES } from '../actions';

const {
  updateOrder,
  updateTrade,
  updateMarketPrice,
  subscribeOrderBook,
  subscribeLastTrades,
  subscribeToMarketPrice
} = OrderAction;
type SubscribeToOrderBookAction = ReturnType<typeof subscribeOrderBook>;
type SubscribeToTradeExecutedAction = ReturnType<typeof subscribeLastTrades>;
type SubscribeToMarketPriceAction = ReturnType<typeof subscribeToMarketPrice>;
const orderbookService = new OrderbookService();

export const orderbookServiceEpic: ApplicationEpic = (action$, state$) => {
  return action$.pipe(
    ofType<Action, SubscribeToOrderBookAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK
    ),
    mergeMap((action: SubscribeToOrderBookAction) =>
      orderbookService.getOrderStream().pipe(
        bufferTime(1000),
        filter(buffer => buffer.length > 0),
        map(updateOrder)
      )
    )
  );
};

export const onTradeExecuted: ApplicationEpic = (action$, state$) => {
  return action$.pipe(
    ofType<Action, SubscribeToTradeExecutedAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_LAST_TRADES
    ),
    mergeMap((action: SubscribeToTradeExecutedAction) =>
      orderbookService.getLastTradeStream().pipe(
        bufferTime(1000),
        filter(buffer => buffer.length > 0),
        map(updateTrade)
      )
    )
  );
};

export const onMarketPrice: ApplicationEpic = (action$, state$) => {
  return action$.pipe(
    ofType<Action, SubscribeToTradeExecutedAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_MARKET_PRICE
    ),
    mergeMap((action: SubscribeToMarketPriceAction) =>
      orderbookService.getMarketPrice().pipe(map(updateMarketPrice))
    )
  );
};
