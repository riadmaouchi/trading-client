import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Point } from '../../model/point';

export namespace Depth {
  export interface Props {
    buyOrder: Point[];
    sellOrder: Point[];
  }

  export interface State {}
}

export class Depth extends React.PureComponent<Depth.Props, Depth.State> {
  constructor(props: Depth.Props, context: any) {
    super(props, context);
  }

  render() {
    const cb = function() {};
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          colors: ['#00b19d', '#ef5350'],
          chart: {
            type: 'area',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            events: { load: cb },
            backgroundColor: '#3d4853',
            plotBorderColor: '#606063',
            height: '40%'
          },
          title: {
            text: '',
            style: {
              color: '#98a6ad'
            }
          },
          xAxis: {
            allowDecimals: true,
            labels: {
              formatter: function() {
                return this.value;
              },
              style: {
                color: '#98a6ad'
              }
            },
            gridLineColor: '#526170',
            lineColor: '#505053',
            minorGridLineColor: '#505053',
            tickColor: '#505053',
            title: {
              text: 'Price',
              style: {
                color: '#98a6ad'
              }
            }
          },
          yAxis: {
            gridLineColor: '#526170',
            labels: {
              formatter: function() {
                return this.value;
              },
              style: {
                color: '#98a6ad'
              }
            },
            lineColor: '#526170',
            minorGridLineColor: '#526170',
            tickColor: '#526170',
            tickWidth: 1,
            title: {
              text: 'Volume',
              style: {
                color: '#98a6ad'
              }
            }
          },
          plotOptions: {
            area: {
              marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                  hover: {
                    enabled: true
                  }
                }
              }
            }
          },
          legend: {
            itemStyle: {
              color: '#98a6ad'
            },
            itemHoverStyle: {
              color: '#FFF'
            },
            itemHiddenStyle: {
              color: '#606063'
            }
          },
          credits: {
            enabled: false
          },
          labels: {
            style: {
              color: '#707073'
            }
          },

          drilldown: {
            activeAxisLabelStyle: {
              color: '#F0F0F3'
            },
            activeDataLabelStyle: {
              color: '#F0F0F3'
            }
          },
          navigation: {
            buttonOptions: {
              symbolStroke: '#36afc8',
              theme: {
                fill: '#3d4853'
              }
            }
          },
          series: [
            {
              name: 'BIDS',
              data: this.props.buyOrder
            },
            {
              name: 'ASKS',
              data: this.props.sellOrder
            }
          ]
        }}
      />
    );
  }
}
