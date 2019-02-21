import React from 'react';
import { PriceTile } from '../tile';
import { TileData } from '../tile/model/tileData';
import { TradeRequest } from '../tile/model/tradeRequest';
import { Loader } from '../../layout/loader/Loader';
import Notification from '../tile/Notification';

export namespace Workspace {
  export interface Props {
    tiles: TileData[];
    editNotional: (tile: TileData) => void;
    tileSubscribe: (tile: TileData) => void;
    tileUnsubscribe(): void;
    subscribePricingConnectionState: (url: string) => void;
    executeTrade: (tradeRequest: TradeRequest) => void;
    dismissExecutionNotification: (tile: TileData) => void;
  }
}

export class Workspace extends React.PureComponent<Workspace.Props> {
  constructor(props: Workspace.Props) {
    super(props);
    this.dismissExecutionNotification = this.dismissExecutionNotification.bind(
      this
    );
  }

  componentWillMount() {
    this.props.subscribePricingConnectionState(
      this.props.tiles[0].pricingConnectionUrl
    );
  }

  dismissExecutionNotification(tile: TileData) {
    this.props.dismissExecutionNotification(tile);
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

  render() {
    return this.createTile().map((pair, index) => {
      return (
        <div key={pair + index} className="row mb-4">
          {pair.map((tile, i) => {
            return (
              <div key={i} className="col-sm-4">
                <div className="card m-b-20" id={tile.price.symbol}>
                  <Notification
                    lastExecutionStatus={tile.lastExecutionStatus}
                    symbol={tile.price.symbol}
                    isPriceStale={
                      !tile.lastTradeExecutionStatus && tile.price.priceStale
                    }
                    dismissNotification={() =>
                      this.dismissExecutionNotification(tile)
                    }
                  />
                  <div className="card-body">
                    <Loader
                      title={tile.price.symbol}
                      status={tile.pricingConnectionState}
                      render={() => (
                        <PriceTile
                          tile={tile}
                          editNotional={this.props.editNotional}
                          subscribe={this.props.tileSubscribe}
                          unsubscribe={this.props.tileUnsubscribe}
                          execute={this.props.executeTrade}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    });
  }
}
