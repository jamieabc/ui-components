/* eslint eqeqeq: "off" */
import remove from 'lodash/array/remove';
import find from 'lodash/collection/find';
import isEmpty from 'lodash/lang/isEmpty';
import cloneDeep from 'lodash/lang/cloneDeep';
import uniqBy from 'lodash.uniqby';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class SelectedList extends Component {
  constructor() {
    super();

    this.handleRemove = (id, parentId) => {
      let selectedItems = cloneDeep(this.props.selectedItems);
      if (parentId) {
        const parentItem = find(selectedItems, i => { return i.id == parentId; });
        remove(parentItem.children, i => { return i.id == id; });
        if (isEmpty(parentItem.children)) {
          const isInherited = find(this.props.inheritedItems, i => { return i.id == parentId });
          if (isInherited) {
            remove(selectedItems, i => { return i.id == parentId; });
          }
        }
      } else {
        remove(selectedItems, i => { return i.id == id; });
      }
      this.props.onChange(selectedItems);
    };

    this.handleRemoveAll = () => {
      this.props.onChange([]);
    };
  }

  renderRemoveBtn(id, parentId) {
    return (
      <button
        type="button"
        className="close"
        aria-label="Delete"
        onClick={this.handleRemove.bind(this, id, parentId)}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    );
  }

  renderSubItems(item, inheritedItem) {
    return (
      <div className="callout-child">
        {item.children.map(subItem => {
          const isInherited = inheritedItem ? find(inheritedItem.children, i => { return i.id == subItem.id }) : false;
          return (
            <div className="callout text-hidden callout-success text-success" key={subItem.id}>
              {isInherited ? null : this.renderRemoveBtn(subItem.id, item.id)}
              {subItem.name}
            </div>
          );
        })}
      </div>
    );
  }

  renderItem(item, inheritedItem) {
    const hasChildren = !isEmpty(item.children);
    const inheritLabel = <span className={classNames('label pull-right', {'label-success': !hasChildren, 'label-default': hasChildren})}>{this.props.inheritText}</span>;

    return (
      <div className={classNames('callout text-hidden', {'callout-success text-success': !hasChildren, 'callout-default': hasChildren })} key={item.id}>
        {inheritedItem ? inheritLabel : this.renderRemoveBtn(item.id)}
        {item.name}
        {hasChildren && !(inheritedItem && isEmpty(inheritedItem.children)) && this.renderSubItems(item, inheritedItem)}
      </div>
    );
  }

  renderItems(allItems, inheritedItems) {
    return allItems.map(item => {
      const inheritedItem = find(inheritedItems, { 'id': item.id });
      return this.renderItem(item, inheritedItem);
    });
  }

  render() {
    let allSelectedItems = cloneDeep(this.props.selectedItems);
    if (this.props.inheritable) {
      const inheritedItems = cloneDeep(this.props.inheritedItems);
      allSelectedItems = uniqBy(inheritedItems.concat(allSelectedItems), 'id');
      this.props.selectedItems.forEach(item => {
        const selectedItem = find(allSelectedItems, i => { return i.id == item.id; });
        if (selectedItem.children) {
          selectedItem.children = uniqBy(selectedItem.children.concat(item.children || []), 'id');
        } else {
          selectedItem.children = item.children;
        }
      });
    }

    return (
      <div className="panel panel-default pick-panel col-xs-6">
        <div className="panel-heading">
          <button type="button" className="btn btn-default btn-sm pull-right" onClick={this.handleRemoveAll}>
            {this.props.removeAllLabel}
          </button>
          <strong>{this.props.title}</strong>
        </div>
        <div className="picked-items picked-items__height-breadcrumb">
          {this.renderItems(allSelectedItems, this.props.inheritedItems)}
        </div>
      </div>
    );
  }
}

SelectedList.propTypes = {
  title: PropTypes.string.isRequired,
  removeAllLabel: PropTypes.string.isRequired,
  selectedItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  inheritedItems: PropTypes.array,
  inheritable: PropTypes.bool,
  inheritText: PropTypes.string
};

SelectedList.defaultProps = {
  inheritedItems: [],
  inheritText: 'Placement Group-Level Setting'
};

export default SelectedList;