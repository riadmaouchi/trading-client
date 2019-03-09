import React from 'react';
import style from './style.css';
import { Price } from '../../model/priceTick';

export namespace Ladder {
  export interface Props {
    bids: Price[];
    asks: Price[];
  }
}

const extractPips = price => price.substr(4, 2).padEnd(2, '00');

const Ladder: React.FC<Ladder.Props> = ({ bids = [], asks = [] }) => {
  const sellPrices = bids.map((p, i) => (
    <tr key={i}>
      <td className="w-25">
        <span className={style.quantity}>{p.quantity / 1000000}M</span>
      </td>
      <td className="w-75 text-right">
        <span className={style.bigFigures}>
          {p.price.toString().substr(0, 4)}
        </span>
        <span className={style.pips}>{extractPips(p.price.toString())}</span>
        <span className={style.tenthOfPips}>
          {p.price.toString().substr(6) || '0'}
        </span>
      </td>
    </tr>
  ));

  const buyPrices = asks.map((p, i) => (
    <tr key={i}>
      <td className="w-75">
        <span className={style.bigFigures}>
          {p.price.toString().substr(0, 4)}
        </span>
        <span className={style.pips}>{extractPips(p.price.toString())}</span>
        <span className={style.tenthOfPips}>
          {p.price.toString().substr(6) || '0'}
        </span>
      </td>
      <td className="text-right w-25">
        <span className={style.quantity}>{p.quantity / 1000000}M</span>
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
};

export default Ladder;
