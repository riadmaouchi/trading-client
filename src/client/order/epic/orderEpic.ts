import { map, mergeMap, catchError, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { ofType, combineEpics } from 'redux-observable';
import { Action } from 'redux';
import { OrderAction } from '../actions';
import { ApplicationEpic } from '../../actionType';
import OrderService from './orderService';
import { TILE_ACTION_TYPES } from '../actions';
import { Order } from '../model/order';
import { onIndicatorsUpdated } from './orderbookServiceEpic';
const DISMISS_NOTIFICATION_MS = 6000;
const { submitOrder, onOrderPlaced, dismissOrderNotification } = OrderAction;
type OrderAction = ReturnType<typeof submitOrder>;
type DismissOrderAction = ReturnType<typeof dismissOrderNotification>;

export const onTradeExecuted: ApplicationEpic = (action$, state$) =>
  action$.pipe(
    ofType<Action, DismissOrderAction>(
      TILE_ACTION_TYPES.DISMISS_ORDER_NOTIFICATION
    ),
    delay(DISMISS_NOTIFICATION_MS),
    map((action: DismissOrderAction) => action.payload),
    map(OrderAction.dismissOrderNotification)
  );

export const orderEpic: ApplicationEpic = (action$, state$) => {
  const orderService = new OrderService();
  return action$.pipe(
    ofType<Action, OrderAction>(TILE_ACTION_TYPES.SUBMIT_ORDER),
    mergeMap((request: OrderAction) =>
      orderService.submitOrder(request.payload).pipe(
        map((order: Order) => {
          return onOrderPlaced({
            request: request.payload,
            error: '',
            hasError: false
          });
        }),
        catchError(error => {
          return of(
            onOrderPlaced({
              request: request.payload,
              error,
              hasError: true
            })
          );
        })
      )
    )
  );
};

export const orderPlacedEpic = combineEpics(
  orderEpic,
  onTradeExecuted,
  onIndicatorsUpdated
);
