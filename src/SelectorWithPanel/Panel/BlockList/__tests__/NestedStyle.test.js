import React from 'react';
import Nested from '../NestedStyle';

jest.mock('../Row');
const Row = require('../Row');

const selected = [
  { prop_id: '1', name: '1',
    children: [{ prop_id: '11', name: '11', selected: true },
               { prop_id: '12', name: '12', selected: true }] },
  { prop_id: '2', name: '2', selected: true, children: [] }];

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

    it('generates the nested', () => {
      const wrapper = shallow(<Nested dataSource={selected} />);

      expect(wrapper.find(Nested.Row).length).toEqual(4);
      const firstRow = wrapper.find(Nested.Row).first();
      expect(firstRow.prop('r').selected).toBeFalsy();
      expect(firstRow.children().length).toEqual(2);

      const lastRow = wrapper.find(Nested.Row).last();
      expect(lastRow.prop('r').selected).toBe(true);
      expect(lastRow.children().length).toEqual(0);
    })
  })


  describe('props.onRemove', () => {
    it('fires while trying to remove', () => {
      const onRemove = jest.fn();
      const wrapper = shallow(
        <Nested dataSource={selected} onRemove={onRemove} />,
        { context: { idKey: 'prop_id' } }
      );

      wrapper.find(Nested.Row).first().prop('onClick')();
      expect(onRemove).toBeCalled();
      wrapper.find(Nested.Row).last().prop('onClick')();
      expect(onRemove).toBeCalledWith('2');
    })
  });

  describe('props.className', () => {
    it('assigns the className to top wrapper', () => {
      const wrapper = shallow(<Nested className="foo" dataSource={[{ id: '1' }]} text={{}} />);
      expect(wrapper.find('div').first().hasClass('foo')).toBe(true);
    })
  })
})
