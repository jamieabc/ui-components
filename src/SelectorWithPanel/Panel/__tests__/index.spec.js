import React from 'react';

import Panel from '../../Panel';
import NestedBlock from '../../Panel/BlockList';

describe('SelectorWithPanel/Panel', () => {
  describe('props.text', () => {
    it('is being used correctly', () => {
      const text = {
        rightTitle: 'rightTitle',
        rightEmpty: 'rightEmpty'
      };
      const wrapper = shallow(<Panel text={text} />);

      expect(wrapper.find('strong').first().text()).toEqual('rightTitle');
      expect(wrapper.find('.picked-items').first().text()).toEqual('rightEmpty');

      wrapper.setProps({ selected: [{ prop_id: '1', selected: true }] })
      expect(wrapper.find('.picked-items').first().text()).not.toEqual('rightEmpty');
    });
  });

  describe('props.selected', () => {
    it('generates nested blocks', () => {
      const selected = [{ prop_id: '1' }];
      const wrapper = shallow(<Panel selected={selected} />);
      expect(wrapper.find(NestedBlock).prop('collection')).toEqual(selected);
    })
  });

  describe('props.onUnselect', () => {
    it('passes to NestedBlock', () => {
      const onUnselect = jest.fn();
      const selected = [{ prop_id: '1', name: '1', children: [] }];
      const wrapper = shallow(
        <Panel selected={selected} onUnselect={onUnselect} />
      );
      wrapper.find(NestedBlock).prop('onRemove')();

      expect(onUnselect).toBeCalled();
    })
  });

  describe('context.noBreadcrumb', () => {
    it('sets different class names to empty text', () => {
      const context = { noBreadcrumb: true };
      const wrapper = shallow(<Panel selected={[]} />, { context })
      expect(wrapper.find('.picked-items').hasClass('picked-items__height-default'));

      wrapper.setContext({ noBreadcrumb: false });
      expect(wrapper.find('.picked-items').hasClass('picked-items__height-breadcrumb'));
    })
  })
})
