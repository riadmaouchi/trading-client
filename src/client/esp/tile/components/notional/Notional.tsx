import React from 'react';

export namespace Notional {
  export interface Props {
    notional: number;
    symbol: string;
    onSave: (notional: number) => void;
  }

  export interface State {
    notional: number;
  }
}

export class Notional extends React.PureComponent<
  Notional.Props,
  Notional.State
> {
  constructor(props: Notional.Props, context: any) {
    super(props, context);
    this.state = { notional: props.notional };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
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

  handleKeyDown(e) {
    const notional = this.notionalChanged(e);
    if (e.which === 13) {
      this.props.onSave(notional);
    } else if (e.which === 27) {
      this.setState({ notional: this.props.notional });
    }
  }

  handleOnBlur(e) {
    const notional = this.notionalChanged(e);
    this.props.onSave(notional);
  }

  handleOnChange(e) {
    this.setState({ notional: this.notionalChanged(e) });
  }

  render() {
    const { symbol } = this.props;
    const { notional } = this.state;

    const currency = symbol.substr(0, 3);

    return (
      <div className="form-group">
        <div className="input-group input-group-sm mb-3">
          <input
            type="text"
            className="form-control"
            value={notional}
            onChange={this.handleOnChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleOnBlur}
          />
          <div className="input-group-append">
            <span className="input-group-text">{currency}</span>
          </div>
        </div>
      </div>
    );
  }
}
