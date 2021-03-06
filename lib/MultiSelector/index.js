'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable eqeqeq */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AllList = require('./AllList');

var _AllList2 = _interopRequireDefault(_AllList);

var _SelectedList = require('./SelectedList');

var _SelectedList2 = _interopRequireDefault(_SelectedList);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _uniqBy = require('lodash/uniqBy');

var _uniqBy2 = _interopRequireDefault(_uniqBy);

var _Helpers = require('../utils/Helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MultiSelector = function MultiSelector(props) {
  var allSelectedItems = (0, _cloneDeep2.default)(props.selectedItems);
  if (props.inheritable) {
    props.selectedItems.forEach(function (item) {
      var selectedItem = (0, _find2.default)(allSelectedItems, function (i) {
        return i.id == item.id;
      });
      if (selectedItem.children) {
        selectedItem.children = (0, _uniqBy2.default)(selectedItem.children.concat(item.children || []), 'id');
      } else {
        selectedItem.children = item.children;
      }
    });
  }
  return _react2.default.createElement(
    'div',
    _extends({ className: 'row-gapless' }, (0, _Helpers.t)(props.tagName)),
    _react2.default.createElement(_AllList2.default, {
      showBreadCrumb: props.showBreadCrumb,
      title: props.allListTitle,
      selectable: props.selectable,
      searchBoxPlaceholder: props.searchBoxPlaceholder,
      inheritable: props.inheritable,
      listingItems: props.listingItems,
      selectedItems: props.selectedItems,
      allItems: props.allItems,
      inheritedItems: props.inheritedItems,
      dataTableProps: props.dataTableProps,
      onChange: props.onChange,
      allSelectedItems: allSelectedItems,
      paginationPrepositionText: props.paginationPrepositionText
    }),
    _react2.default.createElement(_SelectedList2.default, {
      title: props.selectedListTitle,
      removeAllLabel: props.removeAllLabel,
      removeAllWarningTitle: props.removeAllWarningTitle,
      removeAllWarningMessage: props.removeAllWarningMessage,
      removeAllWaringSubmitText: props.removeAllWaringSubmitText,
      removeAllWaringCancelText: props.removeAllWaringCancelText,
      inheritable: props.inheritable,
      selectedItems: props.selectedItems,
      inheritedItems: props.inheritedItems,
      onChange: props.onChange,
      inheritText: props.inheritText,
      showBreadCrumb: props.showBreadCrumb,
      allSelectedItems: allSelectedItems
    })
  );
};

MultiSelector.propTypes = {
  tagName: _react.PropTypes.string,
  // All list props
  showBreadCrumb: _react.PropTypes.bool,
  allListTitle: _react.PropTypes.string.isRequired,
  selectable: _react.PropTypes.bool,
  searchBoxPlaceholder: _react.PropTypes.string.isRequired,
  listingItems: _react.PropTypes.array.isRequired,
  allItems: _react.PropTypes.array.isRequired,
  dataTableProps: _react.PropTypes.shape({
    onQueryChange: _react.PropTypes.func.isRequired,
    columns: _react.PropTypes.array.isRequired,
    total: _react.PropTypes.total,
    query: _react.PropTypes.object.isRequired,
    emptyText: _react.PropTypes.string
  }),
  paginationPrepositionText: _react.PropTypes.string,
  // Selected list props
  selectedListTitle: _react.PropTypes.string.isRequired,
  removeAllLabel: _react.PropTypes.string.isRequired,
  // Common props
  inheritable: _react.PropTypes.bool,
  selectedItems: _react.PropTypes.array.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  inheritedItems: _react.PropTypes.array,
  inheritText: _react.PropTypes.string,
  // Remove All Warnig Dialog props
  removeAllWarningTitle: _react.PropTypes.string,
  removeAllWarningMessage: _react.PropTypes.string,
  removeAllWaringSubmitText: _react.PropTypes.string,
  removeAllWaringCancelText: _react.PropTypes.string
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

exports.default = MultiSelector;
module.exports = exports['default'];