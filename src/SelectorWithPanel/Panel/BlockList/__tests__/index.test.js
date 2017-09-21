import React from 'react';
import BlockList from '../../BlockList';

jest.mock('../../BlockList/NestedStyle');
const Component = require('../../BlockList/NestedStyle');

describe('BlockList', () => {
  describe('props.onBreadcrumb', () => {
    it('formulates className by that when true', () => {
      const wrapper = shallow(<BlockList />, { context: { noBreadcrumb: true } });
      expect(wrapper.find(Component).prop('className')).toEqual("picked-items picked-items__height-default")
    })

    it('formulates className by that when false', () => {
      const wrapper = shallow(<BlockList />);
      expect(wrapper.find(Component).prop('className')).toEqual("picked-items picked-items__height-breadcrumb")
    })
  })
})
