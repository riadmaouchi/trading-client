import React from 'react';
import { mount } from 'enzyme';
import { Workspace } from '../Workspace';
import { TileData } from '../../tile/model/tileData';
import { ConnectionStatus } from '../../../layout/loader/model/serviceStatus';

describe('Workspace', () => {
  it('should create price tiles', () => {
    // Given
    jest.mock('../../tile', () => 'tile');
    const tiles: TileData[] = [
      {
        id: 1,
        tenor: 'SP',
        settlementDate: '28JUN',
        notional: 1000000,
        executingBuy: false,
        executingSell: false,
        price: {
          id: 1,
          time: '',
          symbol: 'EURGBP',
          bids: [],
          asks: []
        },
        executing: false,
        lastExecutionStatus: null,
        pricingConnectionState: ConnectionStatus.CONNECTED
      },
      {
        id: 2,
        tenor: 'SP',
        settlementDate: '28JUN',
        notional: 1000000,
        executingBuy: false,
        executingSell: false,
        price: {
          id: 1,
          time: '',
          symbol: 'EURUSD',
          bids: [],
          asks: []
        },
        executing: false,
        lastExecutionStatus: null,
        pricingConnectionState: ConnectionStatus.CONNECTED
      }
    ];

    // When
    const workspace = mount(
      <Workspace
        tiles={tiles}
        dismissExecutionNotification={jest.fn()}
        editNotional={jest.fn()}
        executeTrade={jest.fn()}
        tileSubscribe={jest.fn()}
        tileUnsubscribe={jest.fn()}
        subscribePricingConnectionState={jest.fn()}
      />
    );

    // Then
    expect(workspace.find('#EURGBP')).toHaveLength(1);
    expect(workspace.find('#EURUSD')).toHaveLength(1);
  });
});
