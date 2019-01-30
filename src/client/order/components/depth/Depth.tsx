import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export namespace Depth {
  export interface Props {
    buyOrder: any[];
    sellOrder: any[];
    midMarketPrice: number;
  }

  export interface State {}
}

export class Depth extends React.PureComponent<Depth.Props, Depth.State> {
  constructor(props: Depth.Props, context: any) {
    super(props, context);
  }

  chartComponent = React.createRef<HighchartsReact>();

  componentDidMount() {
    const container = this.chartComponent.current.container.current;
    // container.style.position = 'absolute';
    container.style.left = 0;
    container.style.top = 0;
    container.style.display = 'block';
    this.chartComponent.current.chart.reflow();
  }

  componentWillUpdate(prevProps) {
    this.chartComponent.current.chart.xAxis[0].removePlotBand(
      'mid-market-price'
    );
    this.chartComponent.current.chart.xAxis[0].addPlotBand({
      value: this.props.midMarketPrice,
      color: '#526170',
      width: 1,
      label: {
        text: 'Mid Market Price',
        rotation: 90,
        style: { color: '#98a6ad' }
      },
      id: 'mid-market-price'
    });
  }

  render() {
    const cb = function() {};
    return (
      <HighchartsReact
        highcharts={Highcharts}
        ref={this.chartComponent}
        options={{
          colors: ['#00b19d', '#ef5350'],
          chart: {
            type: 'area',
            zoomType: 'xy',
            panning: true,
            panKey: 'shift',
            events: { load: cb },
            backgroundColor: '#3d4853',
            plotBorderColor: '#606063',
            style: { display: 'block' }
          },
          title: { text: '', style: { color: '#98a6ad' } },
          xAxis: {
            allowDecimals: true,
            minPadding: 0,
            maxPadding: 0,
            labels: {
              formatter: function() {
                return this.value;
              },
              style: { color: '#98a6ad' }
            },
            gridLineColor: '#526170',
            lineColor: '#526170',
            minorGridLineColor: '#526170',
            tickColor: '#98a6ad',
            title: { text: 'Price', style: { color: '#98a6ad' } }
          },
          yAxis: [
            {
              gridLineWidth: 1,
              tickLength: 5,
              lineColor: '#526170',
              gridLineColor: '#526170',
              tickPosition: 'inside',
              labels: { align: 'left', x: 8, style: { color: '#98a6ad' } },
              minorGridLineColor: '#98a6ad',
              tickColor: '#526170',
              tickWidth: 1,
              title: { text: 'Volume', style: { color: '#98a6ad' } }
            },
            {
              opposite: true,
              linkedTo: 0,
              lineWidth: 1,
              gridLineWidth: 0,
              title: null,
              tickWidth: 1,
              tickLength: 5,
              tickPosition: 'inside',
              labels: { align: 'right', x: -8, style: { color: '#98a6ad' } }
            }
          ],
          plotOptions: {
            area: {
              fillOpacity: 0.2,
              lineWidth: 1,
              step: 'center',
              marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: { hover: { enabled: true } }
              }
            }
          },
          legend: {
            itemStyle: { color: '#98a6ad' },
            itemHoverStyle: { color: '#FFF' },
            itemHiddenStyle: { color: '#606063' }
          },
          credits: { enabled: false },
          labels: { style: { color: '#707073' } },
          drilldown: {
            activeAxisLabelStyle: { color: '#F0F0F3' },
            activeDataLabelStyle: { color: '#F0F0F3' }
          },
          navigation: {
            buttonOptions: {
              symbolStroke: '#36afc8',
              theme: { fill: '#3d4853' }
            }
          },
          series: [
            { name: 'BIDS', data: this.props.buyOrder },
            { name: 'ASKS', data: this.props.sellOrder }
          ]
        }}
      />
    );
  }
}
