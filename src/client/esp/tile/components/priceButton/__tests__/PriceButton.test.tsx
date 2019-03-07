import React from 'react';
import { shallow } from 'enzyme';
import { PriceButton } from '../PriceButton';

describe('PriceButton', () => {
  it('should request execution', () => {
    // Given
    const execute = jest.fn();
    const price = shallow(
      <PriceButton
        symbol="USDGBP"
        price={1.18302}
        side="buy"
        notional={10000000}
        execute={execute}
        executing={false}
        url={''}
        isStale={false}
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
      quantity: 10000000,
      url: ''
    });
  });

  it('should render buy price update', () => {
    // Given
    const price = shallow(
      <PriceButton
        symbol="USDGBP"
        price={1.18302}
        side="buy"
        notional={10000000}
        execute={jest.fn()}
        executing={false}
        url={''}
        isStale={false}
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
      <PriceButton
        symbol="USDGBP"
        price={1.18302}
        side="sell"
        notional={10000000}
        execute={jest.fn()}
        executing={false}
        url={''}
        isStale={false}
      />
    );

    // When
    price.setProps({ price: 1.43841 });

    // Then
    expect(price).toMatchSnapshot();
  });

  it('should stale price', () => {
    // Given
    const price = shallow(
      <PriceButton
        symbol="USDGBP"
        price={1.18302}
        side="sell"
        notional={10000000}
        execute={jest.fn()}
        executing={false}
        url={''}
        isStale={true}
      />
    );

    // When
    price.setProps({ price: 1.43841 });

    // Then
    expect(price).toMatchSnapshot();
  });
});
