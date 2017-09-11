import React from 'react';
import Row from '../Row';

jest.mock('../CloseButton');
const CloseButton = require('../CloseButton');

describe('Row', () => {
  describe('props.r', () => {
    it('calculates class names', () => {
      const r = { selected: 'included' };
      const wrapper = shallow(<Row r={r} />);
      expect(wrapper.hasClass('callout-success')).toBe(true);
      expect(wrapper.hasClass('text-success')).toBe(true);

      wrapper.setProps({ r: { selected: 'excluded' } });
      expect(wrapper.hasClass('callout-success')).toBe(false);
      expect(wrapper.hasClass('text-success')).toBe(false);
    })
  })

  describe('props.onClick', () => {
    it('forwards to CloseButton', () => {
      const dumb = jest.fn();
      const wrapper = shallow(<Row r={{}} onClick={dumb} />);
      wrapper.find(CloseButton).prop('onClick').call(this);

      expect(dumb.mock.calls.length).toBe(1);
    })
  })

  describe('props.reserved', () => {
    it('forwards to CloseButton', () => {
      const wrapper = shallow(<Row r={{}} reserved={true} />);

      expect(wrapper.find(CloseButton).prop('reserved')).toBe(true);
    })
  })

  describe('props.noTip', () => {
    it('forwards to CloseButton', () => {
      const wrapper = shallow(<Row r={{}} noTip={true} />);

      expect(wrapper.find(CloseButton).prop('noTip')).toBe(true);
    })
  })

  describe('props.text', () => {
    it('forwards to CloseButton', () => {
      const wrapper = shallow(<Row r={{}} text={{}} />);

      expect(wrapper.find(CloseButton).prop('text')).toEqual({});
    })
  })
})
