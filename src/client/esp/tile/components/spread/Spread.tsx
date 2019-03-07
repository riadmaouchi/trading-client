import React from 'react';
import * as style from './style.css';

export namespace Spread {
  export interface Props {
    bid: number;
    ask: number;
  }

  export interface State {
    spread: string;
    direction: string;
  }
}

export class Spread extends React.PureComponent<Spread.Props, Spread.State> {
  constructor(props: Spread.Props, context: any) {
    super(props, context);
    this.state = { spread: '0', direction: 'neutral' };
  }

  componentDidUpdate(prevProps) {
    if (this.props.ask !== prevProps.ask || this.props.bid !== prevProps.bid) {
      const spread = ((this.props.ask - this.props.bid) * 1000).toFixed(2);
      const direction = this.props.ask > prevProps.ask ? 'up' : 'down';
      this.setState({ spread: spread, direction: direction });
    }
  }

  render() {
    const { direction, spread } = this.state;

    const visible = {
      visibility: 'visible'
    } as React.CSSProperties;

    const hidden = {
      visibility: 'hidden'
    } as React.CSSProperties;

    const upStyle =
      direction === 'up' ? visible : (hidden as React.CSSProperties);

    const downStyle =
      direction === 'down' ? visible : (hidden as React.CSSProperties);
    return (
      <div className={style.spread}>
        <div className={style.spreadUp} style={upStyle} />
        <div className={style.spreadValue}>
          <small>{spread}</small>
        </div>
        <div className={style.spreadDown} style={downStyle} />
      </div>
    );
  }
}
