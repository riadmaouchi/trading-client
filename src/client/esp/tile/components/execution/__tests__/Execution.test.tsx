import React from 'react';
import { shallow } from 'enzyme';
import Execution from '../Execution';

describe('Execution', () => {
  it('should display execution status', () => {
    // When
    const execution = shallow(<Execution show={true} />);

    // Then
    expect(execution).toMatchSnapshot();
  });

  it('should not display execution status', () => {
    // When
    const execution = shallow(<Execution show={false} />);

    // Then
    expect(execution).toMatchSnapshot();
  });
});
