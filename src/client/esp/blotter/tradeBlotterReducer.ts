import { handleActions, Action } from 'redux-actions';
import { TRADE_BLOTTER_ACTION_TYPES } from './actions';
import { TradeReport } from '../tile/model/tradeReport';
import { ConnectionStatus } from '../../layout/loader/model/serviceStatus';

const initialState: TradeReport[] = [];

export default handleActions<TradeReport[], any>(
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
    },
    [TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_CONNECTION_STATUS_UPDATED]: (
      state: TradeReport[],
      action: Action<ConnectionStatus>
    ): TradeReport[] => {
      return action.payload === ConnectionStatus.CONNECTED
        ? state
        : initialState;
    }
  },
  initialState
);
