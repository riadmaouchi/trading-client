import { handleActions, Action } from 'redux-actions';
import moment from 'moment';
import { TILE_ACTION_TYPES } from './actions';
import { TileData } from './model/tileData';
import { PriceLadder } from './model';
import { TradeRequest } from './model/tradeRequest';

const symbols = ['EURUSD', 'EURGBP', 'EURJPY'];

const initialState: TileData[] = symbols.map((symbol, index) => {
  return {
    id: ++index,
    tenor: 'SP',
    executingBuy: false,
    executingSell: false,
    settlementDate: moment()
      .add(2, 'days')
      .format('L'),
    notional: 1000000,
    price: {
      id: 0,
      time: '',
      symbol: symbol,
      bids: [],
      asks: []
    }
  };
});

export default handleActions<TileData[], any>(
  {
    [TILE_ACTION_TYPES.EDIT_NOTIONAL]: (
      state: TileData[],
      action: Action<TileData>
    ): TileData[] => {
      return state.map(tile => {
        return tile.id === action.payload.id
          ? { ...tile, notional: action.payload.notional }
          : tile;
      });
    },
    [TILE_ACTION_TYPES.UPDATE_PRICE]: (
      state: TileData[],
      action: Action<PriceLadder>
    ): TileData[] => {
      return state.map(tile => {
        return tile.price.symbol === action.payload.symbol
          ? { ...tile, price: action.payload }
          : tile;
      });
    },
    [TILE_ACTION_TYPES.TILE_SUBSCRIBE]: (state: TileData[]): TileData[] => {
      return state;
    },
    [TILE_ACTION_TYPES.EXECUTE_TRADE]: (
      state: TileData[],
      action: Action<TradeRequest>
    ): TileData[] => {
      return state.map(tile => {
        return tile.price.symbol === action.payload.symbol
          ? {
              ...tile,
              executingBuy: action.payload.side === 'buy',
              executingSell: action.payload.side === 'sell'
            }
          : tile;
      });
    },
    [TILE_ACTION_TYPES.TRADE_EXECUTED]: (
      state: TileData[],
      action: Action<TradeRequest>
    ): TileData[] => {
      return state.map(tile => {
        return tile.price.symbol === action.payload.symbol
          ? {
              ...tile,
              executingBuy: false,
              executingSell: false
            }
          : tile;
      });
    }
  },
  initialState
);
