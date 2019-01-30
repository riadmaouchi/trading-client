import React from 'react';
import numeral from 'numeral';
import { Transition } from 'react-spring';
import Error from '../../../../layout/notification/Error';
import Success from '../../../../layout/notification/Success';
import { LastOrderPlacingStatus } from '../../../model/orderData';
export namespace Notification {
  export interface Props {
    lastOrderPlacingStatus?: LastOrderPlacingStatus | null;
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
    const { lastOrderPlacingStatus } = this.props;
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
          if (lastOrderPlacingStatus && lastOrderPlacingStatus.hasError) {
            return (style: React.CSSProperties) => (
              <Error
                symbol={this.props.symbol}
                dismissNotification={this.props.dismissNotification}
              >
                {this.props.lastOrderPlacingStatus.error} : Your trade has been
                rejected
              </Error>
            );
          }

          if (!lastOrderPlacingStatus) {
            return () => null;
          }

          if (lastOrderPlacingStatus.request) {
            return (style: React.CSSProperties) => (
              <Success
                symbol={this.props.symbol}
                dismissNotification={this.props.dismissNotification}
              >
                You placed a {lastOrderPlacingStatus.request.type}
                {' order to '}
                {lastOrderPlacingStatus.request.side}{' '}
                <mark>
                  {lastOrderPlacingStatus.request.symbol.substr(0, 3)}{' '}
                  {numeral(lastOrderPlacingStatus.request.amount).format(
                    '0,000,000[.]00'
                  )}
                </mark>
                {lastOrderPlacingStatus.request.type === 'limit' &&
                  ` at a rate of ${lastOrderPlacingStatus.request.price} for `}
                {lastOrderPlacingStatus.request.type === 'limit' && (
                  <mark>
                    {lastOrderPlacingStatus.request.symbol.substr(3, 6)}{' '}
                    {numeral(
                      lastOrderPlacingStatus.request.amount *
                        lastOrderPlacingStatus.request.price
                    ).format('0,000,000[.]00')}
                  </mark>
                )}
              </Success>
            );
          }
          return null;
        }}
      </Transition>
    );
  }
}
