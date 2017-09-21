import React from 'react';
import Accordion from '../AccordionStyle';

describe('Accordion', () => {
  describe('props.className', () => {
    it('assigns the className to top wrapper', () => {
      const wrapper = shallow(<Accordion className="foo" dataSource={[]} text={{}} />);
      expect(wrapper.find('div').first().hasClass('foo')).toBe(true);
    })
  })
})
