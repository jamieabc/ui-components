/* eslint-disable eqeqeq */
import React, { PropTypes } from 'react';
import AllList from './AllList';
import SelectedList from './SelectedList';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import uniqBy from 'lodash/uniqBy';
import { t } from '../utils/Helpers';

const MultiSelector = (props) => {
  let allSelectedItems = cloneDeep(props.selectedItems);
  if (props.inheritable) {
    props.selectedItems.forEach(item => {
      const selectedItem = find(allSelectedItems, i => { return i.id == item.id; });
      if (selectedItem.children) {
        selectedItem.children = uniqBy(selectedItem.children.concat(item.children || []), 'id');
      } else {
        selectedItem.children = item.children;
      }
    });
  }
  return (
    <div className="row-gapless" {...t(props.tagName)} >
      <AllList
        showBreadCrumb={props.showBreadCrumb}
        title={props.allListTitle}
        selectable={props.selectable}
        searchBoxPlaceholder={props.searchBoxPlaceholder}
        inheritable={props.inheritable}
        listingItems={props.listingItems}
        selectedItems={props.selectedItems}
        allItems={props.allItems}
        inheritedItems={props.inheritedItems}
        dataTableProps={props.dataTableProps}
        onChange={props.onChange}
        allSelectedItems={allSelectedItems}
        paginationPrepositionText={props.paginationPrepositionText}
      />
      <SelectedList
        title={props.selectedListTitle}
        removeAllLabel={props.removeAllLabel}
        removeAllWarningTitle={props.removeAllWarningTitle}
        removeAllWarningMessage={props.removeAllWarningMessage}
        removeAllWaringSubmitText={props.removeAllWaringSubmitText}
        removeAllWaringCancelText={props.removeAllWaringCancelText}
        inheritable={props.inheritable}
        selectedItems={props.selectedItems}
        inheritedItems={props.inheritedItems}
        onChange={props.onChange}
        inheritText={props.inheritText}
        showBreadCrumb={props.showBreadCrumb}
        allSelectedItems={allSelectedItems}
      />
    </div>
  );
}

MultiSelector.propTypes = {
  tagName: PropTypes.string,
  // All list props
  showBreadCrumb: PropTypes.bool,
  allListTitle: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  searchBoxPlaceholder: PropTypes.string.isRequired,
  listingItems: PropTypes.array.isRequired,
  allItems: PropTypes.array.isRequired,
  dataTableProps: PropTypes.shape({
    onQueryChange: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    total: PropTypes.total,
    query: PropTypes.object.isRequired,
    emptyText: PropTypes.string
  }),
  paginationPrepositionText: PropTypes.string,
  // Selected list props
  selectedListTitle: PropTypes.string.isRequired,
  removeAllLabel: PropTypes.string.isRequired,
  // Common props
  inheritable: PropTypes.bool,
  selectedItems: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  inheritedItems: PropTypes.array,
  inheritText: PropTypes.string,
  // Remove All Warnig Dialog props
  removeAllWarningTitle: PropTypes.string,
  removeAllWarningMessage: PropTypes.string,
  removeAllWaringSubmitText: PropTypes.string,
  removeAllWaringCancelText: PropTypes.string
};

MultiSelector.defaultProps = {
  showBreadCrumb: true,
  selectable: true,
  inheritable: false,
  tagName: '',
  dataTableProps: {
    emptyText: 'No records'
  }
};

export default MultiSelector;
