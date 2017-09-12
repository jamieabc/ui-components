'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _Node = require('../../Schema/Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function build(rows, props) {
  return rows.map(function (r, i) {
    var hasChildren = r.children && r.children.length > 0;
    var children = hasChildren ? build(r.children, Object.assign({}, props, { noTip: r.reserved })) : null;

    return _react2.default.createElement(
      _Row2.default,
      {
        r: r,
        text: props.text,
        key: r.name + i,
        reserved: r.reserved,
        noTip: props.noTip,
        onClick: function onClick() {
          return props.onRemove(r[props.idKey]);
        }
      },
      children
    );
  });
}

var NestedBlock = function NestedBlock(props, context) {
  return _react2.default.createElement(
    'div',
    { className: 'picked-items picked-items__height-breadcrumb' },
    build(props.dataSource, Object.assign({ idKey: context.idKey }, props))
  );
};

NestedBlock.Row = _Row2.default;

NestedBlock.propTypes = {
  text: _react.PropTypes.object,
  dataSource: _react.PropTypes.arrayOf(_Node2.default),
  onRemove: _react.PropTypes.func
};

NestedBlock.defaultProps = {
  text: {},
  dataSource: []
};

NestedBlock.contextTypes = {
  idKey: _react.PropTypes.string
};

exports.default = NestedBlock;
module.exports = exports['default'];