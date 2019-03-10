import React from 'react';
import { Transition } from 'react-spring';
import { ScaleLoader } from 'react-spinners';
import styled from 'styled-components';

const ExecutionStyle = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: #3d4853;
`;

export namespace Execution {
  export interface Props {
    show: boolean;
  }
}

const Execution: React.FC<Execution.Props> = ({ show }) => (
  <Transition
    native
    reset
    unique
    items={0}
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
  >
    {index =>
      show &&
      (style => (
        <ExecutionStyle style={style}>
          <ScaleLoader
            width={6}
            height={35}
            radius={2}
            color={'#3bafda;'}
            loading={true}
          />
        </ExecutionStyle>
      ))
    }
  </Transition>
);

export default Execution;
