import { handleActions, Action } from 'redux-actions';
import { ORDER_BLOTTER_ACTION_TYPES } from './actions';
import { OrderUpdate } from '../../model/orderUpdate';

const initialState: OrderUpdate[] = [];

export default handleActions<OrderUpdate[], any>(
  {
    [ORDER_BLOTTER_ACTION_TYPES.ORDER_BLOTTER_SUBSCRIBE]: (
      state: OrderUpdate[]
    ): OrderUpdate[] => state,
    [ORDER_BLOTTER_ACTION_TYPES.ORDER_REPORT_UPDATE]: (
      state: OrderUpdate[],
      action: Action<OrderUpdate[]>
    ): OrderUpdate[] => {
      const map = new Map();
      state.forEach(order => map.set(order.id, order));
      action.payload.forEach(order => map.set(order.id, order));
      return [...map.values()];
    }
  },
  initialState
);
