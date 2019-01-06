import { createAction } from 'redux-actions';
import { TradeReport } from '../tile/model/tradeReport';

export enum TRADE_BLOTTER_ACTION_TYPES {
  TRADE_BLOTTER_SUBSCRIBE = 'TRADE_BLOTTER_SUBSCRIBE',
  TRADE_REPORT_UPDATE = 'TRADE_REPORT_UPDATE'
}

export const TradeBlotterAction = {
  tradeBlotterSubscribe: createAction(
    TRADE_BLOTTER_ACTION_TYPES.TRADE_BLOTTER_SUBSCRIBE
  ),
  tradeReportUpdate: createAction<TradeReport>(
    TRADE_BLOTTER_ACTION_TYPES.TRADE_REPORT_UPDATE
  )
};
