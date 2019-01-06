import { createAction } from 'redux-actions';
import { OrderUpdate } from '../../model/orderUpdate';

export enum ORDER_BLOTTER_ACTION_TYPES {
  EDIT_NOTIONAL = 'EDIT_NOTIONAL',
  EDIT_ORDER_TYPE = 'EDIT_ORDER_TYPE',
  EDIT_LIMIT = 'EDIT_LIMIT',
  ORDER_BLOTTER_SUBSCRIBE = 'ORDER_BLOTTER_SUBSCRIBE',
  ORDER_REPORT_UPDATE = 'ORDER_REPORT_UPDATE'
}

export const OrderBlotterAction = {
  orderBlotterSubscribe: createAction(
    ORDER_BLOTTER_ACTION_TYPES.ORDER_BLOTTER_SUBSCRIBE
  ),
  orderBlotterUpdate: createAction<OrderUpdate[]>(
    ORDER_BLOTTER_ACTION_TYPES.ORDER_REPORT_UPDATE
  )
};
