import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType, combineEpics } from 'redux-observable';
import { Action } from 'redux';
import { TileActions } from '../actions';
import { ApplicationEpic } from '../../../actionType';
import { TILE_ACTION_TYPES } from '../actions';
import { TradeReport } from '../model/tradeReport';

const {
  executeTrade,
  tradeExecuted,
  dismissExecutionNotification
} = TileActions;
const DISMISS_NOTIFICATION_MS = 6000;
type ExecutionAction = ReturnType<typeof executeTrade>;
type DismissExecutionAction = ReturnType<typeof dismissExecutionNotification>;

export const onTradeExecuted: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    ofType<Action, DismissExecutionAction>(
      TILE_ACTION_TYPES.DISMISS_EXECUTION_NOTIFICATION
    ),
    delay(DISMISS_NOTIFICATION_MS),
    map((action: DismissExecutionAction) => action.payload),
    map(TileActions.dismissExecutionNotification)
  );

export const executionEpic: ApplicationEpic = (
  action$,
  state$,
  { executionService }
) => {
  return action$.pipe(
    ofType<Action, ExecutionAction>(TILE_ACTION_TYPES.EXECUTE_TRADE),
    mergeMap((request: ExecutionAction) =>
      executionService.tradeRequest(request.payload.url, request.payload).pipe(
        map((trade: TradeReport) =>
          tradeExecuted({
            request: request.payload,
            error: trade.reason,
            hasError: trade.status === 'REJECTED',
            trade: trade
          })
        ),
        catchError(error =>
          of(
            tradeExecuted({
              request: request.payload,
              error,
              hasError: true,
              trade: null
            })
          )
        )
      )
    )
  );
};

export const espExecutionEpic = combineEpics(onTradeExecuted, executionEpic);
