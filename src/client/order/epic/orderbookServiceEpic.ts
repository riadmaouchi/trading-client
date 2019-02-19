import {
  map,
  mergeMap,
  bufferTime,
  filter,
  takeUntil,
  switchMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { OrderAction } from '../actions';
import { ApplicationEpic } from '../../actionType';
import { TILE_ACTION_TYPES } from '../actions';

const {
  updateOrder,
  updateTrade,
  updateIndicators,
  updateMarketPrice,
  subscribeOrderBook,
  subscribeLastTrades,
  subscribeIndicators,
  subscribeOrderbookConnectionState,
  onOrderbookConnectionStatusUpdated
} = OrderAction;
type SubscribeToOrderBookAction = ReturnType<typeof subscribeOrderBook>;
type SubscribeToTradeExecutedAction = ReturnType<typeof subscribeLastTrades>;
type SubscribeToIndicatorsAction = ReturnType<typeof subscribeIndicators>;
type SubscribeOrderbookConnectionStateAction = ReturnType<
  typeof subscribeOrderbookConnectionState
>;

export const orderbookServiceEpic: ApplicationEpic = (
  action$,
  state$,
  { orderbookService }
) =>
  action$.pipe(
    ofType<Action, SubscribeToOrderBookAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK
    ),
    mergeMap(() =>
      orderbookService.getOrderStream().pipe(
        bufferTime(250),
        filter(buffer => buffer.length > 0),
        map(updateOrder),
        takeUntil(
          action$.pipe(
            ofType(TILE_ACTION_TYPES.UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE)
          )
        )
      )
    )
  );

export const onTradeExecuted: ApplicationEpic = (
  action$,
  state$,
  { orderbookService }
) =>
  action$.pipe(
    ofType<Action, SubscribeToTradeExecutedAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_LAST_TRADES
    ),
    mergeMap(() =>
      orderbookService.getLastTradeStream().pipe(
        bufferTime(250),
        filter(buffer => buffer.length > 0),
        map(updateTrade),
        takeUntil(
          action$.pipe(
            ofType(TILE_ACTION_TYPES.UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE)
          )
        )
      )
    )
  );

export const onIndicatorsUpdated: ApplicationEpic = (
  action$,
  state$,
  { orderbookService }
) =>
  action$.pipe(
    ofType<Action, SubscribeToIndicatorsAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_INDICATORS
    ),
    mergeMap(() =>
      orderbookService.getIndicatorsStream().pipe(
        map(updateIndicators),
        takeUntil(
          action$.pipe(
            ofType(TILE_ACTION_TYPES.UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE)
          )
        )
      )
    )
  );

export const onMarketPrice: ApplicationEpic = (
  action$,
  state$,
  { orderbookService }
) =>
  action$.pipe(
    ofType<Action, SubscribeToTradeExecutedAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_MARKET_PRICE
    ),
    mergeMap(() =>
      orderbookService.getMarketPrice().pipe(
        map(updateMarketPrice),
        takeUntil(
          action$.pipe(
            ofType(TILE_ACTION_TYPES.UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE)
          )
        )
      )
    )
  );

export const orderbookConnectionStatusUpdated: ApplicationEpic = (
  action$,
  state$,
  { orderbookService }
) =>
  action$.pipe(
    ofType<Action, SubscribeOrderbookConnectionStateAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_ORDER_BOOK_CONNECTION_STATE
    ),
    switchMap((action: SubscribeOrderbookConnectionStateAction) => {
      orderbookService.connect(action.payload);
      return orderbookService.getConnectionStream().pipe(
        map(onOrderbookConnectionStatusUpdated),
        takeUntil(
          action$.pipe(
            ofType(TILE_ACTION_TYPES.UNSUBSCRIBE_ORDER_BOOK_CONNECTION_STATE)
          )
        )
      );
    })
  );
