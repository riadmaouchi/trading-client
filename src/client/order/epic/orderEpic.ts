import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { OrderAction } from '../actions';
import { ApplicationEpic } from '../../actionType';
import OrderService from './orderService';
import { TILE_ACTION_TYPES } from '../actions';
import { Order } from '../model/order';

const { submitOrder, onOrderPlaced } = OrderAction;
type OrderAction = ReturnType<typeof submitOrder>;

export const orderEpic: ApplicationEpic = (action$, state$) => {
  const orderService = new OrderService();
  return action$.pipe(
    ofType<Action, OrderAction>(TILE_ACTION_TYPES.SUBMIT_ORDER),
    mergeMap((request: OrderAction) =>
      orderService
        .submitOrder(request.payload)
        .pipe(map((result: Order) => onOrderPlaced(request.payload)))
    )
  );
};
