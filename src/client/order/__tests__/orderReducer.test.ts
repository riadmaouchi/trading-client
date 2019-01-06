import { TILE_ACTION_TYPES } from '../actions';
import order from '../orderReducer';
import { OrderData } from '../model/orderData';

const initialState: OrderData = {
  orderPanelData: {
    symbol: 'EURUSD',
    tenor: 'SP',
    settlementDate: '2018-08-27',
    notional: 1000000,
    limit: 1.3452,
    orderType: 'limit'
  },
  buyOrder: [],
  sellOrder: [],
  lastTrades: []
};

describe('order book', () => {
  it('should add buy order to order book', () => {
    expect(
      order(initialState, {
        type: TILE_ACTION_TYPES.UPDATE_ORDER,
        payload: [
          {
            symbol: 'EURUSD',
            size: 100000,
            price: 1.87782,
            side: 'BUY'
          }
        ]
      })
    ).toEqual({
      orderPanelData: {
        symbol: 'EURUSD',
        tenor: 'SP',
        settlementDate: '2018-08-27',
        notional: 1000000,
        limit: 1.3452,
        orderType: 'limit'
      },
      buyOrder: [
        {
          symbol: 'EURUSD',
          size: 100000,
          price: 1.87782,
          side: 'BUY'
        }
      ],
      sellOrder: [],
      lastTrades: []
    });
  }),
    it('should add sell order to order book', () => {
      expect(
        order(initialState, {
          type: TILE_ACTION_TYPES.UPDATE_ORDER,
          payload: [
            {
              symbol: 'EURUSD',
              size: 100000,
              price: 1.87782,
              side: 'SELL'
            }
          ]
        })
      ).toEqual({
        orderPanelData: {
          symbol: 'EURUSD',
          tenor: 'SP',
          settlementDate: '2018-08-27',
          notional: 1000000,
          limit: 1.3452,
          orderType: 'limit'
        },
        buyOrder: [],
        sellOrder: [
          {
            symbol: 'EURUSD',
            size: 100000,
            price: 1.87782,
            side: 'SELL'
          }
        ],
        lastTrades: []
      });
    }),
    it('should update order book', () => {
      expect(
        order(
          {
            orderPanelData: {
              symbol: 'EURUSD',
              tenor: 'SP',
              settlementDate: '2018-08-27',
              notional: 1000000,
              limit: 1.3452,
              orderType: 'limit'
            },
            buyOrder: [
              {
                symbol: 'EURUSD',
                size: 4000000,
                price: 1.87783,
                side: 'BUY'
              },
              {
                symbol: 'EURUSD',
                size: 8000000,
                price: 1.87782,
                side: 'BUY'
              },
              {
                symbol: 'EURUSD',
                size: 3000000,
                price: 1.87781,
                side: 'BUY'
              }
            ],
            sellOrder: [
              {
                symbol: 'EURUSD',
                size: 1_000_000,
                price: 1.87785,
                side: 'SELL'
              },
              {
                symbol: 'EURUSD',
                size: 5000000,
                price: 1.87786,
                side: 'SELL'
              },
              {
                symbol: 'EURUSD',
                size: 7000000,
                price: 1.87787,
                side: 'SELL'
              }
            ],
            lastTrades: []
          },
          {
            type: TILE_ACTION_TYPES.UPDATE_ORDER,
            payload: [
              {
                symbol: 'EURUSD',
                size: 500000,
                price: 1.87782,
                side: 'BUY'
              },
              {
                symbol: 'EURUSD',
                size: 0,
                price: 1.87782,
                side: 'BUY'
              },
              {
                symbol: 'EURUSD',
                size: 7000000,
                price: 1.8778,
                side: 'BUY'
              },
              {
                symbol: 'EURUSD',
                size: 2_000_000,
                price: 1.87785,
                side: 'SELL'
              }
            ]
          }
        )
      ).toEqual({
        orderPanelData: {
          symbol: 'EURUSD',
          tenor: 'SP',
          settlementDate: '2018-08-27',
          notional: 1000000,
          limit: 1.3452,
          orderType: 'limit'
        },
        buyOrder: [
          {
            symbol: 'EURUSD',
            size: 4000000,
            price: 1.87783,
            side: 'BUY'
          },
          {
            symbol: 'EURUSD',
            size: 3000000,
            price: 1.87781,
            side: 'BUY'
          },
          {
            symbol: 'EURUSD',
            size: 7000000,
            price: 1.8778,
            side: 'BUY'
          }
        ],
        sellOrder: [
          {
            symbol: 'EURUSD',
            size: 2_000_000,
            price: 1.87785,
            side: 'SELL'
          },
          {
            symbol: 'EURUSD',
            size: 5000000,
            price: 1.87786,
            side: 'SELL'
          },
          {
            symbol: 'EURUSD',
            size: 7000000,
            price: 1.87787,
            side: 'SELL'
          }
        ],
        lastTrades: []
      });
    });
});
