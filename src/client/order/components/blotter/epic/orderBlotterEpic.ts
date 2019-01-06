import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { OrderBlotterAction } from '../actions';
import { ApplicationEpic } from '../../../../actionType';
import OrderBlotterService from './orderBlotterService';
import { ORDER_BLOTTER_ACTION_TYPES } from '../actions';

const { orderBlotterSubscribe, orderBlotterUpdate } = OrderBlotterAction;
type SubscribeToOrderUpdateAction = ReturnType<typeof orderBlotterSubscribe>;

export const orderBlotterEpic: ApplicationEpic = (action$, state$) => {
  const orderBlotterService = new OrderBlotterService();
  return action$.pipe(
    ofType<Action, SubscribeToOrderUpdateAction>(
      ORDER_BLOTTER_ACTION_TYPES.ORDER_BLOTTER_SUBSCRIBE
    ),
    mergeMap((action: SubscribeToOrderUpdateAction) =>
      orderBlotterService.getOrderUpdateStream().pipe(map(orderBlotterUpdate))
    )
  );
};
