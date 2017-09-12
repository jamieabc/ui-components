import React from 'react';
import Nested from '../NestedStyle';

jest.mock('../Row');
const Row = require('../Row');

describe('NestedStyle', () => {
  describe('props.dataSource', () => {
    it('also renders children', () => {
      const dataSource = [{
        name: 'a',
        children: [
          { name: 'b' }
        ]
      }];

      const wrapper = shallow(<Nested dataSource={dataSource} />);

      expect(wrapper.find(Row).length).toBe(2);
    })
  })
})
