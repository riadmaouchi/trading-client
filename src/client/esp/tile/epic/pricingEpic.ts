import { map, mergeMap, takeUntil, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { TileActions } from '../actions';
import { TILE_ACTION_TYPES } from '../actions';
import { ApplicationEpic } from '../../../actionType';

const {
  updatePrice,
  tileSubscribe,
  subscribePricingConnectionState,
  onPricingConnectionStatusUpdated
} = TileActions;
type SubscribeToTileAction = ReturnType<typeof tileSubscribe>;
type SubscribePricingConnectionStateAction = ReturnType<
  typeof subscribePricingConnectionState
>;

export const pricingServiceEpic: ApplicationEpic = (
  action$,
  state$,
  { pricingService }
) =>
  action$.pipe(
    ofType<Action, SubscribeToTileAction>(TILE_ACTION_TYPES.TILE_SUBSCRIBE),
    mergeMap((action: SubscribeToTileAction) => {
      return pricingService.getPriceStream(action.payload.price.symbol).pipe(
        map(updatePrice),
        takeUntil(
          action$.pipe(
            ofType(TILE_ACTION_TYPES.UNSUBSCRIBE_PRICING_CONNECTION_STATE)
          )
        )
      );
    })
  );

export const pricingConnectionStatusUpdated: ApplicationEpic = (
  action$,
  state$,
  { pricingService }
) =>
  action$.pipe(
    ofType<Action, SubscribePricingConnectionStateAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_PRICING_CONNECTION_STATE
    ),
    switchMap((action: SubscribePricingConnectionStateAction) => {
      pricingService.connect(action.payload);
      return pricingService.getConnectionStream().pipe(
        map(onPricingConnectionStatusUpdated),
        takeUntil(
          action$.pipe(
            ofType(TILE_ACTION_TYPES.UNSUBSCRIBE_PRICING_CONNECTION_STATE)
          )
        )
      );
    })
  );
