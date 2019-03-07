import React from 'react';
import classNames from 'classnames';
import { TradeRequest } from '../../model/tradeRequest';
import * as style from './style.css';
import styled from 'styled-components';
import { Price } from '../price/Price';

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

export namespace PriceButton {
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
}

export class PriceButton extends React.PureComponent<PriceButton.Props> {
  constructor(props: PriceButton.Props) {
    super(props);
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

  render() {
    const { side, price, executing, movement, isStale } = this.props;

    const classes = classNames({
      [style.oneWayPrice]: true,
      [style.buy]: side === 'buy',
      [style.sell]: side === 'sell',
      [style.nonTradeable]: price === 0,
      [style.executing]: executing === true
    });

    return (
      <div
        className="col-md-5"
        id="request-execution"
        onClick={this.handleOnClick}
      >
        <div className={`card   ${classes}`}>
          <h5 className="card-title">{side}</h5>
          {isStale && (
            <TileStaleStyle>
              <h5 className="card-title text-white bg-secondary">Stale</h5>
            </TileStaleStyle>
          )}

          <div className="card-body">
            <Price price={price} movement={movement} />
          </div>
        </div>
      </div>
    );
  }
}
