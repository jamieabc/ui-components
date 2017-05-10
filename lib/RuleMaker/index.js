'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SelectorWithPanel = require('../SelectorWithPanel');

var _SelectorWithPanel2 = _interopRequireDefault(_SelectorWithPanel);

var _LinkOrText = require('../SelectorWithPanel/Selector/LinkOrText');

var _LinkOrText2 = _interopRequireDefault(_LinkOrText);

var _Strategies = require('./Strategies');

var _Strategies2 = _interopRequireDefault(_Strategies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBox = function CheckBox(_ref) {
  var checked = _ref.checked,
      disabled = _ref.disabled,
      excluded = _ref.excluded,
      onChange = _ref.onChange;

  var klassNames = (0, _classnames2.default)('fa fa-lg cursor-pointer', { 'text-success': !excluded && checked, 'disabled': disabled,
    'text-danger': excluded && checked,
    'fa-check-circle': !excluded, 'fa-minus-circle': excluded });

  return _react2.default.createElement('i', { onClick: onChange, className: klassNames });
};

var RuleMaker = function (_Component) {
  _inherits(RuleMaker, _Component);

  function RuleMaker() {
    _classCallCheck(this, RuleMaker);

    return _possibleConstructorReturn(this, (RuleMaker.__proto__ || Object.getPrototypeOf(RuleMaker)).apply(this, arguments));
  }

  _createClass(RuleMaker, [{
    key: 'getColumns',

    // TODO: The function is so massive...
    value: function getColumns(columns, dataSource) {
      return function (props) {
        var factory = function factory(name) {
          var render = function render(ignored, r) {
            var checked = r.selected === name;
            var disabled = r.disabled && r.disabled.includes(name);

            return _react2.default.createElement(CheckBox, {
              checked: checked,
              disabled: disabled,
              excluded: name === 'excluded',
              onChange: function onChange() {
                return !disabled && props.onToggle(r.id, checked, name);
              }
            });
          };

          var isTitleChecked = dataSource.length > 0 && dataSource.every(function (s) {
            return s.selected === name;
          });
          var isTitleDisabled = dataSource.every(function (s) {
            return s.disabled && s.disabled.includes(name);
          });
          var onTitleChange = function onTitleChange() {
            return !isTitleDisabled && props.onToggle(dataSource.map(function (r) {
              return r.id;
            }), isTitleChecked, name);
          };
          var title = _react2.default.createElement(CheckBox, {
            checked: isTitleChecked,
            disabled: isTitleDisabled,
            excluded: name === 'excluded',
            onChange: onTitleChange
          });

          return {
            name: name,
            width: 30,
            sortable: false,
            textAlign: 'center',
            title: title,
            render: render
          };
        };

        var decoratedColumns = columns.map(function (c) {
          if (!c.expandable) {
            return c;
          }

          return Object.assign({}, c, { render: function render(ignored, r) {
              return _react2.default.createElement(_LinkOrText2.default, {
                r: r,
                name: c.name,
                onClick: function onClick() {
                  return props.onQuery({ parent_id: r.id });
                }
              });
            }
          });
        });

        return [factory('included'), factory('excluded')].concat(decoratedColumns);
      };
    }
  }, {
    key: 'getDataSource',
    value: function getDataSource() {
      var sRunner = _Strategies2.default.prepare(this.props.strategies, this.props);
      return sRunner.build(this.props.dataSource);
    }
  }, {
    key: 'render',
    value: function render() {
      var dataSource = this.getDataSource();

      return _react2.default.createElement(_SelectorWithPanel2.default, {
        idKey: 'id',

        text: this.props.text,
        ancestors: this.props.ancestors,
        selected: this.props.selected,

        columnFactory: this.getColumns(this.props.columns, dataSource),
        dataSource: dataSource,
        query: this.props.query,

        onUnselectAllConfirm: this.props.onUnselectAllConfirm,
        onQuery: this.props.onQuery,
        onOverrideSelected: this.props.onOverrideSelected,
        onOverrideAncestors: this.props.onOverrideAncestors
      });
    }
  }]);

  return RuleMaker;
}(_react.Component);

RuleMaker.CheckBox = CheckBox;

RuleMaker.propTypes = {
  text: _SelectorWithPanel2.default.propTypes.text,
  ancestors: _SelectorWithPanel2.default.propTypes.ancestors,
  onUnselectAllConfirm: _SelectorWithPanel2.default.propTypes.onUnselectAllConfirm,
  onQuery: _SelectorWithPanel2.default.propTypes.onQuery,
  onOverrideSelected: _SelectorWithPanel2.default.propTypes.onOverrideSelected,
  onOverrideAncestors: _SelectorWithPanel2.default.propTypes.onOverrideAncestors,

  strategies: _propTypes2.default.array, // the order of this field matters
  columns: _propTypes2.default.array, // datagrid format
  dataSource: _propTypes2.default.array,
  query: _propTypes2.default.object,

  selected: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    selected: _propTypes2.default.oneOf(['included', 'excluded', undefined, null]),
    children: _propTypes2.default.array
  }))
};

RuleMaker.defaultProps = {
  columns: [],
  dataSource: [],
  selected: [],
  strategies: ['basic', 'inheritance']
};

exports.default = RuleMaker;
module.exports = exports['default'];