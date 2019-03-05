import React from 'react';
import classNames from 'classnames';
import { TradeRequest } from '../../model/tradeRequest';
import * as style from './style.css';
import { Movements } from '../../model/priceTick';
import styled from 'styled-components';

export const TileStaleStyle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 3px;
  padding: 1.25rem;
  line-height: 1.5;
  z-index: 5;
  opacity: 0.7;
  pointer-events: none;
  cursor: not-allowed;
  background-color: #3d4853;
`;

export namespace Price {
  export interface Props {
    symbol: string;
    side: string;
    price: number;
    notional: number;
    execute: (tradeRequest: TradeRequest) => void;
    executing: boolean;
    url: string;
    movement?: string;
    isStale: boolean;
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
    return {
      first: first,
      bigFigures: bigFigures,
      tenthOfPips: tenthOfPips,
      movement: price.movement
    };
  }

  render() {
    const { side, price, executing, movement, isStale } = this.props;
    const { first, bigFigures, tenthOfPips } = this.state;

    const classes = classNames({
      [style.oneWayPrice]: true,
      [style.buy]: side === 'buy',
      [style.sell]: side === 'sell',
      'card-box': true,
      [style.nonTradeable]: price === 0,
      [style.executing]: executing === true
    });

    const visible = {
      visibility: 'visible'
    } as React.CSSProperties;

    const hidden = {
      visibility: 'hidden'
    } as React.CSSProperties;

    const upStyle =
      movement === Movements.Up ? visible : (hidden as React.CSSProperties);

    const downStyle =
      movement === Movements.Down ? visible : (hidden as React.CSSProperties);

    return (
      <div
        className="col-md-5"
        id="request-execution"
        onClick={this.handleOnClick}
      >
        <div className={`card ` + classes}>
          {isStale && (
            <TileStaleStyle>
              <h5 className="card-title">{side}</h5>
              <div className="text-white bg-secondary">Stale</div>
            </TileStaleStyle>
          )}

          <div className="card-body">
            <h5 className="card-title">{side}</h5>
            <div className={style.spreadUp} style={upStyle} />
            <div>
              <span>
                <span className={style.priceValue}>{first}</span>
                <span className={style.bigFigures}>{bigFigures}</span>
                <span className={style.tenthOfPips}>{tenthOfPips}</span>
              </span>
            </div>
            <div className={style.spreadDown} style={downStyle} />
          </div>
        </div>
      </div>
    );
  }
}
