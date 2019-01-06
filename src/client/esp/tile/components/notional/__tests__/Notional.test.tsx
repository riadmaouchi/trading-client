import React from 'react';
import { shallow } from 'enzyme';
import { Notional } from '../Notional';

describe('Notional', () => {
  it('should update notional on blur', () => {
    // Given
    const saveCallback = jest.fn();
    const component = shallow(
      <Notional notional={10000} symbol={'EURUSD'} onSave={saveCallback} />
    );
    const event = {
      preventDefault() {},
      target: { value: '100' }
    };

    // When
    component.find('input').simulate('blur', event);

    // Then
    expect(saveCallback).toBeCalledWith('100');
  });

  it('should update notional on key down', () => {
    // Given
    const saveCallback = jest.fn();
    const component = shallow(
      <Notional notional={10000} symbol={'EURUSD'} onSave={saveCallback} />
    );
    const event = {
      preventDefault() {},
      target: { value: '100' },
      which: 13
    };

    // When
    component.find('input').simulate('keydown', event);

    // Then
    expect(saveCallback).toBeCalledWith('100');
  });

  it('should not update notional on escape', () => {
    // Given
    const saveCallback = jest.fn();
    const component = shallow(
      <Notional notional={10000} symbol={'EURUSD'} onSave={saveCallback} />
    );
    const event = {
      preventDefault() {},
      target: { value: '100' },
      which: 27
    };

    // When
    component.find('input').simulate('keydown', event);

    // Then
    expect(saveCallback).not.toBeCalled();
  });
});
