import React from 'react';
import classNames from 'classnames';
import { TradeRequest } from '../../model/tradeRequest';
import * as style from './style.css';

export namespace Price {
  export interface Props {
    symbol: string;
    side: string;
    price: number;
    notional: number;
    execute: (tradeRequest: TradeRequest) => void;
    executing: boolean;
    url: string;
  }

  export interface State {
    first: string;
    bigFigures: string;
    tenthOfPips: string;
  }
}

export class Price extends React.PureComponent<Price.Props, Price.State> {
  constructor(props: Price.Props, context: any) {
    super(props, context);
    this.state = {
      first: '0.00',
      bigFigures: '00',
      tenthOfPips: '0'
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const tradeRequest: TradeRequest = {
      id: 1,
      symbol: this.props.symbol,
      broker: 'WEB',
      price: this.props.price,
      side: this.props.side,
      quantity: this.props.notional,
      url: this.props.url
    };
    this.props.execute(tradeRequest);
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.extractPrice(newProps.price));
  }

  extractPrice(price) {
    const priceStr = price.toString();
    const first = priceStr.substr(0, 4);
    const bigFigures = priceStr.substr(4, 2).padEnd(2, '00');
    const tenthOfPips = priceStr.substr(6) || '0';
    return { first: first, bigFigures: bigFigures, tenthOfPips: tenthOfPips };
  }

  render() {
    const { side, price, executing } = this.props;
    const { first, bigFigures, tenthOfPips } = this.state;

    const classes = classNames({
      [style.oneWayPrice]: true,
      [style.buy]: side === 'buy',
      [style.sell]: side === 'sell',
      'card-box': true,
      [style.nonTradeable]: price === 0,
      [style.executing]: executing === true
    });

    return (
      <div
        className="col-md-5"
        id="request-execution"
        onClick={this.handleOnClick}
      >
        <div className={`card ` + classes}>
          <div className="card-body">
            <h5 className="card-title">{side}</h5>
            <span>
              <span className={style.priceValue}>{first}</span>
              <span className={style.bigFigures}>{bigFigures}</span>
              <span className={style.tenthOfPips}>{tenthOfPips}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
