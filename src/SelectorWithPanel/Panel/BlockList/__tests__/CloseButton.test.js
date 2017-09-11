import React from 'react';
import CloseButton from '../CloseButton';

describe('CloseButton', () => {
  describe('props.noTip', () => {
    it('renders nothing when true', () => {
      const wrapper = shallow(<CloseButton noTip />);
      expect(wrapper.type()).toBe(null);
    })
  })

  describe('props.reserved', () => {
    it('renders props.text.rightNested when true', () => {
      const wrapper = shallow(<CloseButton text={{ rightNested: '?' }} reserved />);
      expect(wrapper.text()).toEqual('?')
    })
  })

  describe('props.selected', () => {
    it('sets different class name', () => {
      const wrapper = shallow(<CloseButton text={{ rightNested: '?' }} reserved />);
      expect(wrapper.find('span').hasClass('label-default')).toBe(true);

      wrapper.setProps({ selected: true });
      expect(wrapper.find('span').hasClass('label-default')).toBe(false);
    })
  })
})
