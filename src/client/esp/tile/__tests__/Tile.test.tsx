import React from 'react';
import { shallow } from 'enzyme';
import { PriceTile } from '../Tile';
import { TileData } from '../model/tileData';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';

describe('PriceTile', () => {
  it('should subscribe to price update', () => {
    const subscribe = jest.fn();
    const tileData: TileData = {
      id: 1,
      tenor: 'SP',
      settlementDate: '28JUN',
      executingBuy: false,
      executingSell: false,
      notional: 1000000,
      price: { id: 0, time: '', mid: 0, symbol: 'EURGBP', bids: [], asks: [] },
      executing: false,
      lastExecutionStatus: null,
      pricingConnectionState: ConnectionStatus.CONNECTING,
      url: null
    };

    // When
    shallow(
      <PriceTile
        tile={tileData}
        editNotional={jest.fn()}
        subscribe={subscribe}
        execute={jest.fn()}
        unsubscribe={jest.fn()}
      />
    );

    // Then
    expect(subscribe).toBeCalled();
  });

  it.each`
    notional   | expectedbid | expectedAsk
    ${1}       | ${1.23118}  | ${1.23127}
    ${100}     | ${1.23118}  | ${1.23127}
    ${1000000} | ${1.23118}  | ${1.23127}
    ${2000000} | ${1.26571}  | ${1.26578}
    ${5000000} | ${1.26571}  | ${1.26578}
  `(
    'should display price for a related quantity ',
    ({ notional, expectedbid, expectedAsk }) => {
      // Given
      const price = {
        symbol: 'EURGBP',
        asks: [
          { quantity: 1000000, price: 1.23127 },
          { quantity: 5000000, price: 1.26578 }
        ],
        bids: [
          { quantity: 1000000, price: 1.23118 },
          { quantity: 5000000, price: 1.26571 }
        ],
        id: 1,
        time: '2018-06-05T22:06:28.912459'
      };

      const tile: TileData = {
        id: 1,
        tenor: 'SP',
        settlementDate: '28JUN',
        executingBuy: false,
        executingSell: false,
        notional: notional,
        price: {
          id: 0,
          time: '',
          mid: 0,
          symbol: 'EURGBP',
          bids: [],
          asks: []
        },
        executing: false,
        lastExecutionStatus: null,
        pricingConnectionState: ConnectionStatus.CONNECTING
      };
      let priceTile = shallow(
        <PriceTile
          tile={tile}
          editNotional={jest.fn()}
          subscribe={jest.fn()}
          execute={jest.fn()}
          unsubscribe={jest.fn()}
        />
      );

      // When
      priceTile.setProps({
        tile: {
          id: 1,
          symbol: 'EURGBP',
          tenor: 'SP',
          settlementDate: '28JUN',
          notional: notional,
          price: price
        }
      });

      // Then
      expect(priceTile.state('bid')).toEqual(expectedbid);
      expect(priceTile.state('ask')).toEqual(expectedAsk);
    }
  );

  it('should stale price', () => {
    // Given
    const price = {
      symbol: 'EURGBP',
      mid: 0,
      asks: [{ quantity: 1000000, price: 1.23127 }],
      bids: [{ quantity: 1000000, price: 1.23118 }],
      id: 1,
      time: '2018-06-05T22:06:28.912459'
    };

    const tile: TileData = {
      id: 1,
      tenor: 'SP',
      settlementDate: '28JUN',
      executingBuy: false,
      executingSell: false,
      notional: 1000000,
      price: {
        id: 0,
        time: '',
        mid: 0,
        symbol: 'EURGBP',
        asks: [],
        bids: []
      },
      executing: false,
      lastExecutionStatus: null,
      pricingConnectionState: ConnectionStatus.CONNECTING
    };
    let priceTile = shallow(
      <PriceTile
        tile={tile}
        editNotional={jest.fn()}
        subscribe={jest.fn()}
        execute={jest.fn()}
        unsubscribe={jest.fn()}
      />
    );
    priceTile.setProps({
      tile: {
        id: 1,
        symbol: 'EURGBP',
        tenor: 'SP',
        settlementDate: '28JUN',
        notional: 5000000,
        price: {
          id: 0,
          time: '',
          symbol: 'EURGBP',
          mid: 0,
          asks: [
            { quantity: 1000000, price: 1.23127 },
            { quantity: 5000000, price: 1.26578 }
          ],
          bids: [
            { quantity: 1000000, price: 1.23118 },
            { quantity: 5000000, price: 1.26571 }
          ]
        }
      }
    });

    // When
    priceTile.setProps({
      tile: {
        id: 1,
        symbol: 'EURGBP',
        tenor: 'SP',
        settlementDate: '28JUN',
        notional: 5000000,
        price: price
      }
    });

    // Then
    expect(priceTile.state('bid')).toEqual(1.26571);
    expect(priceTile.state('ask')).toEqual(1.26578);
    expect(priceTile.state('isBidStale')).toBeTruthy();
    expect(priceTile.state('isAskStale')).toBeTruthy();
  });
});
