import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { OrderBlotterAction } from '../actions';
import { ApplicationEpic } from '../../../../actionType';
import { ORDER_BLOTTER_ACTION_TYPES } from '../actions';

const { orderBlotterSubscribe, orderBlotterUpdate } = OrderBlotterAction;
type SubscribeToOrderUpdateAction = ReturnType<typeof orderBlotterSubscribe>;

export const orderBlotterEpic: ApplicationEpic = (
  action$,
  state$,
  { orderBlotterService }
) => {
  return action$.pipe(
    ofType<Action, SubscribeToOrderUpdateAction>(
      ORDER_BLOTTER_ACTION_TYPES.ORDER_BLOTTER_SUBSCRIBE
    ),
    mergeMap((action: SubscribeToOrderUpdateAction) => {
      orderBlotterService.connect(action.payload);
      return orderBlotterService.getOrderUpdateStream().pipe(
        map(orderBlotterUpdate),
        takeUntil(
          action$.pipe(
            ofType(ORDER_BLOTTER_ACTION_TYPES.ORDER_BLOTTER_UNSUBSCRIBE)
          )
        )
      );
    })
  );
};
