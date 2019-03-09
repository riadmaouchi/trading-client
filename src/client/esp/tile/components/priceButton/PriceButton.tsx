import React from 'react';
import styled from 'styled-components';
import { Movements } from '../../model/priceTick';
import * as style from './style.css';

export const TileStaleStyle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  line-height: 1.5;
  z-index: 5;
  opacity: 0.7;
  pointer-events: none;
  cursor: not-allowed;
  background-color: #3d4853;
`;

export const TradeExecution = styled.button`
  background-color: #3d4853;
  color: inherit;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;
  border: #3bafda;

  :hover {
    color: white;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
    &:hover {
      box-shadow: 0 0 40px 40px #3bafda inset;
    }
  }
`;

const PriceBox = styled.div`
  padding: 0;
  margin: 0;

  ${TradeExecution}:hover & {
    color: white;
  }
`;

const Direction = styled(PriceBox)`
  margin: 0 0 0.125rem 0;
`;

const BigFigures = styled(PriceBox)`
  line-height: 1rem;
`;

const Pips = styled(PriceBox)`
  font-size: 400%;
  line-height: 4rem;
  margin: 0 0.125rem;
  color: #3bafda;
`;

const TenthOfPips = styled(PriceBox)`
  margin: 0.125rem 0;
  align-self: flex-end;
`;

const Price = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigFiguresContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const visible = {
  visibility: 'visible'
} as React.CSSProperties;

const hidden = {
  visibility: 'hidden'
} as React.CSSProperties;

export namespace PriceButton {
  export interface Props {
    side: string;
    price: number;
    execute: () => void;
    movement?: string;
    isStale: boolean;
  }
}

const PriceButton: React.FC<PriceButton.Props> = ({
  side = '',
  price = 0,
  execute = () => {},
  movement = Movements.None,
  isStale = false
}) => {
  const priceAsString: string = price.toString();
  const bigFigures: string = priceAsString.substr(0, 4);
  const pips: string = priceAsString.substr(4, 2).padEnd(2, '00');
  const tenthOfPips: string = priceAsString.substr(6) || '0';

  const upStyle =
    movement === Movements.Up ? visible : (hidden as React.CSSProperties);

  const downStyle =
    movement === Movements.Down ? visible : (hidden as React.CSSProperties);

  return (
    <div className="col-md-5 px-0">
      <div className="card">
        <TradeExecution
          id="request-execution"
          onClick={() => execute()}
          disabled={isStale}
        >
          {isStale && (
            <TileStaleStyle>
              <h6 className="card-title text-white bg-secondary">Stale</h6>
            </TileStaleStyle>
          )}

          <div className="card-body d-flex justify-content-center">
            <Price>
              <BigFiguresContainer>
                <Direction>
                  {side.toUpperCase()}
                  <div className={style.directionUp} style={upStyle} />
                  <div className={style.directionDown} style={downStyle} />
                </Direction>
                <BigFigures>{bigFigures}</BigFigures>
              </BigFiguresContainer>
              <Pips>{pips}</Pips>
              <TenthOfPips>{tenthOfPips}</TenthOfPips>
            </Price>
          </div>
        </TradeExecution>
      </div>
    </div>
  );
};

export default PriceButton;
