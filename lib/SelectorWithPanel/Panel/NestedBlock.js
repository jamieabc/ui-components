'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _Node = require('../Schema/Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function build(rows, props) {
  return rows.map(function (r, i) {
    return _react2.default.createElement(
      Row,
      {
        r: r,
        key: r.name + i,
        reserved: r.reserved,
        noTip: props.noTip,
        onClick: function onClick() {
          return props.onRemove(r[props.idKey]);
        }
      },
      r.children && r.children.length > 0 ? build(r.children, Object.assign({}, props, { noTip: r.reserved })) : null
    );
  });
}

var Row = function Row(_ref) {
  var r = _ref.r,
      onClick = _ref.onClick,
      children = _ref.children,
      reserved = _ref.reserved,
      noTip = _ref.noTip;

  var klassNames = (0, _classnames2.default)(['callout', 'text-hidden', {
    'callout-success': [true, 'included'].includes(r.selected),
    'text-success': [true, 'included'].includes(r.selected),
    'callout-danger': r.selected === 'excluded',
    'text-danger': r.selected === 'excluded',
    'callout-default': !r.selected }]);
  var tipClassNames = (0, _classnames2.default)(['label', 'pull-right', { 'label-default': !r.selected, 'label-success': r.selected }]);

  var btn = function () {
    if (noTip) {
      return null;
    }

    if (reserved) {
      return _react2.default.createElement(
        'span',
        { className: tipClassNames },
        _i18next2.default.t('placement:::form::category::Placement Group-Level Setting')
      );
    }

    return _react2.default.createElement(
      'button',
      {
        type: 'button',
        className: 'close',
        'aria-label': 'Delete'
      },
      _react2.default.createElement(
        'span',
        { onClick: onClick, 'aria-hidden': 'true' },
        '\xD7'
      )
    );
  }();

  return _react2.default.createElement(
    'div',
    { className: klassNames },
    btn,
    r.name,
    children
  );
};

var NestedBlock = function NestedBlock(props, context) {
  return _react2.default.createElement(
    'div',
    { className: 'picked-items picked-items__height-breadcrumb' },
    build(props.dataSource, Object.assign({ idKey: context.idKey }, props))
  );
};

NestedBlock.Row = Row;

NestedBlock.propTypes = {
  dataSource: _react.PropTypes.arrayOf(_Node2.default),
  onRemove: _react.PropTypes.func
};

NestedBlock.defaultProps = {
  dataSource: []
};

NestedBlock.contextTypes = {
  idKey: _react.PropTypes.string
};

exports.default = NestedBlock;
module.exports = exports['default'];