import React from 'react';
import { mount } from 'enzyme';
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
      price: { id: 0, time: '', symbol: 'EURGBP', bids: [], asks: [] },
      executing: false,
      lastExecutionStatus: null,
      pricingConnectionState: ConnectionStatus.CONNECTING,
      url: null
    };

    // When
    mount(
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

  const runs = [
    { notional: 1, expectedbid: 1.23118, expectedAsk: 1.23127 },
    { notional: 100, expectedbid: 1.23118, expectedAsk: 1.23127 },
    { notional: 1000000, expectedbid: 1.23118, expectedAsk: 1.23127 },
    { notional: 2000000, expectedbid: 1.26571, expectedAsk: 1.26578 },
    { notional: 5000000, expectedbid: 1.26571, expectedAsk: 1.26578 }
    // { notional: 10000000, expectedbid: 1.26571, expectedAsk: 1.26578 }
  ];

  it('should display price for a related quantity ', () => {
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

    runs.forEach(run => {
      const tile: TileData = {
        id: 1,
        tenor: 'SP',
        settlementDate: '28JUN',
        executingBuy: false,
        executingSell: false,
        notional: run.notional,
        price: {
          id: 0,
          time: '',
          symbol: 'EURGBP',
          bids: [],
          asks: []
        },
        executing: false,
        lastExecutionStatus: null,
        pricingConnectionState: ConnectionStatus.CONNECTING
      };
      let priceTile = mount(
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
          notional: run.notional,
          price: price
        }
      });

      // Then
      expect(priceTile.state('bid')).toEqual(run.expectedbid);
      expect(priceTile.state('ask')).toEqual(run.expectedAsk);
    });
  });
});
