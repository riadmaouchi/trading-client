import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { TileActions } from '../actions';
import { ApplicationEpic } from '../../../actionType';
import PricingService from './pricingService';
import { TILE_ACTION_TYPES } from '../actions';

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

const pricingService = new PricingService();

export const pricingServiceEpic: ApplicationEpic = (action$, state$) => {
  return action$.pipe(
    ofType<Action, SubscribeToTileAction>(TILE_ACTION_TYPES.TILE_SUBSCRIBE),
    mergeMap((action: SubscribeToTileAction) =>
      pricingService.getPriceStream().pipe(map(updatePrice))
    )
  );
};

export const pricingConnectionStatusUpdated: ApplicationEpic = (
  action$,
  state$
) =>
  action$.pipe(
    ofType<Action, SubscribePricingConnectionStateAction>(
      TILE_ACTION_TYPES.SUBSCRIBE_PRICING_CONNECTION_STATE
    ),
    mergeMap((action: SubscribePricingConnectionStateAction) =>
      pricingService
        .getConnectionStream()
        .pipe(map(onPricingConnectionStatusUpdated))
    )
  );
