/* eslint eqeqeq: "off" */
import find from 'lodash/find';
import flatten from 'lodash/flatten';
import findIndex from 'lodash/findIndex';
import intersection from 'lodash/intersection';
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import result from 'lodash/result';
import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import DataTable, { Pagination } from '../DataTable';
import SearchBox from '../SearchBox';
import Helpers from '../utils/Helpers';

class AllList extends Component {
  constructor(props) {
    super(props);

    this.getOut = e => {
      e.preventDefault();
      this.handleQueryChange({parent_id: null, offset: 0, keyword: null});
    };

    this.handleSelect = item => {
      // if it's inherited, do nothing.
      if (find(this.props.inheritedItems, c => { return c.id == item.id; })) {
        return false;
      }
      let selectedItems = cloneDeep(this.props.selectedItems);
      if (item.parent_id) {
        const parentItem = find(selectedItems, i => { return i.id == item.parent_id; });
        if (parentItem) {
          const subIndex = findIndex(parentItem.children, i => { return i.id == item.id; });
          if (subIndex !== -1) {
            parentItem.children.splice(subIndex, 1);
          } else {
            parentItem.children.push({id: item.id, name: item.name});
          }
        } else {
          selectedItems.push({
            id: item.parent_id,
            name: item.parent_name,
            children: [{id: item.id, name: item.name}]
          });
        }
      } else {
        const parentIndex = findIndex(selectedItems, i => { return i.id == item.id; });
        if (parentIndex !== -1) {
          selectedItems.splice(parentIndex, 1);
        } else {
          let _item = cloneDeep(item);
          _item.children = [];
          selectedItems.push(_item);
        }
      }
      this.props.onChange(selectedItems);
    };

    this.handleCheckAll = (e) => {
      e.preventDefault();
      const parentId = this.props.dataTableProps.query.parent_id;
      let inheritedIds = [];
      let listingItems = cloneDeep(this.props.listingItems);
      let selectedItems = cloneDeep(this.props.selectedItems);
      const inheritedItems = cloneDeep(this.props.inheritedItems);
      if (this.props.inheritable) {
        if (parentId) {
          const inheritedItem = find(inheritedItems, i => { return i.id == parentId; });
          if (inheritedItem) {
            inheritedIds = inheritedItem.children.map((item) => {
              return item.id.toString();
            });
          }
        } else {
          inheritedIds = inheritedItems.map((item) => {
            return item.id.toString();
          });
        }
      }
      const listIds = listingItems.map((item) => {
        return item.id.toString();
      });
      const selectedIds = selectedItems.map((item) => {
        return item.id.toString();
      });
      if (this.props.inheritable) {
        listingItems = listingItems.filter((item) => {
          return !inheritedIds.includes(item.id.toString());
        });
      }
      if (parentId) {
        if (this.isCheckedAll()) {
          selectedItems.forEach((item) => {
            if (item.id == parentId) {
              const newChildren = item.children.filter((i) => {
                return !listIds.includes(i.id.toString());
              });
              item.children = newChildren;
            }
          });
        } else {
          if (selectedIds.includes(parentId)) {
            selectedItems.forEach((item) => {
              if (item.id == parentId) {
                item.children = uniqBy(item.children.concat(listingItems), 'id');
              }
            });
          } else {
            let currentItem = find(this.props.allItems, c => {
              return c.id == parentId;
            });
            currentItem.children = listingItems;
            selectedItems = uniqBy(selectedItems.concat([currentItem]), 'id');
          }
        }
      } else {
        if (this.isCheckedAll()) {
          selectedItems = selectedItems.filter((item) => {
            return !listIds.includes(item.id.toString());
          });
        } else {
          listingItems.forEach((item) => {
            item.children = [];
          });
          selectedItems = uniqBy(selectedItems.concat(listingItems), 'id');
        }
      }
      this.props.onChange(selectedItems);
    };

    this.handleQueryChange = (newQuery) => {
      let query;
      if (newQuery && (newQuery.hasOwnProperty('offset') || newQuery.hasOwnProperty('order'))) {
        query = Object.assign({}, this.props.dataTableProps.query, newQuery);
      } else {
        query = Object.assign({}, this.props.dataTableProps.query, newQuery, {offset: 0});
      }
      this.props.dataTableProps.onQueryChange(query);
    };

    this.isCheckedAll = () => {
      if (isEmpty(this.props.listingItems)) {
        return false;
      }
      let selectedIds = [];
      const parentId = this.props.dataTableProps.query.parent_id;
      if (parentId) {
        const childItems = result(find(this.props.allSelectedItems, c => {
          return c.id == parentId;
        }), 'children') || [];
        selectedIds = childItems.map((item) => {
          return parseInt(item.id, 10);
        });
      } else {
        selectedIds = this.props.allSelectedItems.map((item) => {
          return parseInt(item.id, 10);
        });
      }
      const listIds = this.props.listingItems.map((item) => {
        return parseInt(item.id, 10);
      });
      return isEqual(intersection(listIds, selectedIds).sort(), listIds.sort());
    };

    this.isChecked = (ls, id) => {
      const ids = ls.map((item) => {
        if (!item.children || item.children.length === 0) { return item.id; }

        return item.children.map((i) => i.id);
      });
      return flatten(ids).includes(id);
    };

    this.getSelectorColumn = () => {
      return [{
        name: 'flag',
        title: <i className={classNames('fa fa-check-circle fa-lg', {'text-success': this.isCheckedAll()})} onClick={this.handleCheckAll} />,
        width: 30,
        sortable: false,
        resizable: false,
        reorderable: false,
        style: { textAlign: 'center' },
        render: (value, data) => {
          const checked = this.isChecked(this.props.allSelectedItems, data.id);
          return <i onClick={this.handleSelect.bind(this, data)} className={classNames('fa', 'fa-check-circle', 'fa-lg', {'text-success': checked})}/>;
        }
      }];
    };
  }

