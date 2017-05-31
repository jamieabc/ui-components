import React from 'react';
import isEqual from 'lodash/lang/isEqual';

import SelectorWithPanel from '../../src/SelectorWithPanel';
import Selector from '../../src/SelectorWithPanel/Selector';
import Panel from '../../src/SelectorWithPanel/Panel';
import Merger from '../../src/utils/Merger';

jest.mock('../../src/utils/Merger');

it('passes props to Selector', () => {
  const wrapper = shallow(<SelectorWithPanel />);
  const dataSource = [];
  const query = {};
  wrapper.setProps({ dataSource, query });
  const selector = wrapper.find(Selector).first();

  expect(selector.prop('dataSource')).toEqual(dataSource);
  expect(selector.prop('query')).toEqual(query);
})

it('passes props to Panel', () => {
  const wrapper = shallow(<SelectorWithPanel />);
  const selected = [];
  wrapper.setProps({ selected });
  const panel = wrapper.find(Panel).first();

  expect(panel.prop('selected')).toEqual(selected);
})

describe('#handleQuery', () => {
  it('handles pagiation/keyword changes with props.onQuery', () => {
    const oldQuery = { offset: 0 };
    const onQuery = jest.fn();
    const wrapper = shallow(<SelectorWithPanel onQuery={onQuery} query={oldQuery} />);
    const params = { limit: 10 };
    wrapper.instance().handleQuery(params);

    expect(onQuery).toBeCalledWith({ offset: 0, limit: 10 });
  })

  it('handles parent_id(null or non-null) with props.onOverrideAncestors', () => {
    const onOverrideAncestors = jest.fn();
    const dataSource = [{ prop_id: 1 }, { prop_id: 2 }];
    const onQuery = jest.fn();
    const wrapper = shallow(
      <SelectorWithPanel
        onOverrideAncestors={onOverrideAncestors}
        dataSource={dataSource}
        onQuery={onQuery}
        ancestors={[{ prop_id: -2 }, { prop_id: -1 }, { prop_id: 0 }]}
      />
    );
    const params = { parent_id: 1 };
    wrapper.instance().handleQuery(params);

    expect(onOverrideAncestors).toBeCalledWith([{ prop_id: -2 }, { prop_id: -1 }, { prop_id: 0 }, { prop_id: 1 }]);
    expect(onQuery).toBeCalled();

    const emptyParams = { parent_id: null };
    wrapper.instance().handleQuery(emptyParams);
    expect(onOverrideAncestors).toBeCalledWith([]);

    const ancestorParams = { parent_id: -1 };
    wrapper.instance().handleQuery(ancestorParams);
    expect(onOverrideAncestors).toBeCalledWith([{ prop_id: -2 }, { prop_id: -1 }]);
  })
})

describe('#withAncestors', () => {
  it('will chain up ancestors and given param', () => {
    const ancestors = [{ prop_id: '1' }, { prop_id: '11' }, { prop_id: '111' }];
    const wrapper = shallow(
      <SelectorWithPanel ancestors={ancestors} />
    );

    const actual = wrapper.instance().withAncestors({ prop_id: '1111' });
    expect(actual).toEqual({ prop_id: '1', children: [{ prop_id: '11', children: [{ prop_id: '111', children: [{ prop_id: '1111' }] }] }] });
  })
});

describe('#handleSelect', () => {
  it('calls Merger', () => {
    const ancestors = [{ prop_id: '1' }, { prop_id: '11' }];
    const selected = [{ prop_id: '1', children: [{ prop_id: '12' }] }];
    const params = '111';
    const dataSource = [{ prop_id: '111' }];
    const onOverrideSelected = jest.fn();

    const wrapper = shallow(
      <SelectorWithPanel ancestors={ancestors} selected={selected} onOverrideSelected={onOverrideSelected} dataSource={dataSource} />
    );
    wrapper.instance().handleSelect(params);

    const expected = { prop_id: '1', children: [{ prop_id: '11', children: [{ prop_id: '111', selected: true }] }] };
    const actual = isEqual(Merger.run.mock.calls[0][1], expected);
    expect(actual).toBe(true);
    expect(onOverrideSelected).toBeCalled();
  })
})

describe('#handleUnselect', () => {
  it('calls Rejecter', () => {
    const onOverrideSelected = jest.fn();
    const selected = [{ prop_id: '1', children: [{ prop_id: '12' }] },
                      { prop_id: '2', children: [], selected: true }];
    const params = '12';
    const wrapper = shallow(
      <SelectorWithPanel
        selected={selected}
        onOverrideSelected={onOverrideSelected}
      />
    );

    wrapper.instance().handleUnselect(params);
    const actual = isEqual(onOverrideSelected.mock.calls[0][0],
                           [{ prop_id: '2', children: [], selected: true }]);

    expect(actual).toBe(true);
  })
})

describe('#handleUpload', () => {
  it('fires the props.onUpload', () => {
    const onUpload = jest.fn();
    const wrapper = shallow(<SelectorWithPanel onUpload={onUpload} />);
    const dummyFile = { currentTarget: { files: [{}] } };
    wrapper.instance().handleUpload(dummyFile);

    expect(onUpload).toBeCalledWith({});
  })
});

describe('#handleToggle', () => {
  it('makes a choice between handleSelect & handleUnselect', () => {
    const ancestors = [{ prop_id: '1' }, { prop_id: '11' }];
    const selected = [{ prop_id: '1', children: [{ prop_id: '12' }] }];
    const params = '111';
    const dataSource = [{ prop_id: '111' }];
    const onOverrideSelected = jest.fn();

    const wrapper = shallow(
      <SelectorWithPanel ancestors={ancestors} selected={selected} onOverrideSelected={onOverrideSelected} dataSource={dataSource} />
    );
    wrapper.instance().handleToggle(params, false);

    const expected = { prop_id: '1', children: [{ prop_id: '11', children: [{ prop_id: '111', selected: true }] }] };
    const actual = isEqual(Merger.run.mock.calls[0][1], expected);
    expect(actual).toBe(true);
    expect(onOverrideSelected).toBeCalled();

    wrapper.instance().handleToggle('12', true);

    const expected2 = [];
    const actual2 = isEqual(onOverrideSelected.mock.calls[1][0], expected2);
    expect(actual2).toBe(true);
    expect(onOverrideSelected).toBeCalled();
  })
})
