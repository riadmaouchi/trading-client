import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { TradeBlotterAction } from '../actions';
import { ApplicationEpic } from '../../../actionType';
import TradeBlotterService from './tradeBlotterService';
import { TRADE_BLOTTER_ACTION_TYPES } from '../actions';

const { tradeBlotterSubscribe, tradeReportUpdate } = TradeBlotterAction;
type SubscribeToTradeReportAction = ReturnType<typeof tradeBlotterSubscribe>;

export const tradeBlotterEpic: ApplicationEpic = (action$, state$) => {
  const tradeBlotterService = new TradeBlotterService();
  return action$.pipe(
    ofType<Action, SubscribeToTradeReportAction>(
      TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_SUBSCRIBE
    ),
    mergeMap((action: SubscribeToTradeReportAction) =>
      tradeBlotterService.getTradeReportStream().pipe(map(tradeReportUpdate))
    )
  );
};
