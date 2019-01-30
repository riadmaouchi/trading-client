import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Order } from '../../model/order';
import HorizontalBarComponent from './HorizontalBarComponent';
export namespace OrderBook {
  export interface Props {
    side: string;
    order: Order[];
  }

  export interface State {}
}

export class OrderBook extends React.PureComponent<
  OrderBook.Props,
  OrderBook.State
> {
  constructor(props: OrderBook.Props, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div
        style={{ height: '300px', width: '100%' }}
        className="ag-theme-bootstrap"
      >
        <AgGridReact
          columnDefs={this.colDefs}
          rowData={this.props.order}
          enableCellChangeFlash={true}
          deltaRowDataMode={true}
          enableSorting={true}
          enableFilter={true}
          enableColResize={true}
          animateRows={false}
          getRowNodeId={order => order.price}
          suppressHorizontalScroll={true}
          onGridReady={params => params.api.sizeColumnsToFit()}
        />
      </div>
    );
  }

  numberFormatter(params) {
    if (typeof params.value === 'number') {
      return params.value.toFixed(5);
    } else {
      return params.value;
    }
  }

  colDefs =
    this.props.side === 'buy'
      ? [
          {
            headerName: '',
            field: 'size',
            cellRendererFramework: HorizontalBarComponent
          },
          {
            headerName: 'Value',
            valueFormatter: this.numberFormatter,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
            valueGetter: '(data.size * data.price).toFixed(2)'
          },
          {
            headerName: 'Amount',
            field: 'size',
            cellRenderer: 'agAnimateShowChangeCellRenderer'
          },
          {
            headerName: 'Bid',
            field: 'price',
            valueFormatter: this.numberFormatter,
            sort: 'desc',
            cellStyle: { color: '#00b19d' }
          }
        ]
      : [
          {
            headerName: '',
            field: 'size',
            cellRendererFramework: HorizontalBarComponent
          },
          {
            headerName: 'Ask',
            field: 'price',
            valueFormatter: this.numberFormatter,
            sort: 'asc',
            cellStyle: { color: '#f76397' }
          },
          {
            headerName: 'Amount',
            field: 'size',
            cellRenderer: 'agAnimateShowChangeCellRenderer'
          },
          {
            headerName: 'Value',
            valueFormatter: this.numberFormatter,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
            valueGetter: '(data.size * data.price).toFixed(2)'
          }
        ];
}
