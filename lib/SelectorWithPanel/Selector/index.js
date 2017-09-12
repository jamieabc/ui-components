'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchBox = require('../../SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _DataTable = require('../../DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _Helpers = require('../../utils/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Breadcrumb = require('./Breadcrumb');

var _Breadcrumb2 = _interopRequireDefault(_Breadcrumb);

var _LinkOrText = require('./LinkOrText');

var _LinkOrText2 = _interopRequireDefault(_LinkOrText);

var _Node = require('../Schema/Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function columns(props, context) {
  if (props.columnFactory) {
    return props.columnFactory(props);
  }

  var allChecked = props.dataSource.length > 0 && props.dataSource.every(function (d) {
    return props.isSelected(d[context.idKey]);
  });
  var ancestorChecked = allChecked && props.dataSource.length > 0 && props.dataSource.every(function (d) {
    return !props.isSelected(d[context.idKey], { strict: true });
  });

  return [{
    name: 'checkbox',
    width: 30,
    sortable: false,
    textAlign: 'center',
    title: _react2.default.createElement(CheckBox, {
      checked: allChecked,
      disabled: ancestorChecked,
      onClick: function onClick() {
        return !ancestorChecked && props.onToggle(props.dataSource.map(function (e) {
          return e[context.idKey];
        }), allChecked);
      }
    }),
    render: function render(ignored, r) {
      var selected = props.isSelected(r[context.idKey]);
      var disabled = selected && !props.isSelected(r[context.idKey], { strict: true });

      // disable the checkbox when its ancestor selected
      return _react2.default.createElement(CheckBox, {
        checked: selected,
        disabled: disabled,
        onClick: function onClick() {
          return !disabled && props.onToggle(r[context.idKey], selected);
        }
      });
    }
  }, {
    name: 'name', title: props.text.columnName,
    render: function render(ignored, r) {
      return _react2.default.createElement(_LinkOrText2.default, { r: r, onClick: function onClick() {
          return props.onQuery({ parent_id: r[context.idKey] });
        } });
    }
  }, { name: 'prop_id', title: 'ID', defaultWidth: 100, textAlign: 'center' }];
}

var CheckBox = function CheckBox(_ref) {
  var checked = _ref.checked,
      onClick = _ref.onClick,
      disabled = _ref.disabled;

  var cls = (0, _classnames2.default)('fa fa-check-circle fa-lg', { 'text-success': checked, 'disabled': disabled });
  return _react2.default.createElement('i', { className: cls, onClick: onClick });
};

var Selector = function Selector(props, context) {
  var uploader = function () {
    if (!props.progressBar) {
      return null;
    }

    return _react2.default.createElement(
      'button',
      { className: 'btn btn-default btn-fileUpload btn-sm pull-right h5__pull-right' },
      props.text.updateList,
      _react2.default.createElement('input', { type: 'file', onChange: props.onUpload, onClick: function onClick(e) {
          e.target.value = null;
        } }),
      props.progressBar
    );
  }();

  return _react2.default.createElement(
    'div',
    { className: 'panel panel-default pick-panel col-xs-6' },
    _react2.default.createElement(
      'div',
      { className: 'panel-heading' },
      uploader,
      _react2.default.createElement(
        'strong',
        null,
        props.text.leftTitle
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'panel-body' },
      _react2.default.createElement(_SearchBox2.default, {
        keyword: props.query.keyword,
        placeholder: props.text.placeholder,
        handleQueryChange: props.onQuery
      })
    ),
    _react2.default.createElement(_Breadcrumb2.default, { path: props.ancestors, onClick: props.onQuery }),
    _react2.default.createElement(
      'div',
      { className: 'item-to-pick' },
      _react2.default.createElement(_DataTable2.default, {
        dataSource: props.dataSource,
        rowHeight: props.rowHeight,
        columns: columns(props, context),
        sortInfo: _Helpers2.default.arrayifySort(props.query.order),
        pager: false,
        onPageChange: props.onQuery,
        selectable: false,
        style: { height: 30 * 10 + 36 },
        wrapperClassName: 'table-bordered',
        emptyText: props.text.leftEmpty,
        scrollbarSize: 0,
        focusable: false
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'panel-footer text-right' },
      _react2.default.createElement(_DataTable.Pagination, {
        offset: props.query.offset,
        limit: props.query.limit,
        total: props.query.total,
        onPageChange: props.onQuery,
        paginationPrepositionText: props.text.paginationSeparator,
        pageSizes: false
      })
    )
  );
};

Selector.CheckBox = CheckBox;
Selector.LinkOrText = _LinkOrText2.default;

Selector.propTypes = {
  text: _react.PropTypes.shape({
    leftTitle: _react.PropTypes.string,
    leftEmpty: _react.PropTypes.string,
    placeholder: _react.PropTypes.string,
    paginationSeparator: _react.PropTypes.string
  }),

  progressBar: _react.PropTypes.node,
  dataSource: _react.PropTypes.arrayOf(_Node2.default),
  ancestors: _react.PropTypes.arrayOf(_Node2.default),

  query: _react.PropTypes.shape({
    keyword: _react.PropTypes.string,
    offset: _react.PropTypes.number,
    limit: _react.PropTypes.number,
    total: _react.PropTypes.number,
    order: _react.PropTypes.string
  }),

  onToggle: _react.PropTypes.func,
  onQuery: _react.PropTypes.func,
  onUpload: _react.PropTypes.func,
  isSelected: _react.PropTypes.func
};

Selector.defaultProps = {
  ancestors: [],
  dataSource: [],

  text: {},
  query: {
    keyword: null,
    offset: 0,
    limit: 10,
    total: 0,
    order: 'name,asc'
  }
};

Selector.contextTypes = {
  idKey: _react.PropTypes.string
};

exports.default = Selector;
module.exports = exports['default'];