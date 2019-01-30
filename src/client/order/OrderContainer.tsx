import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../combineReducers';
import { Panel } from './components/panel/Panel';
import Notification from '../order/components/panel/notification/Notification';
import ProgressBar from '../layout/notification/ProgressBar';
import { OrderBook } from './components/orderbook/OrderBook';
import { Sales } from './components/sales/Sales';
import { Depth } from './components/depth/Depth';
import { OrderBlotter } from './components/blotter/Blotter';
import { Loader } from '../layout/loader/Loader';
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
    this.state = { direction: 'neutral' };
    this.saveOrderType = this.saveOrderType.bind(this);
    this.saveNotional = this.saveNotional.bind(this);
    this.saveLimit = this.saveLimit.bind(this);
    this.dismissNotification = this.dismissNotification.bind(this);
  }

  componentDidMount() {
    this.props.actions.subscribeOrderBook();
    this.props.blotterActions.orderBlotterSubscribe();
    this.props.actions.subscribeLastTrades();
    this.props.actions.subscribeToMarketPrice();
    this.props.actions.subscribeOrderbookConnectionState();
    this.props.actions.subscribeIndicators();
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
    this.props.actions.editOrderType({
      ...tile,
      orderPanelData: {
        ...tile.orderPanelData,
        orderType: orderType
      }
    });
  }

  dismissNotification() {
    this.props.actions.dismissOrderNotification(this.props.tile);
  }

  saveNotional(notional: number) {
    const { tile } = this.props;
    this.props.actions.editNotional({
      ...tile,
      orderPanelData: {
        ...tile.orderPanelData,
        notional: notional
      }
    });
  }

  saveLimit(limit: number) {
    const { tile } = this.props;
    this.props.actions.editLimit({
      ...tile,
      orderPanelData: { ...tile.orderPanelData, limit: limit }
    });
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

    const depth = (
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

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <Notification
                lastOrderPlacingStatus={this.props.tile.lastOrderPlacingStatus}
                symbol={tile.orderPanelData.symbol}
                dismissNotification={this.dismissNotification}
              />
              <ProgressBar show={this.props.tile.placing} />

              <div className="card-body">
                <Loader
                  title={'PLACE ORDER'}
                  status={tile.connectionState}
                  render={() => (
                    <Panel
                      tile={tile.orderPanelData}
                      onSave={this.saveNotional}
                      onSaveOrderType={this.saveOrderType}
                      onSaveLimit={this.saveLimit}
                      submitOrder={this.props.actions.submitOrder}
                    />
                  )}
                />
              </div>
            </div>{' '}
          </div>
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                <Loader
                  title={'SALES'}
                  status={tile.connectionState}
                  render={() => <Sales prices={tile.indicators} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card mb-4">
              <div className="card-body">
                <Loader
                  title={'ORDER BOOK'}
                  status={tile.connectionState}
                  render={() => depth}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <Loader
                  title={'BLOTTER'}
                  status={tile.connectionState}
                  render={() => (
                    <OrderBlotter orderUpdates={this.props.orderUpdates} />
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