  renderBreadcrumb() {
    const parentId = this.props.dataTableProps.query.parent_id;

    if (!parentId) {
      return (
        <ol className="breadcrumb">
          <li className="active bc__home" title="home">
            <i className="fa fa-home"></i>
          </li>
        </ol>
      );
    }

    const parentName = get(find(this.props.allItems, i =>{ return i.id == parentId }), 'name')
    return (
      <ol className="breadcrumb">
        <li className="active bc__home" title="home">
          <a onClick={this.getOut}><i className="fa fa-home"></i></a>
        </li>
        <li className="active" title={parentName}>{parentName}</li>
      </ol>
    );

  }

  render() {
    const { columns, total, query, emptyText } = this.props.dataTableProps;
    const allColumns = this.props.selectable ? this.getSelectorColumn().concat(columns) : columns;

    return (
      <div className="panel panel-default pick-panel col-xs-6">
        <div className="panel-heading"><strong>{this.props.title}</strong></div>
        <div className="panel-body">
          <SearchBox
            handleQueryChange={this.handleQueryChange}
            placeholder={this.props.searchBoxPlaceholder}
            keyword={query.keyword}
          />
        </div>
        {this.props.showBreadCrumb ? this.renderBreadcrumb() : null}
        <div className="items-to-pick">
          <DataTable
            dataSource={this.props.listingItems}
            columns={allColumns}
            sortInfo={Helpers.arrayifySort(query.order)}
            pager={false}
            onPageChange={this.handleQueryChange}
            selectable={false}
            resizableColumns={false}
            style={{height: 30 * 10 + 30}}
            wrapperClassName="table-bordered"
            emptyText={emptyText}
            scrollbarSize={0}
            focusable={false}
          />
        </div>
        <div className="panel-footer text-right">
          <Pagination
            offset={query.offset}
            limit={query.limit}
            total={total}
            onPageChange={this.handleQueryChange}
            pageSizes={false}
            paginationPrepositionText={this.props.paginationPrepositionText}
          />
        </div>
      </div>
    );
  }
}

AllList.propTypes = {
  showBreadCrumb: PropTypes.bool,
  title: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  searchBoxPlaceholder: PropTypes.string.isRequired,
  listingItems: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  allItems: PropTypes.array.isRequired,
  inheritedItems: PropTypes.array,
  allSelectedItems: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  dataTableProps: PropTypes.shape({
    onQueryChange: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    total: PropTypes.total,
    query: PropTypes.object.isRequired,
    emptyText: PropTypes.string
  }),
  paginationPrepositionText: PropTypes.string
};

export default AllList;
