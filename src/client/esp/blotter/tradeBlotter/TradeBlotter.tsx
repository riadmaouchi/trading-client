import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { TradeReport } from '../../tile/model/tradeReport';

export namespace TradeBlotter {
  export interface Props {
    tradeReports: TradeReport[];
    subscribe(): void;
    unsubscribe(): void;
  }
}

export class TradeBlotter extends React.PureComponent<TradeBlotter.Props> {
  constructor(props: TradeBlotter.Props) {
    super(props);
  }

  componentDidMount() {
    this.props.subscribe();
  }

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  render() {
    return (
      <div
        style={{ height: '300px', width: '100%' }}
        className={'ag-theme-bootstrap'}
      >
        <AgGridReact
          columnDefs={this.colDefs}
          rowData={this.props.tradeReports}
          enableCellChangeFlash={true}
          deltaRowDataMode={true}
          enableSorting={true}
          enableFilter={true}
          enableColResize={true}
          animateRows={false}
          getRowNodeId={data => data.id}
          suppressHorizontalScroll={true}
          onGridReady={params => params.api.sizeColumnsToFit()}
        />
      </div>
    );
  }

  colDefs = [
    {
      headerName: 'Trade Date',
      field: 'tradeDate',
      filter: 'agDateColumnFilter',
      sort: 'desc'
    },
    { headerName: 'ID', field: 'id', filter: 'number' },
    {
      headerName: 'Counterpart',
      field: 'broker',
      filter: 'text'
    },
    { headerName: 'Symbol', field: 'symbol', filter: 'text' },
    {
      headerName: 'Direction',
      field: 'direction',
      filter: 'text'
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: function(params) {
        if (params.value === 'ACCEPTED') {
          return (
            '<span class="badge badge-success">' + params.value + '</span>'
          );
        }
        return '<span class="badge badge-pink">' + params.value + '</span>';
      }
    },
    { headerName: 'Amount', field: 'quantity', filter: 'number' },
    { headerName: 'Price', field: 'price', filter: 'number' }
  ];
}
