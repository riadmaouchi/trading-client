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
  updateIndicators,
  updateMarketPrice,
  subscribeOrderBook,
  subscribeLastTrades,
  subscribeIndicators,
  subscribeToMarketPrice,
  subscribeOrderbookConnectionState,
  onOrderbookConnectionStatusUpdated
} = OrderAction;
type SubscribeToOrderBookAction = ReturnType<typeof subscribeOrderBook>;
type SubscribeToTradeExecutedAction = ReturnType<typeof subscribeLastTrades>;
type SubscribeToIndicatorsAction = ReturnType<typeof subscribeIndicators>;
type SubscribeToMarketPriceAction = ReturnType<typeof subscribeToMarketPrice>;
type SubscribeOrderbookConnectionStateAction = ReturnType<
  typeof subscribeOrderbookConnectionState
>;
const orderbookService = new OrderbookService();

export const orderbookServiceEpic: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    ofType<Action, SubscribeToOrderBookAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK
    ),
    mergeMap((action: SubscribeToOrderBookAction) =>
      orderbookService.getOrderStream().pipe(
        bufferTime(250),
        filter(buffer => buffer.length > 0),
        map(updateOrder)
      )
    )
  );

export const onTradeExecuted: ApplicationEpic = (action$, state$) =>
  action$.pipe(
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

export const onIndicatorsUpdated: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    ofType<Action, SubscribeToIndicatorsAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_INDICATORS
    ),
    mergeMap((action: SubscribeToIndicatorsAction) =>
      orderbookService.getIndicatorsStream().pipe(map(updateIndicators))
    )
  );

export const onMarketPrice: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    ofType<Action, SubscribeToTradeExecutedAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_MARKET_PRICE
    ),
    mergeMap((action: SubscribeToMarketPriceAction) =>
      orderbookService.getMarketPrice().pipe(map(updateMarketPrice))
    )
  );

export const orderbookConnectionStatusUpdated: ApplicationEpic = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<Action, SubscribeOrderbookConnectionStateAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK_CONNECTION_STATE
    ),
    mergeMap((action: SubscribeOrderbookConnectionStateAction) =>
      orderbookService
        .getConnectionStream()
        .pipe(map(onOrderbookConnectionStatusUpdated))
    )
  );
