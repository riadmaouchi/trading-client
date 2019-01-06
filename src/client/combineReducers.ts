import { combineReducers } from 'redux';
import tiles from './esp/tile/tileReducer';
import order from './order/orderReducer';
import trades from './esp/blotter/tradeBlotterReducer';
import orderUpdates from './order/components/blotter/orderReducer';
import { TileData } from './esp/tile/model/tileData';
import { OrderData } from './order/model/orderData';
import { TradeReport } from './esp/tile/model/tradeReport';
import { OrderUpdate } from './order/model/orderUpdate';

export interface RootState {
  tiles: TileData[];
  order: OrderData;
  trades: TradeReport[];
  orderUpdates: OrderUpdate[];
}

export default combineReducers<RootState>({
  tiles: tiles,
  order: order,
  trades: trades,
  orderUpdates: orderUpdates
});
