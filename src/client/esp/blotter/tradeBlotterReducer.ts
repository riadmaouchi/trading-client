import { handleActions, Action } from 'redux-actions';
import { TRADE_BLOTTER_ACTION_TYPES } from './actions';
import { TradeReport } from '../tile/model/tradeReport';
import { ConnectionStatus } from '../../layout/loader/model/serviceStatus';
export interface BlotterState {
  trades: TradeReport[];
  connectionState: ConnectionStatus;
  url?: string | null;
}

const initialState: BlotterState = {
  trades: [],
  connectionState: null
};

export default handleActions<BlotterState, any>(
  {
    [TRADE_BLOTTER_ACTION_TYPES.SUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE]: (
      state: BlotterState,
      action: Action<string>
    ): BlotterState => {
      return { ...state, url: action.payload };
    },
    [TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_CONNECTION_URL_UPDATED]: (
      state: BlotterState,
      action: Action<string>
    ): BlotterState => {
      return { ...state, url: action.payload };
    },
    [TRADE_BLOTTER_ACTION_TYPES.TRADE_REPORT_UPDATE]: (
      state: BlotterState,
      action: Action<TradeReport>
    ): BlotterState => {
      if (!state.trades.some(e => e.id === action.payload.id)) {
        return {
          ...state,
          trades: [...state.trades, action.payload]
        };
      }
      return state;
    },
    [TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_CONNECTION_STATUS_UPDATED]: (
      state: BlotterState,
      action: Action<ConnectionStatus>
    ): BlotterState => {
      return { ...state, connectionState: action.payload };
    }
  },
  initialState
);
