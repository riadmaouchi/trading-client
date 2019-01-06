import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../combineReducers';
import { Panel } from './components/panel/Panel';
import { OrderBook } from './components/orderbook/OrderBook';
import { Sales } from './components/sales/Sales';
import { Depth } from './components/depth/Depth';
import { OrderBlotter } from './components/blotter/Blotter';
import { OrderData } from './model/orderData';
import { OrderAction } from './actions';
import { OrderBlotterAction } from './components/blotter/actions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as style from './style.css';
import { OrderUpdate } from './model/orderUpdate';

export namespace OrderContainer {
  export interface Props extends RouteComponentProps<void> {
    tile: OrderData;
    actions: typeof OrderAction;
    blotterActions: typeof OrderBlotterAction;
    orderUpdates: OrderUpdate[];
  }

  export interface State {
    direction: string;
  }
}

export class OrderContainer extends React.PureComponent<
  OrderContainer.Props,
  OrderContainer.State
> {
  constructor(props: OrderContainer.Props, context: any) {
    super(props, context);
    this.state = {
      direction: 'neutral'
    };
    this.saveOrderType = this.saveOrderType.bind(this);
    this.saveNotional = this.saveNotional.bind(this);
    this.saveLimit = this.saveLimit.bind(this);
  }

  componentDidMount() {
    this.props.actions.subscribeOrderBook();
    this.props.blotterActions.orderBlotterSubscribe();
    this.props.actions.subscribeLastTrades();
    this.props.actions.subscribeToMarketPrice();
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

  saveOrderType(orderType: string) {
    const { tile } = this.props;
    const updatedTile: OrderData = {
      orderPanelData: {
        symbol: tile.orderPanelData.symbol,
        tenor: tile.orderPanelData.tenor,
        settlementDate: tile.orderPanelData.settlementDate,
        notional: tile.orderPanelData.notional,
        limit: tile.orderPanelData.limit,
        orderType: orderType
      },
      buyOrder: tile.buyOrder,
      sellOrder: tile.sellOrder,
      lastTrades: tile.lastTrades
    };
    this.props.actions.editOrderType(updatedTile);
  }

  saveNotional(notional: number) {
    const { tile } = this.props;
    const updatedTile: OrderData = {
      orderPanelData: {
        symbol: tile.orderPanelData.symbol,
        tenor: tile.orderPanelData.tenor,
        settlementDate: tile.orderPanelData.settlementDate,
        notional: notional,
        limit: tile.orderPanelData.limit,
        orderType: tile.orderPanelData.orderType
      },
      buyOrder: tile.buyOrder,
      sellOrder: tile.sellOrder,
      lastTrades: tile.lastTrades
    };
    this.props.actions.editNotional(updatedTile);
  }

  saveLimit(limit: number) {
    const { tile } = this.props;
    const updatedTile: OrderData = {
      orderPanelData: {
        symbol: tile.orderPanelData.symbol,
        tenor: tile.orderPanelData.tenor,
        settlementDate: tile.orderPanelData.settlementDate,
        notional: tile.orderPanelData.notional,
        limit: limit,
        orderType: tile.orderPanelData.orderType
      },
      buyOrder: tile.buyOrder,
      sellOrder: tile.sellOrder,
      lastTrades: tile.lastTrades
    };
    this.props.actions.editLimit(updatedTile);
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
        <div className="row">
          <div className="col-md-4">
            <Panel
              tile={tile.orderPanelData}
              onSave={this.saveNotional}
              onSaveOrderType={this.saveOrderType}
              onSaveLimit={this.saveLimit}
              submitOrder={this.props.actions.submitOrder}
            />
          </div>
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="card-title">SALES</h4>
                <Sales
                  prices={tile.lastTrades
                    .map(trade => ({
                      x: new Date(trade.time).getTime(),
                      open: trade.open,
                      high: trade.high,
                      low: trade.low,
                      close: trade.close,
                      quantity: trade.lastQuantity
                    }))
                    .sort((a, b) => a.x - b.x)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card mb-4">
              <div className="card-body">
                <h4 className="card-title">ORDER BOOK</h4>
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
                        .map(order => ({
                          x: order.price,
                          y: order.size
                        }))
                        .sort((a, b) => a.x - b.x)}
                      sellOrder={this.props.tile.sellOrder
                        .filter(order => order.price > 0)
                        .map(order => ({
                          x: order.price,
                          y: order.size
                        }))
                        .sort((a, b) => a.x - b.x)}
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
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">BLOTTER</h4>
                <OrderBlotter orderUpdates={this.props.orderUpdates} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderContainer);

function mapStateToProps(state: RootState) {
  return {
    tile: state.order,
    orderUpdates: state.orderUpdates
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(OrderAction as any, dispatch),
    blotterActions: bindActionCreators(OrderBlotterAction as any, dispatch)
  };
}
