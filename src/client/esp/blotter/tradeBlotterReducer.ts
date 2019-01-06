import { handleActions, Action } from 'redux-actions';
import { TRADE_BLOTTER_ACTION_TYPES } from './actions';
import { TradeReport } from '../tile/model/tradeReport';

const initialState: TradeReport[] = [];

export default handleActions<TradeReport[], TradeReport>(
  {
    [TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_SUBSCRIBE]: (
      state: TradeReport[],
      action: Action<TradeReport>
    ): TradeReport[] => {
      return state;
    },
    [TRADE_BLOTTER_ACTION_TYPES.TRADE_REPORT_UPDATE]: (
      state: TradeReport[],
      action: Action<TradeReport>
    ): TradeReport[] => {
      return [...state, action.payload];
    }
  },
  initialState
);
