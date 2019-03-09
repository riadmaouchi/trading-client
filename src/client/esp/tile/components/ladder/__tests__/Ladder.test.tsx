import React from 'react';
import { shallow } from 'enzyme';
import Ladder from '../Ladder';

describe('Ladder', () => {
  it('should render liquidity ladder', () => {
    // When
    const price = shallow(
      <Ladder
        asks={[
          { quantity: 1000000, price: 1.23127 },
          { quantity: 5000000, price: 1.26578 }
        ]}
        bids={[
          { quantity: 1000000, price: 1.23118 },
          { quantity: 5000000, price: 1.26571 }
        ]}
      />
    );

    // Then
    expect(price).toMatchSnapshot();
  });
});
