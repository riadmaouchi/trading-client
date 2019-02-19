import * as React from 'react';
import { Notional } from './components/notional/Notional';
import { Spread } from './components/spread/Spread';
import { Price } from './components/price/Price';
import { Ladder } from './components/ladder/Ladder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TileData } from './model/tileData';
import { PriceLadder } from './model/priceTick';
import { TradeRequest } from './model/tradeRequest';

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
    hover: boolean;
    prices: PriceLadder;
    settlementDate: string;
    tenor: string;
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
      hover: false,
      prices: {
        symbol: '',
        bids: [],
        asks: [],
        id: 0,
        time: ''
      },
      settlementDate: props.tile.settlementDate,
      tenor: props.tile.tenor
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
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
    if (tile.price !== prevProps.tile.price) {
      const mayBeBidPrice = tile.price.bids.find(
        x => tile.notional <= x.quantity
      );
      const bidPrice = mayBeBidPrice === undefined ? 0 : mayBeBidPrice.price;
      const mayBeAskPrice = tile.price.asks.find(
        x => tile.notional <= x.quantity
      );
      const askPrice = mayBeAskPrice === undefined ? 0 : mayBeAskPrice.price;
      this.setState({ bid: bidPrice, ask: askPrice, prices: tile.price });
    }
  }

  onMouseOver() {
    this.setState({ hover: true });
  }

  onMouseOut() {
    this.setState({ hover: false });
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
    const { bid, ask, prices } = this.state;

    return (
      <div className="container">
        <div className="row">
          <Price
            symbol={tile.price.symbol}
            side="sell"
            price={bid}
            notional={tile.notional}
            execute={this.props.execute}
            executing={tile.executingSell}
            url={tile.url}
          />
          <Spread bid={bid} ask={ask} />
          <Price
            symbol={tile.price.symbol}
            side="buy"
            price={ask}
            notional={tile.notional}
            execute={this.props.execute}
            executing={tile.executingBuy}
            url={tile.url}
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
                  value={this.state.settlementDate
                    .concat(' (')
                    .concat(this.state.tenor)
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
        <Ladder key={tile.id} prices={prices} />
      </div>
    );
  }
}
