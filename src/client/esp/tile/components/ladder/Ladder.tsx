import React from 'react';
import style from './style.css';
import { PriceLadder } from '../../model/priceTick';

export namespace Ladder {
  export interface Props {
    prices: PriceLadder;
  }
}

export class Ladder extends React.PureComponent<Ladder.Props> {
  constructor(props: Ladder.Props, context: any) {
    super(props, context);
  }

  extractBigFigures(price) {
    return price.substr(4, 2).padEnd(2, '00');
  }

  render() {
    const { prices } = this.props;

    const sellPrices = prices.bids.map((p, i) => (
      <tr key={i}>
        <td className="w-25">
          <span className={style.quantity}>{p.quantity / 1000000}m</span>
        </td>
        <td className="w-75 text-right">
          <span className={style.priceValue}>
            {p.price.toString().substr(0, 4)}
          </span>
          <span className={style.bigFigures}>
            {this.extractBigFigures(p.price.toString())}
          </span>
          <span className={style.tenthOfPips}>
            {p.price.toString().substr(6) || '0'}
          </span>
        </td>
      </tr>
    ));

    const buyPrices = prices.asks.map((p, i) => (
      <tr key={i}>
        <td className="w-75">
          <span className={style.priceValue}>
            {p.price.toString().substr(0, 4)}
          </span>
          <span className={style.bigFigures}>
            {this.extractBigFigures(p.price.toString())}
          </span>
          <span className={style.tenthOfPips}>
            {p.price.toString().substr(6) || '0'}
          </span>
        </td>
        <td className="text-right w-25">
          <span className={style.quantity}>{p.quantity / 1000000}m</span>
        </td>
      </tr>
    ));

    return (
      <div className="row">
        <div className="col-sm-6">
          <table className="table table-striped table-hover table-borderless no-footer">
            <tbody>{sellPrices}</tbody>
          </table>
        </div>
        <div className="col-sm-6">
          <table className="table table-striped table-hover table-borderless no-footer">
            <tbody>{buyPrices}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
