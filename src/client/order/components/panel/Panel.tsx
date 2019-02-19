import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderPanelData } from '../../model/orderData';
import { SubmitOrder } from '../../model/submitOrder';

export namespace Panel {
  export interface Props {
    tile: OrderPanelData;
    onSave: (notional: number) => void;
    onSaveOrderType: (orderType: string) => void;
    onSaveLimit: (limit: number) => void;
    submitOrder: (submitOrder: SubmitOrder) => void;
  }

  export interface State {
    orderType: string;
    limit: number;
    amount: number;
    settlementDate: string;
    tenor: string;
  }
}

export class Panel extends React.PureComponent<Panel.Props, Panel.State> {
  constructor(props: Panel.Props, context: any) {
    super(props, context);
    this.state = {
      orderType: props.tile.orderType,
      limit: props.tile.limit,
      settlementDate: props.tile.settlementDate,
      tenor: props.tile.tenor,
      amount: props.tile.notional
    };
    this.submitBuyOrder = this.submitBuyOrder.bind(this);
    this.submitSellOrder = this.submitSellOrder.bind(this);
    this.onOrderTypeChange = this.onOrderTypeChange.bind(this);
    this.onOrderTypeKeyDown = this.onOrderTypeKeyDown.bind(this);
    this.onOrderTypeBlur = this.onOrderTypeBlur.bind(this);
    this.onLimitChange = this.onLimitChange.bind(this);
    this.onLimitKeyDown = this.onLimitKeyDown.bind(this);
    this.onLimitBlur = this.onLimitBlur.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onAmountKeyDown = this.onAmountKeyDown.bind(this);
    this.onAmountBlur = this.onAmountBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.tile.limit !== prevProps.tile.limit) {
      this.setState({ limit: this.props.tile.limit });
    }
  }

  submitBuyOrder() {
    this.handleOnClick('buy');
  }

  submitSellOrder() {
    this.handleOnClick('sell');
  }

  handleOnClick(side: string) {
    const submitOrder: SubmitOrder = {
      symbol: this.props.tile.symbol,
      broker: 'WEB',
      price: this.props.tile.limit,
      side: side,
      amount: this.props.tile.notional,
      type: this.props.tile.orderType,
      url: this.props.tile.url
    };
    this.props.submitOrder(submitOrder);
  }

  onOrderTypeKeyDown(e) {
    const orderType = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSaveOrderType(orderType);
    } else if (e.which === 27) {
      this.setState({ orderType: this.props.tile.orderType });
    }
  }

  onOrderTypeBlur(e) {
    const orderType = e.target.value.trim();
    this.props.onSaveOrderType(orderType);
  }

  onOrderTypeChange(e) {
    this.setState({ orderType: e.target.value.trim() });
  }

  onLimitKeyDown(e) {
    const limit = parseFloat(e.target.value.trim());
    if (e.which === 13) {
      this.props.onSaveLimit(limit);
    } else if (e.which === 27) {
      this.setState({ limit: this.props.tile.limit });
    }
  }

  onLimitBlur(e) {
    const limit = parseFloat(e.target.value.trim());
    this.props.onSaveLimit(limit);
  }

  onLimitChange(e) {
    this.setState({ limit: parseFloat(e.target.value.trim()) });
  }

  notionalChanged(e) {
    let value = e.target.value;

    if (value.endsWith('M') || value.endsWith('m')) {
      value = parseInt(value) * 1000000;
    } else if (value.endsWith('K') || value.endsWith('k')) {
      value = parseInt(value) * 1000;
    }
    return value;
  }

  onAmountKeyDown(e) {
    const amount = this.notionalChanged(e);
    if (e.which === 13) {
      this.props.onSave(amount);
    } else if (e.which === 27) {
      this.setState({ limit: this.props.tile.notional });
    }
  }

  onAmountBlur(e) {
    const amount = this.notionalChanged(e);
    this.props.onSave(amount);
  }

  onAmountChange(e) {
    this.setState({ amount: this.notionalChanged(e) });
  }

  onSettlementDateKeyDown(e) {}

  onSettlementDateBlur(e) {}

  onSettlementDateChange(e) {}

  render() {
    const { tile } = this.props;
    const { orderType, limit, tenor, settlementDate, amount } = this.state;
    return (
      <div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Settlement</label>
          <div className="col-sm-8">
            <div className="input-group input-group-sm mb-3">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="dd/MM/yyyy"
                onChange={this.onSettlementDateChange}
                onKeyDown={this.onSettlementDateKeyDown}
                onBlur={this.onSettlementDateBlur}
                value={settlementDate
                  .concat(' (')
                  .concat(tenor)
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
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Order Type</label>
          <div className="col-sm-8">
            <select
              className="form-control form-control-sm select2 select2-hidden-accessible"
              aria-hidden="true"
              value={orderType}
              onChange={this.onOrderTypeChange}
              onKeyDown={this.onOrderTypeKeyDown}
              onBlur={this.onOrderTypeBlur}
            >
              <option value="limit">Limit</option>
              <option value="market">Market</option>
            </select>
          </div>
        </div>
        {orderType === 'limit' && (
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Limit Price</label>
            <div className="col-sm-8">
              <div className="input-group input-group-sm mb-3">
                <input
                  type="number"
                  step="0.00001"
                  min="0"
                  className="form-control"
                  value={limit}
                  onChange={this.onLimitChange}
                  onKeyDown={this.onLimitKeyDown}
                  onBlur={this.onLimitBlur}
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    {tile.symbol.substr(0, 3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Amount</label>
          <div className="col-sm-8">
            <div className="input-group input-group-sm mb-3">
              <input
                type="text"
                className="form-control"
                value={amount}
                onChange={this.onAmountChange}
                onKeyDown={this.onAmountKeyDown}
                onBlur={this.onAmountBlur}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  {tile.symbol.substr(0, 3)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.submitBuyOrder}
            >
              Buy
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="submit"
              className="btn btn-danger btn-block"
              onClick={this.submitSellOrder}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    );
  }
}
