import * as React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

require('highcharts/indicators/indicators')(Highcharts);
require('highcharts/indicators/pivot-points')(Highcharts);
require('highcharts/indicators/macd')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/map')(Highcharts);

export namespace Sales {
  export interface Props {
    prices: any[];
  }
  export interface State {}
}

export class Sales extends React.PureComponent<Sales.Props, Sales.State> {
  constructor(props: Sales.Props, context: any) {
    super(props, context);
  }

  render() {
    const cb = function() {};
    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={{
          colors: ['#36afc8', '#34d0e9'],
          series: [
            {
              type: 'candlestick',
              name: 'Price',
              data: this.props.prices,
              tooltip: {
                valueDecimals: 5
              }
            },
            {
              type: 'column',
              name: 'Volume',
              showInNavigator: true,
              yAxis: 1,
              data: this.props.prices
                .map(trade => ({
                  x: trade.x,
                  y: trade.quantity
                }))
                .sort((a, b) => a.x - b.x)
            }
          ],
          chart: {
            events: { load: cb },
            backgroundColor: '#3d4853',
            height: '37.5%'
          },

          yAxis: [
            {
              allowDecimals: true,
              lineColor: '#526170',
              gridLineColor: '#526170',
              labels: {
                align: 'right',
                x: -3,
                style: {
                  color: '#98a6ad'
                }
              },
              title: {
                text: 'Price',
                style: {
                  color: '#98a6ad'
                }
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                enabled: true
              }
            },
            {
              lineColor: '#526170',
              gridLineColor: '#526170',
              labels: {
                align: 'right',
                x: -3,
                style: {
                  color: '#98a6ad'
                }
              },
              title: {
                text: 'Volume',
                style: {
                  color: '#98a6ad'
                }
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
            }
          ],
          xAxis: {
            gridLineColor: '#526170',
            labels: {
              style: {
                color: '#98a6ad'
              }
            },
            lineColor: '#526170',
            tickColor: '#526170',
            type: 'datetime',
            title: {
              style: {
                color: '#98a6ad'
              }
            }
          },

          tooltip: {
            split: true
          },

          rangeSelector: {
            inputEnabled: false,
            selected: 2,
            buttons: [
              {
                count: 1,
                type: 'minute',
                text: '1M'
              },
              {
                count: 5,
                type: 'minute',
                text: '5M'
              },
              {
                type: 'all',
                text: 'All'
              }
            ],
            buttonTheme: {
              fill: '#3bafda',
              stroke: '#98a6ad',
              style: {
                color: 'white'
              },
              states: {
                hover: {
                  fill: '#707073',
                  stroke: '#000000',
                  style: {
                    color: '#98a6ad'
                  }
                },
                select: {
                  fill: '#000003',
                  stroke: '#000000',
                  style: {
                    color: '#98a6ad'
                  }
                }
              }
            },
            inputBoxBorderColor: '#526170',
            inputStyle: {
              backgroundColor: '#333',
              color: '#98a6ad'
            },
            labelStyle: {
              color: '#98a6ad'
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

          navigator: {
            enabled: false
          },

          credits: {
            enabled: false
          },

          scrollbar: {
            barBackgroundColor: '#3d4853',
            barBorderColor: '#3d4853',
            buttonArrowColor: '#3d4853',
            buttonBackgroundColor: '#3d4853',
            buttonBorderColor: '#3d4853',
            rifleColor: '#3d4853',
            trackBackgroundColor: '#3d4853',
            trackBorderColor: '#3d4853'
          },

          background2: '#505053',
          dataLabelsColor: '#B0B0B3',
          textColor: '#C0C0C0',
          contrastTextColor: '#F0F0F3',
          maskColor: 'rgba(255,255,255,0.3)'
        }}
      />
    );
  }
}
