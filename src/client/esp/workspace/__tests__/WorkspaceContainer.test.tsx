import React from 'react';
import { mount } from 'enzyme';
import { Workspace } from '../WorkspaceContainer';
import { TileActions } from '../../tile/actions';
import { TileData } from '../../tile/model/tileData';

describe('Workspace', () => {
  it('should create price tiles', () => {
    // Given
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
        }
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
        }
      }
    ];

    // When
    const workspace = mount(
      <Workspace
        tiles={tiles}
        actions={TileActions}
        history={null}
        location={null}
        children={null}
        match={null}
      />
    );

    // Then
    expect(workspace.find('#EURGBP')).toHaveLength(1);
    expect(workspace.find('#EURUSD')).toHaveLength(1);
  });
});
