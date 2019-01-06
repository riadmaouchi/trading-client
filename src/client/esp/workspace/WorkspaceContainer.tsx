import React from 'react';
import { TileActions } from '../tile/actions';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../combineReducers';
import { PriceTile } from '../tile';
import { TileData } from '../tile/model/tileData';
import { Trade } from '../blotter/model/trade';

export namespace Workspace {
  export interface Props extends RouteComponentProps<void> {
    tiles: TileData[];
    actions: typeof TileActions;
  }

  export interface State {
    lastTrade: Trade;
    selectedPanel: string;
  }
}

export class Workspace extends React.PureComponent<
  Workspace.Props,
  Workspace.State
> {
  constructor(props: Workspace.Props, context: any) {
    super(props, context);
    this.state = {
      selectedPanel: 'TradeBlotter',
      lastTrade: {
        price: 0,
        quantity: 0,
        symbol: '',
        time: ''
      }
    };
  }

  createTile = () => {
    const { tiles } = this.props;
    return tiles.reduce((pairs, tile, index) => {
      if (index % 3 === 0) {
        pairs.push([]);
      }
      pairs[pairs.length - 1].push(tile);
      return pairs;
    }, []);
  };

  createTileElement = () => {
    const { actions } = this.props;
    return this.createTile().map((pair, index) => {
      return (
        <div key={pair + index} className="row mb-4">
          {pair.map((tile, i) => {
            return (
              <PriceTile
                key={pair + index + i}
                tile={tile}
                editNotional={actions.editNotional}
                subscribe={actions.tileSubscribe}
                execute={actions.executeTrade}
              />
            );
          })}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">{this.createTileElement()}</div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);

function mapStateToProps(state: RootState) {
  return {
    tiles: state.tiles
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(TileActions as any, dispatch)
  };
}
