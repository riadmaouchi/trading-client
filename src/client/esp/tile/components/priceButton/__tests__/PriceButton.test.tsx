import React from 'react';
import { shallow } from 'enzyme';
import PriceButton from '../PriceButton';
import { Movements } from '../../../model/priceTick';

describe('PriceButton', () => {
  it('should request execution', () => {
    // Given
    const execute = jest.fn();
    const price = shallow(
      <PriceButton
        price={1.18302}
        side="buy"
        execute={execute}
        isStale={false}
      />
    );

    // When
    price.find('#request-execution').simulate('click');

    // Then
    expect(execute).toBeCalled();
  });

  it('should not request execution on stale price', () => {
    // Given
    const execute = jest.fn();
    const price = shallow(
      <PriceButton
        price={1.18302}
        side="buy"
        execute={execute}
        isStale={true}
      />
    );

    // When
    price.find('#request-execution').simulate('click');

    // Then
    expect(execute).toHaveBeenCalled();
  });

  it('should render buy price update', () => {
    // Given
    const price = shallow(
      <PriceButton
        price={1.18302}
        side="buy"
        execute={jest.fn()}
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
        price={1.18302}
        side="sell"
        execute={jest.fn()}
        isStale={false}
      />
    );

    // When
    price.setProps({ price: 1.43841 });

    // Then
    expect(price).toMatchSnapshot();
  });

  it('should stale price', () => {
    // When
    const price = shallow(
      <PriceButton
        price={1.18302}
        side="sell"
        execute={jest.fn()}
        isStale={true}
      />
    );

    // Then
    expect(price).toMatchSnapshot();
  });

  it('should render up price mouvement', () => {
    // When
    const price = shallow(
      <PriceButton
        price={1.18302}
        side="sell"
        execute={jest.fn()}
        isStale={false}
        movement={Movements.Up}
      />
    );

    // Then
    expect(price).toMatchSnapshot();
  });

  it('should render down price mouvement', () => {
    // When
    const price = shallow(
      <PriceButton
        price={1.18302}
        side="sell"
        execute={jest.fn()}
        isStale={false}
        movement={Movements.Down}
      />
    );

    // Then
    expect(price).toMatchSnapshot();
  });

  it('should render  price without mouvement', () => {
    // When
    const price = shallow(
      <PriceButton
        price={1.18302}
        side="sell"
        execute={jest.fn()}
        isStale={false}
        movement={Movements.None}
      />
    );

    // Then
    expect(price).toMatchSnapshot();
  });
});
