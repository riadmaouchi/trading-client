import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import tiles from './esp/tile/tileReducer';
import order from './order/orderReducer';
import orderUpdates from './order/components/blotter/orderReducer';
import { TileData } from './esp/tile/model/tileData';
import { OrderData } from './order/model/orderData';
import blotter from './esp/blotter/tradeBlotterReducer';
import { BlotterState } from './esp/blotter/tradeBlotterReducer';
import { OrderUpdate } from './order/model/orderUpdate';

export interface RootState {
  tiles: TileData[];
  order: OrderData;
  blotter: BlotterState;
  orderUpdates: OrderUpdate[];
}

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    tiles: tiles,
    order: order,
    blotter: blotter,
    orderUpdates: orderUpdates
  });
