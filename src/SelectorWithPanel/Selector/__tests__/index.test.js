import React from 'react';
import DataTable, { Pagination } from 'ui-components/lib/DataTable';
import SearchBox from 'ui-components/lib/SearchBox';

import Config from '../../Config';
import Selector from '../../Selector';
import Breadcrumb from '../Breadcrumb';

it('renders props.ancestors as a breadcrumb', () => {
  const ancestors = [{ [Config.ID_KEY]: '1' }];
  const wrapper = shallow(
    <Selector ancestors={ancestors} />
  );

  expect(wrapper.find(Breadcrumb).prop('path')).toEqual(ancestors);
});

it('passes props.dataSource to DataTable', () => {
  const dataSource = [{ [Config.ID_KEY]: '1' }];

  const wrapper= shallow(<Selector dataSource={dataSource} isSelected={jest.fn()} />);
  expect(wrapper.find(DataTable).prop('dataSource')).toEqual(dataSource);
});

it('formulates the correct columns', () => {
  const dataSource = [{ [Config.ID_KEY]: '1', selected: true }];
  const onQuery = jest.fn();
  const onToggle = jest.fn();
  const wrapper= shallow(
    <Selector dataSource={dataSource} onQuery={onQuery} onToggle={onToggle} isSelected={(id) => id === '1'} />
  );

  const columns = wrapper.find(DataTable).prop('columns');
  expect(columns.length).toEqual(3);

  // checkbox
  expect(columns[0].title.props['checked']).toBe(true);
  columns[0].title.props['onClick']();
  expect(onToggle).toBeCalledWith(['1'], true);
  const checkboxRow = columns[0].render(null, { [Config.ID_KEY]: '2' });
  expect(checkboxRow.props['checked']).toBeFalsy();
  checkboxRow.props['onClick']();
  expect(onToggle).toBeCalledWith('2', false);

  // name
  const nameRow = columns[1].render(null, { [Config.ID_KEY]: '3', expandable: true });
  nameRow.props['onClick']();
  expect(onQuery).toBeCalledWith({ parent_id: '3' });
})

it('renders props.text properly', () => {
  const text = {
    leftTitle: 'leftTitle',
    leftEmpty: 'leftEmpty',
    placeholder: 'placeholder'
  };
  const wrapper= shallow(<Selector text={text} />);

  expect(wrapper.find('strong').first().text()).toEqual(text.leftTitle);
  expect(wrapper.find(SearchBox).prop('placeholder')).toEqual(text.placeholder);
  expect(wrapper.find(DataTable).prop('emptyText')).toEqual(text.leftEmpty);
});

it('passes props.query all around', () => {
  const query = {
    keyword: 'keyword',
    offset: 1,
    limit: 2,
    total: 3,
    order: 'name,asc'
  }

  const wrapper = shallow(<Selector query={query} />);

  expect(wrapper.find(SearchBox).prop('keyword')).toEqual(query.keyword);
  expect(wrapper.find(Pagination).prop('offset')).toEqual(query.offset);
  expect(wrapper.find(Pagination).prop('limit')).toEqual(query.limit);
  expect(wrapper.find(Pagination).prop('total')).toEqual(query.total);
});

describe('props.onQuery', () => {
  it('is passed to everywhere', () => {
    const onQuery = jest.fn();
    const wrapper = shallow(<Selector onQuery={onQuery} />)

    wrapper.find(Pagination).prop('onPageChange')();
    expect(onQuery).toBeCalled();

    wrapper.find(SearchBox).prop('handleQueryChange')();
    expect(onQuery).toHaveBeenCalledTimes(2);

    wrapper.find(DataTable).prop('onPageChange')();
    expect(onQuery).toHaveBeenCalledTimes(3);

    wrapper.find(Breadcrumb).prop('onClick')();
    expect(onQuery).toHaveBeenCalledTimes(4);
  });
});

describe('props.onToggle', () => {
  // it has been tested in the `DataTable.columns` test
})
