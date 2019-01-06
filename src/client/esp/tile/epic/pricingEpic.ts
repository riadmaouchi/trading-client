import { map, mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { Action } from 'redux';
import { TileActions } from '../actions';
import { ApplicationEpic } from '../../../actionType';
import PricingService from './pricingService';
import { TILE_ACTION_TYPES } from '../actions';

const { updatePrice, tileSubscribe } = TileActions;
type SubscribeToTileAction = ReturnType<typeof tileSubscribe>;

export const pricingServiceEpic: ApplicationEpic = (action$, state$) => {
  const pricingService = new PricingService();
  return action$.pipe(
    ofType<Action, SubscribeToTileAction>(TILE_ACTION_TYPES.TILE_SUBSCRIBE),
    mergeMap((action: SubscribeToTileAction) =>
      pricingService.getPriceStream().pipe(map(updatePrice))
    )
  );
};
