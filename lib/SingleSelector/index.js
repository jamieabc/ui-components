'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _DataTable = require('../DataTable');

var _DataTable2 = _interopRequireDefault(_DataTable);

var _SearchBox = require('../SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _Helpers = require('../utils/Helpers');

var _Helpers2 = _interopRequireDefault(_Helpers);

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleSelector = function (_Component) {
  _inherits(SingleSelector, _Component);

  function SingleSelector(props) {
    _classCallCheck(this, SingleSelector);

    var _this = _possibleConstructorReturn(this, (SingleSelector.__proto__ || Object.getPrototypeOf(SingleSelector)).call(this, props));

    _this.state = { expanded: props.expanded };

    _this.radioColumn = {
      name: 'radio',
      title: ' ',
      sortable: false,
      resizable: false,
      reorderable: false,
      width: 30,
      style: { textAlign: 'center' },
      render: function render(value, data) {
        return _react2.default.createElement('input', {
          type: 'radio',
          value: data.id,
          onChange: _this.handleChange,
          checked: _this.props.selectedId && _this.props.selectedId.toString() === data.id.toString()
        });
      }
    };

    _this.handleCollapse = function () {
      _this.setState({ expanded: !_this.state.expanded });
    };

    _this.handleStateChange = function (value) {
      _this.props.dataTableProps.onQueryChange({ state: value });
    };

    _this.handleChange = function (e) {
      e.preventDefault();
      _this.props.onChange(parseInt(e.target.value, 10));
      _this.setState({ expanded: false });
    };
    return _this;
  }

  _createClass(SingleSelector, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.expanded !== this.props.expanded) {
        this.setState({ expanded: nextProps.expanded });
      }
    }
  }, {
    key: 'renderSearchBar',
    value: function renderSearchBar() {
      var currentState = this.props.dataTableProps.query.state;
      var searchBox = _react2.default.createElement(_SearchBox2.default, {
        handleQueryChange: this.props.dataTableProps.onQueryChange,
        placeholder: this.props.searchBoxPlaceholder,
        keyword: this.props.dataTableProps.query.keyword
      });
      var stateFilter = _react2.default.createElement(
        _Dropdown2.default,
        { className: 'input-group-btn', id: 'single-selector-state-filter' },
        _react2.default.createElement(_Dropdown2.default.Toggle, { title: (0, _find2.default)(this.props.stateItems, 'key', currentState)['value'] }),
        _react2.default.createElement(
          _Dropdown2.default.Menu,
          { onSelect: this.handleStateChange },
          this.props.stateItems.map(function (item) {
            return _react2.default.createElement(
              _MenuItem2.default,
              { eventKey: item.key, key: item.key },
              item.value
            );
          })
        )
      );

      if (this.props.filterByState) {
        return _react2.default.createElement(
          'div',
          { className: 'input-group' },
          searchBox,
          stateFilter
        );
      }
      return searchBox;
    }
  }, {
    key: 'renderSelectedItemLabel',
    value: function renderSelectedItemLabel() {
      if (this.props.selectedItemLabel) {
        return _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            { className: 'small' },
            this.props.selectedItemLabel
          )
        );
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$dataTableProps = this.props.dataTableProps,
          columns = _props$dataTableProps.columns,
          onQueryChange = _props$dataTableProps.onQueryChange,
          dataSource = _props$dataTableProps.dataSource,
          total = _props$dataTableProps.total,
          emptyText = _props$dataTableProps.emptyText;
      var order = this.props.dataTableProps.query.order;

      var tableColumns = [this.radioColumn].concat(columns);
      var warpperClassName = this.props.warpperClassName;


      return _react2.default.createElement(
        'span',
        t(this.props.tagName),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('input-group', warpperClassName, { 'hidden': this.state.expanded }) },
          _react2.default.createElement(
            'span',
            { className: 'input-group-btn' },
            _react2.default.createElement(
              _Button2.default,
              { disabled: this.props.disabled, onClick: this.handleCollapse },
              _react2.default.createElement('i', { className: 'fa fa-plus' })
            )
          ),
          _react2.default.createElement('input', { className: 'form-control', type: 'text', disabled: true, placeholder: this.props.inputPlaceholder || this.props.selectedItemLabel })
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('block', 'block-expandable', warpperClassName, { 'hidden': !this.state.expanded }) },
          _react2.default.createElement(
            _Button2.default,
            { onClick: this.handleCollapse },
            _react2.default.createElement('i', { className: 'fa fa-minus' })
          ),
          '\xA0',
          this.props.title,
          this.renderSearchBar(),
          this.renderSelectedItemLabel(),
          _react2.default.createElement(
            'div',
            { className: 'table-bordered hack-no-horizontal-scrollbar' },
            _react2.default.createElement(_DataTable2.default, {
              onPageChange: onQueryChange,
              selectable: false,
              dataSource: dataSource,
              columns: tableColumns,
              sortInfo: _Helpers2.default.arrayifySort(order),
              pager: false,
              style: { height: 30 * (total > 10 ? 10 : total === 0 ? 1 : total) + 30 },
              emptyText: emptyText,
              scrollbarSize: 20,
              resizableColumns: false
            })
          ),
          this.props.children
        )
      );
    }
  }]);

  return SingleSelector;
}(_react.Component);

SingleSelector.propTypes = {
  tagName: _react.PropTypes.string,
  warpperClassName: _react.PropTypes.string,
  expanded: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  selectedId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  onChange: _react.PropTypes.func.isRequired,
  title: _react.PropTypes.string.isRequired,
  searchBoxPlaceholder: _react.PropTypes.string.isRequired,
  inputPlaceholder: _react.PropTypes.string.isRequired,
  filterByState: _react.PropTypes.bool,
  stateItems: _react.PropTypes.array,
  selectedItemLabel: _react.PropTypes.string,
  dataTableProps: _react.PropTypes.shape({
    onQueryChange: _react.PropTypes.func.isRequired,
    columns: _react.PropTypes.array.isRequired,
    emptyText: _react.PropTypes.string,
    dataSource: _react.PropTypes.array.isRequired,
    total: _react.PropTypes.total,
    query: _react.PropTypes.shape({
      order: _react.PropTypes.string,
      state: _react.PropTypes.string,
      keyword: _react.PropTypes.string
    })
  })
};

SingleSelector.defaultProps = {
  tagName: '',
  warpperClassName: 'form-width-md',
  expanded: false,
  disabled: false,
  filterByState: false,
  stateItems: [{ key: '0,1', value: 'All' }, { key: '0', value: 'Active' }, { key: '1', value: 'Inactive' }]
};

exports.default = SingleSelector;
module.exports = exports['default'];