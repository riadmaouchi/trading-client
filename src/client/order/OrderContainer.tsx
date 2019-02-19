import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../combineReducers';
import { Panel } from './components/panel/Panel';
import Notification from '../order/components/panel/notification/Notification';
import ProgressBar from '../layout/notification/ProgressBar';
import { OrderBookWrapper } from './components/orderbook/OrderBookWrapper';
import { Sales } from './components/sales/Sales';
import { OrderBlotter } from './components/blotter/Blotter';
import { Loader } from '../layout/loader/Loader';
import { OrderData } from './model/orderData';
import { OrderAction } from './actions';
import { OrderBlotterAction } from './components/blotter/actions';
import { OrderUpdate } from './model/orderUpdate';

export namespace OrderContainer {
  export interface Props extends RouteComponentProps<void> {
    tile: OrderData;
    actions: typeof OrderAction;
    blotterActions: typeof OrderBlotterAction;
    orderUpdates: OrderUpdate[];
  }
}
export class OrderContainer extends React.PureComponent<OrderContainer.Props> {
  constructor(props: OrderContainer.Props) {
    super(props);
    this.saveOrderType = this.saveOrderType.bind(this);
    this.saveNotional = this.saveNotional.bind(this);
    this.saveLimit = this.saveLimit.bind(this);
    this.dismissNotification = this.dismissNotification.bind(this);
  }

  componentWillMount() {
    this.props.actions.subscribeOrderbookConnectionState(
      this.props.tile.orderPanelData.url
    );
  }

  componentWillUnmount() {
    this.props.actions.unsubscribeOrderbookConnectionState();
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
                  render={() => (
                    <Sales
                      prices={tile.indicators}
                      subscribe={this.props.actions.subscribeIndicators}
                    />
                  )}
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
                  render={() => (
                    <OrderBookWrapper
                      tile={tile}
                      subscribeOrderBook={this.props.actions.subscribeOrderBook}
                      subscribeLastTrades={
                        this.props.actions.subscribeLastTrades
                      }
                      subscribeToMarketPrice={
                        this.props.actions.subscribeToMarketPrice
                      }
                    />
                  )}
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
                    <OrderBlotter
                      orderUpdates={this.props.orderUpdates}
                      subscribe={
                        this.props.blotterActions.orderBlotterSubscribe
                      }
                      unsubscribe={
                        this.props.blotterActions.orderBlotterUnubscribe
                      }
                      url={this.props.tile.orderPanelData.url}
                    />
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
