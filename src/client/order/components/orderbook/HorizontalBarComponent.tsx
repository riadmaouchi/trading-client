import React, { Component } from 'react';
import { GridOptions } from '../../../../../node_modules/ag-grid-community';

export namespace HorizontalBarComponent {
  export interface Props {
    value: number;
  }

  export interface State {
    value: number;
    options: GridOptions;
    total: number;
    side: string;
  }
}

export default class HorizontalBarComponent extends Component<
  HorizontalBarComponent.Props,
  HorizontalBarComponent.State
> {
  constructor(props) {
    super(props);

    let result = 0;
    props.agGridReact.gridOptions.rowData.forEach(function(item) {
      result += item.size;
    });
    this.state = {
      value: this.props.value,
      options: props.agGridReact.gridOptions,
      total: result,
      side: props.node.data.side
    };
  }

  render() {
    const asksChange = { fill: '#f76397', opacity: 0.3 };
    const bidChange = { fill: '#00b19d', opacity: 0.3 };

    const value = this.state.value;
    const percent = (value * 100) / this.state.total;
    const barWidth = `${percent}%`;
    const barStyle = this.state.side === 'BUY' ? bidChange : asksChange;

    return (
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%' }}>
          <svg width="100%" preserveAspectRatio="none">
            <rect x={0} y="0" width={barWidth} style={barStyle} />
          </svg>
        </div>
      </div>
    );
  }

  refresh(params) {
    this.setState({ value: params.value });
    return true;
  }
}
