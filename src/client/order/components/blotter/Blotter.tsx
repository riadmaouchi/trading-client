import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { OrderUpdate } from '../../model/orderUpdate';

export namespace OrderBlotter {
  export interface Props {
    orderUpdates: OrderUpdate[];
  }

  export interface State {}
}

export class OrderBlotter extends React.PureComponent<
  OrderBlotter.Props,
  OrderBlotter.State
> {
  constructor(props: OrderBlotter.Props, context: any) {
    super(props, context);
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }

  render() {
    return (
      <div
        style={{ height: '270px', width: '100%' }}
        className="ag-theme-bootstrap"
      >
        <AgGridReact
          columnDefs={this.colDefs}
          rowData={this.props.orderUpdates}
          enableCellChangeFlash={true}
          deltaRowDataMode={true}
          enableSorting={true}
          enableFilter={true}
          enableColResize={true}
          animateRows={false}
          getRowNodeId={data => data.id}
          suppressHorizontalScroll={true}
          onGridReady={this.onGridReady}
        />
      </div>
    );
  }

  colDefs = [
    {
      headerName: 'Trade Date',
      field: 'time',
      filter: 'agDateColumnFilter',
      sort: 'desc'
    },
    { headerName: 'ID', field: 'id', filter: 'number' },
    {
      headerName: 'Counterpart',
      field: 'broker',
      filter: 'agTextColumnFilter'
    },
    { headerName: 'Symbol', field: 'symbol', filter: 'agTextColumnFilter' },
    { headerName: 'Side', field: 'direction', filter: 'agTextColumnFilter' },
    { headerName: 'Limit', field: 'limit', filter: 'number' },
    {
      headerName: 'Fill %',
      filter: 'string',
      valueGetter: '(data.amount*100 / data.requestedAmount).toFixed(0)',
      valueFormatter: function(params) {
        if (typeof params.value === 'number' && params.value > 0) {
          return params.value.toFixed(5);
        } else {
          return ' ';
        }
      },
      cellRenderer: function(params) {
        return (
          '<div class="progress progress-md">' +
          '<div class="progress-bar bg-primary" role="progressbar" style="width: ' +
          params.value +
          '%" aria-valuenow="' +
          params.value +
          '" aria-valuemin="0" aria-valuemax="100">' +
          params.value +
          '%</div>' +
          '</div>'
        );
      }
    },
    {
      headerName: 'Req. Amount',
      field: 'requestedAmount',
      filter: 'number'
    },
    { headerName: 'Left Amount', field: 'leftAmount', filter: 'number' },
    { headerName: 'Amount', field: 'amount', filter: 'number' },

    {
      headerName: 'Avg. Price',
      field: 'price',
      filter: 'number',
      cellRenderer: 'agAnimateShowChangeCellRenderer'
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: function(params) {
        if (params.value === 'SUBMITTING') {
          return (
            '<span class="badge badge-warning">' + params.value + '</span>'
          );
        } else if (params.value === 'WORKING') {
          return '<span class="badge badge-purple">' + params.value + '</span>';
        }
        return '<span class="badge badge-success">' + params.value + '</span>';
      }
    }
  ];
}
