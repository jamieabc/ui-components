import React from 'react';

import Config from '../../Config';
import NestedBlock from '../NestedBlock';

const selected = [
  { [Config.ID_KEY]: '1', name: '1',
    children: [{ [Config.ID_KEY]: '11', name: '11', selected: true },
               { [Config.ID_KEY]: '12', name: '12', selected: true }] },
  { [Config.ID_KEY]: '2', name: '2', selected: true, children: [] }];

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
      <NestedBlock dataSource={selected} onRemove={onRemove} />
    );

    wrapper.find(NestedBlock.Row).first().prop('onClick')();
    expect(onRemove).not.toBeCalled();
    wrapper.find(NestedBlock.Row).last().prop('onClick')();
    expect(onRemove).toBeCalledWith('2');
  })
});

describe('NestedBlock.Row', () => {
  describe('props.reserved', () => {
    it('when given it renders no button', () => {
      const wrapper = shallow(<NestedBlock.Row r={{ reserved: true }} reserved />);

      expect(wrapper.find('span').text().includes('Placement')).toBe(true);
    })
  })
});
