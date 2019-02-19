import { map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { TradeBlotterAction } from '../actions';
import { ApplicationEpic } from '../../../actionType';
import { TRADE_BLOTTER_ACTION_TYPES } from '../actions';

const {
  tradeBlotterSubscribe,
  tradeReportUpdate,
  subscribeTradeBlotterConnectionState,
  onTradeBlotterConnectionStatusUpdated
} = TradeBlotterAction;
type SubscribeToTradeReportAction = ReturnType<typeof tradeBlotterSubscribe>;
type SubscribeTradeBlotterConnectionStateAction = ReturnType<
  typeof subscribeTradeBlotterConnectionState
>;

export const tradeBlotterEpic: ApplicationEpic = (
  action$,
  state$,
  { tradeBlotterService }
) =>
  action$.pipe(
    ofType<Action, SubscribeToTradeReportAction>(
      TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_SUBSCRIBE
    ),
    mergeMap(() =>
      tradeBlotterService.getTradeReportStream().pipe(
        map(tradeReportUpdate),
        takeUntil(
          action$.pipe(
            ofType(
              TRADE_BLOTTER_ACTION_TYPES.UNSUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE
            )
          )
        )
      )
    )
  );

export const tradeBlotterConnectionStatusUpdated: ApplicationEpic = (
  action$,
  state$,
  { tradeBlotterService }
) =>
  action$.pipe(
    ofType<Action, SubscribeTradeBlotterConnectionStateAction>(
      TRADE_BLOTTER_ACTION_TYPES.SUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE
    ),
    switchMap((action: SubscribeTradeBlotterConnectionStateAction) => {
      tradeBlotterService.connect(action.payload);
      return tradeBlotterService.getConnectionStream().pipe(
        map(onTradeBlotterConnectionStatusUpdated),
        takeUntil(
          action$.pipe(
            ofType(
              TRADE_BLOTTER_ACTION_TYPES.UNSUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE
            )
          )
        )
      );
    })
  );
