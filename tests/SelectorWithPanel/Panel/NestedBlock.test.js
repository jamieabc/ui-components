import React from 'react';

import NestedBlock from '../../../src/SelectorWithPanel/Panel/NestedBlock';

const selected = [
  { prop_id: '1', name: '1',
    children: [{ prop_id: '11', name: '11', selected: true },
               { prop_id: '12', name: '12', selected: true }] },
  { prop_id: '2', name: '2', selected: true, children: [] }];

describe('props.dataSource', () => {
  it('generates the nested', () => {
    const wrapper = shallow(<NestedBlock dataSource={selected} />);

    expect(wrapper.find(NestedBlock.Row).length).toEqual(4);
    const firstRow = wrapper.find(NestedBlock.Row).first();
    expect(firstRow.prop('r').selected).toBeFalsy();
    expect(firstRow.children().length).toEqual(2);

    const lastRow = wrapper.find(NestedBlock.Row).last();
    expect(lastRow.prop('r').selected).toBe(true);
    expect(lastRow.children().length).toEqual(0);
  })
});

describe('props.onRemove', () => {
  it('fires while trying to remove', () => {
    const onRemove = jest.fn();
    const wrapper = shallow(
      <NestedBlock dataSource={selected} onRemove={onRemove} />,
      { context: { idKey: 'prop_id' } }
    );

    wrapper.find(NestedBlock.Row).first().prop('onClick')();
    expect(onRemove).toBeCalled();
    wrapper.find(NestedBlock.Row).last().prop('onClick')();
    expect(onRemove).toBeCalledWith('2');
  })
});

describe('NestedBlock.Row', () => {
  describe('props.reserved', () => {
    it('when given it renders no button', () => {
      const wrapper = shallow(<NestedBlock.Row text={{ rightNested: 'Placement' }} r={{ reserved: true }} reserved />,
                              { context: { idKey: 'prop_id' } });

      expect(wrapper.find('span').text().includes('Placement')).toBe(true);
    })
  })
});
