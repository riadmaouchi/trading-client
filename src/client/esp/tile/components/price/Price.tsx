import React from 'react';
import * as style from './style.css';
import { Movements } from '../../model/priceTick';

export namespace Price {
  export interface Props {
    price: number;
    movement?: string;
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
    const { movement } = this.props;
    const { first, bigFigures, tenthOfPips } = this.state;

    const upVisible = {
      visibility: 'visible'
    } as React.CSSProperties;

    const downVisible = {
      visibility: 'visible'
    } as React.CSSProperties;

    const hidden = {
      visibility: 'hidden'
    } as React.CSSProperties;

    const upStyle =
      movement === Movements.Up ? upVisible : (hidden as React.CSSProperties);

    const downStyle =
      movement === Movements.Down
        ? downVisible
        : (hidden as React.CSSProperties);

    return (
      <div>
        <div className={style.spreadUp} style={upStyle} />
        <div className={style.spreadDown} style={downStyle} />
        <div>
          <span>{first}</span>
          <span className={style.bigFigures}>{bigFigures}</span>
          <span className={style.tenthOfPips}>{tenthOfPips}</span>
        </div>
      </div>
    );
  }
}
