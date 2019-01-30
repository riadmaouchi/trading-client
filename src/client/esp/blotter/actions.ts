import { createAction } from 'redux-actions';
import { TradeReport } from '../tile/model/tradeReport';
import { ConnectionStatus } from '../../layout/loader/model/serviceStatus';

export enum TRADE_BLOTTER_ACTION_TYPES {
  TRADE_BLOTTER_SUBSCRIBE = 'TRADE_BLOTTER_SUBSCRIBE',
  TRADE_REPORT_UPDATE = 'TRADE_REPORT_UPDATE',
  SUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE = 'SUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE',
  TRADE_BLOTTER_CONNECTION_STATUS_UPDATED = 'TRADE_BLOTTER_CONNECTION_STATUS_UPDATED'
}

export const TradeBlotterAction = {
  tradeBlotterSubscribe: createAction(
    TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_SUBSCRIBE
  ),
  tradeReportUpdate: createAction<TradeReport>(
    TRADE_BLOTTER_ACTION_TYPES.TRADE_REPORT_UPDATE
  ),
  subscribeTradeBlotterConnectionState: createAction(
    TRADE_BLOTTER_ACTION_TYPES.SUBSCRIBE_TRADE_BLOTTER_CONNECTION_STATE
  ),
  onTradeBlotterConnectionStatusUpdated: createAction<ConnectionStatus>(
    TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_CONNECTION_STATUS_UPDATED
  )
};
