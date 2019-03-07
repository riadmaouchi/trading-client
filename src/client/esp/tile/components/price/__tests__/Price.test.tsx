import React from 'react';
import { shallow } from 'enzyme';
import { Price } from '../Price';

describe('PriceButton', () => {
  it('should extract price value', () => {
    // Given
    const price = shallow(<Price price={1.37283} />);

    // When
    price.setProps({ price: 1.18302 });

    // Then
    expect(price.state().first).toEqual('1.18');
    expect(price.state().bigFigures).toEqual('30');
    expect(price.state().tenthOfPips).toEqual('2');
  });

  it('should default price decimal to match symbol precision', () => {
    // Given
    const price = shallow(<Price price={1.37283} />);

    // When
    price.setProps({ price: 1.18 });

    // Then
    expect(price.state().first).toEqual('1.18');
    expect(price.state().bigFigures).toEqual('00');
    expect(price.state().tenthOfPips).toEqual('0');
  });

  it('should render buy price update', () => {
    // Given
    const price = shallow(<Price price={1.18302} />);

    // price
    price.setProps({ price: 1.43841 });

    // Then
    expect(price).toMatchSnapshot();
  });

  it('should render sell price update', () => {
    // Given
    const price = shallow(<Price price={1.18302} />);

    // When
    price.setProps({ price: 1.43841 });

    // Then
    expect(price).toMatchSnapshot();
  });
});
