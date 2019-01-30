import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const TileNotificationStyle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 3px;
  padding: 1.25rem;
  line-height: 1.5;
  z-index: 10;
`;

export interface Props {
  children: React.ReactNode;
  symbol: string;
  tradeId?: string;
  dismissNotification: () => void;
}

const OrderPlaced: React.SFC<Props> = ({
  children,
  symbol,
  tradeId,
  dismissNotification
}) => {
  return (
    <TileNotificationStyle className="text-white bg-success">
      <div className="card-body">
        <h4 className="card-title">
          <FontAwesomeIcon icon="check-circle" />
          {` `} {symbol}
        </h4>

        <div className="alert alert-success text-center" role="alert">
          {tradeId && <h6>Trade ID: {tradeId}</h6>}
          {children}
        </div>
        <div className="text-center">
          <button
            type="button"
            className=" btn btn-success btn-lg"
            onClick={dismissNotification}
          >
            <FontAwesomeIcon icon="times-circle" />
            {` `}Close
          </button>
        </div>
      </div>
    </TileNotificationStyle>
  );
};

export default OrderPlaced;
