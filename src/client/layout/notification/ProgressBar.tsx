import React from 'react';
import { Transition } from 'react-spring';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  show: boolean;
}

const TileBookingStyle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

const ProgressBar: React.SFC<Props> = ({ show }) => (
  <Transition
    items={0}
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
  >
    {styles => {
      if (show) {
        return (style: React.CSSProperties) => (
          <TileBookingStyle>
            <FontAwesomeIcon icon="spinner" color="#3bafda" size="4x" pulse />
          </TileBookingStyle>
        );
      }
      return null;
    }}
  </Transition>
);

export default ProgressBar;
