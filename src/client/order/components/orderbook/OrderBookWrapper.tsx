import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as style from './style.css';
import { OrderData } from '../../model/orderData';
import { Depth } from '../depth/Depth';
import { OrderBook } from '../orderbook/OrderBook';

export namespace OrderBookWrapper {
  export interface Props {
    tile: OrderData;
    subscribeOrderBook(): void;
    subscribeLastTrades(): void;
    subscribeToMarketPrice(): void;
  }

  export interface State {
    direction: string;
  }
}

export class OrderBookWrapper extends React.PureComponent<
  OrderBookWrapper.Props,
  OrderBookWrapper.State
> {
  constructor(props: OrderBookWrapper.Props, context: any) {
    super(props, context);
    this.state = { direction: 'neutral' };
  }

  componentDidMount() {
    this.props.subscribeOrderBook();
    this.props.subscribeLastTrades();
    this.props.subscribeToMarketPrice();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tile.lastTrades.length > 0 &&
      prevProps.tile.lastTrades.length > 0
    ) {
      const trade = this.props.tile.lastTrades.slice(-1)[0];
      const prevTrade = prevProps.tile.lastTrades.slice(-1)[0];
      if (trade.lastPrice !== prevTrade.lastPrice) {
        const direction = trade.lastPrice > prevTrade.lastPrice ? 'up' : 'down';
        this.setState({ direction: direction });
      }
    }
  }

  render() {
    const { tile } = this.props;
    const { direction } = this.state;
    const lastTrade = tile.lastTrades.slice(-1)[0] || {
      symbol: 'EURUSD',
      time: '',
      lastQuantity: 0,
      lastPrice: 0,
      open: 0,
      high: 0,
      low: 0,
      close: 0
    };

    const directionStyle =
      direction === 'up' ? (
        <FontAwesomeIcon className={style.rotate} icon="arrow-up" />
      ) : (
        <FontAwesomeIcon icon="arrow-down" />
      );

    const priceColor = direction === 'up' ? 'text-success' : 'text-pink';

    return (
      <div>
        <h5>
          {' '}
          <span className={priceColor}>
            {lastTrade.lastPrice.toFixed(5)}
            {directionStyle}
          </span>{' '}
          ({lastTrade.lastQuantity} @ {lastTrade.lastPrice})
        </h5>
        <div className="row">
          <div className="col-md-7">
            <Depth
              buyOrder={this.props.tile.buyOrder
                .filter(order => order.price > 0)
                .map(order => [order.price, order.size])
                .sort((a, b) => a[0] - b[0])}
              sellOrder={this.props.tile.sellOrder
                .filter(order => order.price > 0)
                .map(order => [order.price, order.size])
                .sort((a, b) => a[0] - b[0])}
              midMarketPrice={lastTrade.lastPrice}
            />
          </div>
          <div className="col-md-5">
            <div className="row">
              <div className="col-md-6">
                <OrderBook
                  side="buy"
                  order={this.props.tile.buyOrder.filter(
                    order => order.price > 0
                  )}
                />
              </div>
              <div className="col-md-6">
                <OrderBook
                  side="sell"
                  order={this.props.tile.sellOrder.filter(
                    order => order.price > 0
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
