import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { TileActions } from '../actions';
import { ApplicationEpic } from '../../../actionType';
import ExecutionService from './executionService';
import { TILE_ACTION_TYPES } from '../actions';
import { TradeReport } from '../model/tradeReport';

const { executeTrade, tradeExecuted } = TileActions;
type ExecutionAction = ReturnType<typeof executeTrade>;

export const executionEpic: ApplicationEpic = (action$, state$) => {
  const executionService = new ExecutionService();
  return action$.pipe(
    ofType<Action, ExecutionAction>(TILE_ACTION_TYPES.EXECUTE_TRADE),
    mergeMap((request: ExecutionAction) =>
      executionService
        .tradeRequest(request.payload)
        .pipe(map((result: TradeReport) => tradeExecuted(request.payload)))
    )
  );
};
