import React from 'react';
import { shallow } from 'enzyme';
import { Price } from '../Price';

describe('Price', () => {
  it('should extract price value', () => {
    // Given
    const price = shallow(
      <Price
        symbol="EURUSD"
        price={1.37283}
        side="buy"
        notional={10000000}
        execute={jest.fn()}
        executing={false}
      />
    );

    // When
    price.setProps({ price: 1.18302 });

    // Then
    expect(price.state().first).toEqual('1.18');
    expect(price.state().bigFigures).toEqual('30');
    expect(price.state().tenthOfPips).toEqual('2');
  });

  it('should default price decimal to match symbol precision', () => {
    // Given
    const price = shallow(
      <Price
        symbol="EURUSD"
        price={1.37283}
        side="buy"
        notional={10000000}
        execute={jest.fn()}
        executing={false}
      />
    );

    // When
    price.setProps({ price: 1.18 });

    // Then
    expect(price.state().first).toEqual('1.18');
    expect(price.state().bigFigures).toEqual('00');
    expect(price.state().tenthOfPips).toEqual('0');
  });

  it('should request execution', () => {
    // Given
    const execute = jest.fn();
    const price = shallow(
      <Price
        symbol="USDGBP"
        price={1.18302}
        side="buy"
        notional={10000000}
        execute={execute}
        executing={false}
      />
    );

    // When
    price.find('#request-execution').simulate('click');

    // Then
    expect(execute).toHaveBeenCalledWith({
      id: 1,
      symbol: 'USDGBP',
      broker: 'WEB',
      price: 1.18302,
      side: 'buy',
      quantity: 10000000
    });
  });

  it('should render buy price update', () => {
    // Given
    const price = shallow(
      <Price
        symbol="USDGBP"
        price={1.18302}
        side="buy"
        notional={10000000}
        execute={jest.fn()}
        executing={false}
      />
    );

    // price
    price.setProps({ price: 1.43841 });

    // Then
    expect(price).toMatchSnapshot();
  });

  it('should render sell price update', () => {
    // Given
    const price = shallow(
      <Price
        symbol="USDGBP"
        price={1.18302}
        side="sell"
        notional={10000000}
        execute={jest.fn()}
        executing={false}
      />
    );

    // When
    price.setProps({ price: 1.43841 });

    // Then
    expect(price).toMatchSnapshot();
  });
});
