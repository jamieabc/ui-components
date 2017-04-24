import React from 'react';

import Config from '../../Config';
import Panel from '../../Panel';
import NestedBlock from '../NestedBlock';

describe('props.text', () => {
  it('is being used correctly', () => {
    const text = {
      rightTitle: 'rightTitle',
      rightEmpty: 'rightEmpty'
    };
    const wrapper = shallow(<Panel text={text} />);

    expect(wrapper.find('strong').first().text()).toEqual('rightTitle');
    expect(wrapper.find('.picked-items').first().text()).toEqual('rightEmpty');

    wrapper.setProps({ selected: [{ [Config.ID_KEY]: '1', selected: true }] })
    expect(wrapper.find('.picked-items').first().text()).not.toEqual('rightEmpty');
  });
});

describe('props.selected', () => {
  it('generates nested blocks', () => {
    const selected = [{ [Config.ID_KEY]: '1' }];
    const wrapper = shallow(<Panel selected={selected} />);
    expect(wrapper.find(NestedBlock).prop('dataSource')).toEqual(selected);
  })
});

describe('props.onUnselect', () => {
  it('passes to NestedBlock', () => {
    const onUnselect = jest.fn();
    const selected = [{ [Config.ID_KEY]: '1', name: '1', children: [] }];
    const wrapper = shallow(
      <Panel selected={selected} onUnselect={onUnselect} />
    );
    wrapper.find(NestedBlock).prop('onRemove')();

    expect(onUnselect).toBeCalled();
  })

  it('fires when RemoveAll got clicked', () => {
    // TODO: RemoveAll
    /* const onUnselect = jest.fn();
     * const selected = [{ [Config.ID_KEY]: '1' }, { [Config.ID_KEY]: '2' }, { [Config.ID_KEY]: '3' }];
     * const wrapper = shallow(
     *   <Panel selected={selected} onUnselect={onUnselect} />
     * );

     * wrapper.find('button').first().onClick();*/
  })
});
