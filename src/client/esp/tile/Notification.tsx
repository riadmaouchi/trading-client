import React from 'react';
import numeral from 'numeral';
import { Transition } from 'react-spring';
import Error from '../../layout/notification/Error';
import Success from '../../layout/notification/Success';
import { LastExecutionStatus } from './model/tileData';
export namespace Notification {
  export interface Props {
    lastExecutionStatus?: LastExecutionStatus | null;
    symbol: string;
    dismissNotification: () => void;
  }

  export interface State {
    items: any[];
  }
}

export default class Notification extends React.PureComponent<
  Notification.Props,
  Notification.State
> {
  constructor(props: Notification.Props, context: any) {
    super(props, context);
  }

  render() {
    const { lastExecutionStatus } = this.props;
    return (
      <Transition
        native
        reset
        unique
        items={0}
        from={{ opacity: 0 }}
        enter={{ opacity: 1 }}
        leave={{ opacity: 0, pointerEvents: 'none' }}
      >
        {index => {
          if (lastExecutionStatus && lastExecutionStatus.hasError) {
            return (style: React.CSSProperties) => (
              <Error
                symbol={this.props.symbol}
                dismissNotification={this.props.dismissNotification}
                tradeId={
                  lastExecutionStatus.trade && lastExecutionStatus.trade.id
                }
              >
                {this.props.lastExecutionStatus.error} : Your trade has been
                rejected
              </Error>
            );
          }

          if (!lastExecutionStatus) {
            return () => null;
          }

          if (lastExecutionStatus.trade) {
            return (style: React.CSSProperties) => (
              <Success
                symbol={this.props.symbol}
                dismissNotification={this.props.dismissNotification}
                tradeId={lastExecutionStatus.trade.id}
              >
                You {lastExecutionStatus.request.side}{' '}
                <mark>
                  {lastExecutionStatus.request.symbol.substr(0, 3)}{' '}
                  {numeral(lastExecutionStatus.request.quantity).format(
                    '0,000,000[.]00'
                  )}
                </mark>
                at a rate of ${lastExecutionStatus.request.price} for
                <mark>
                  {lastExecutionStatus.request.symbol.substr(3, 6)}{' '}
                  {numeral(
                    lastExecutionStatus.request.quantity *
                      lastExecutionStatus.request.price
                  ).format('0,000,000[.]00')}
                </mark>
              </Success>
            );
          }
          return null;
        }}
      </Transition>
    );
  }
}
