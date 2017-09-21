import React from 'react';
import BlockList from '../BlockList';

jest.mock('../BlockList/AccordionStyle');
jest.mock('../BlockList/NestedStyle');
const Accordion = require('../BlockList/AccordionStyle');
const Nested = require('../BlockList/NestedStyle');

describe('BlockList', () => {
  describe('props.style', () => {
    it('calls nested by default', () => {
      const wrapper = shallow(<BlockList collection={['a']} />);
      expect(wrapper.find(Nested).exists()).toBe(true);
    })

    it('picks implementation based on props', () => {
      const wrapper = shallow(<BlockList style="accordion" collection={['a']} />);
      expect(wrapper.find(Accordion).exists()).toBe(true);
    })
  })
})
