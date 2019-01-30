import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { TradeBlotterAction } from '../actions';
import { ApplicationEpic } from '../../../actionType';
import TradeBlotterService from './tradeBlotterService';
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

const tradeBlotterService = new TradeBlotterService();

export const tradeBlotterEpic: ApplicationEpic = (action$, state$) => {
  return action$.pipe(
    ofType<Action, SubscribeToTradeReportAction>(
      TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_SUBSCRIBE
    ),
    mergeMap((action: SubscribeToTradeReportAction) =>
      tradeBlotterService.getTradeReportStream().pipe(map(tradeReportUpdate))
    )
  );
};

export const tradeBlotterConnectionStatusUpdated: ApplicationEpic = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<Action, SubscribeTradeBlotterConnectionStateAction>(
      TRADE_BLOTTER_ACTION_TYPES.SUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE
    ),
    mergeMap((action: SubscribeTradeBlotterConnectionStateAction) =>
      tradeBlotterService
        .getConnectionStream()
        .pipe(map(onTradeBlotterConnectionStatusUpdated))
    )
  );
