import React from 'react';
import { shallow } from 'enzyme';
import { Spread } from '../Spread';

describe('Spread', () => {
  it('should update spread value', () => {
    // Given
    const spread = shallow(<Spread bid={0} ask={0} />);

    // When
    spread.setProps({ bid: 1.43841, ask: 1.43848 });

    // Then
    expect(spread.state().spread).toEqual('0.07');
  });

  it('should display spread up direction', () => {
    // Given
    const spread = shallow(<Spread bid={1.43841} ask={1.43847} />);

    // When
    spread.setProps({ bid: 1.43841, ask: 1.43848 });

    // Then
    expect(spread.state().direction).toEqual('up');
    expect(spread).toMatchSnapshot();
  });

  it('should display spread down direction', () => {
    // Given
    const spread = shallow(<Spread bid={1.43841} ask={1.43847} />);

    // When
    spread.setProps({ bid: 1.43841, ask: 1.43846 });

    // Then
    expect(spread.state().direction).toEqual('down');
    expect(spread).toMatchSnapshot();
  });
});
