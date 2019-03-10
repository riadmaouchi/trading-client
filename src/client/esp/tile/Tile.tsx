import * as React from 'react';
import { Notional } from './components/notional/Notional';
import { Spread } from './components/spread/Spread';
import PriceButton from './components/priceButton/PriceButton';
import Ladder from './components/ladder/Ladder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TileData } from './model/tileData';
import { Movements } from './model/priceTick';
import { TradeRequest } from './model/tradeRequest';
import Execution from './components/execution/Execution';

export namespace TileItem {
  export interface Props {
    tile: TileData;
    editNotional: (tile: TileData) => void;
    subscribe: (tile: TileData) => void;
    execute: (tradeRequest: TradeRequest) => void;
    unsubscribe(): void;
  }
  export interface State {
    bid: number;
    ask: number;
    bidMovement: Movements;
    askMovement: Movements;
    isBidStale: boolean;
    isAskStale: boolean;
  }
}
export class PriceTile extends React.PureComponent<
  TileItem.Props,
  TileItem.State
> {
  constructor(props: TileItem.Props, context: any) {
    super(props, context);
    this.state = {
      bid: 0,
      ask: 0,
      bidMovement: Movements.None,
      askMovement: Movements.None,
      isBidStale: true,
      isAskStale: true
    };
    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount() {
    const { tile } = this.props;
    this.props.subscribe(tile);
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const { tile } = this.props;
    const { bid, ask } = this.state;
    if (tile.price !== prevProps.tile.price) {
      const mayBeBidPrice = tile.price.bids.find(
        x => tile.notional <= x.quantity
      );

      const bidPrice = (mayBeBidPrice && mayBeBidPrice.price) || bid;

      const mayBeAskPrice = tile.price.asks.find(
        x => tile.notional <= x.quantity
      );

      const askPrice = (mayBeAskPrice && mayBeAskPrice.price) || ask;

      const askMov =
        (mayBeAskPrice && mayBeAskPrice.mouvement) || Movements.None;
      const bidMov =
        (mayBeBidPrice && mayBeBidPrice.mouvement) || Movements.None;
      this.setState({
        bid: bidPrice,
        ask: askPrice,
        bidMovement: bidMov,
        askMovement: askMov,
        isBidStale: !mayBeBidPrice,
        isAskStale: !mayBeAskPrice
      });
    }
  }

  handleSave(notional: number) {
    const { tile } = this.props;
    const updatedTile: TileData = {
      ...tile,
      notional: notional
    };
    this.props.editNotional(updatedTile);
  }

  handleOnChange(e) {}

  handleKeyDown(e) {}

  handleOnBlur(e) {}

  Calendar = () => {
    return <FontAwesomeIcon icon="calendar-alt" />;
  };

  render() {
    const { tile } = this.props;
    const {
      bid,
      ask,
      bidMovement,
      askMovement,
      isAskStale,
      isBidStale
    } = this.state;

    return (
      <div className="container">
        <div className="row mx-0">
          <PriceButton
            side="sell"
            price={bid}
            execute={() =>
              this.props.execute({
                id: 1,
                symbol: tile.price.symbol,
                broker: 'WEB',
                price: bid,
                side: 'sell',
                quantity: tile.notional,
                url: tile.url
              })
            }
            movement={bidMovement}
            isStale={isBidStale}
          />
          <div className="col-md-2 px-0">
            <div className="card">
              <div className="card-header d-flex justify-content-center">
                <Execution show={tile.executing} />
                <Spread bid={bid} ask={ask} />
              </div>
              <div className="card-body d-flex justify-content-center">
                <small className="d-inline-block text-nowrap text-info">
                  Mid: {tile.price.mid.toFixed(tile.precision)}
                </small>
              </div>
            </div>
          </div>

          <PriceButton
            side="buy"
            price={ask}
            execute={() =>
              this.props.execute({
                id: 1,
                symbol: tile.price.symbol,
                broker: 'WEB',
                price: ask,
                side: 'buy',
                quantity: tile.notional,
                url: tile.url
              })
            }
            movement={askMovement}
            isStale={isAskStale}
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <Notional
              notional={tile.notional}
              symbol={tile.price.symbol}
              onSave={this.handleSave}
            />
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <div className="input-group input-group-sm mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="dd/MM/yyyy"
                  onChange={this.handleOnChange}
                  onKeyDown={this.handleKeyDown}
                  onBlur={this.handleOnBlur}
                  value={tile.settlementDate
                    .concat(' (')
                    .concat(tile.tenor)
                    .concat(')')}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon="calendar-alt" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Ladder key={tile.id} bids={tile.price.bids} asks={tile.price.asks} />
      </div>
    );
  }
}
