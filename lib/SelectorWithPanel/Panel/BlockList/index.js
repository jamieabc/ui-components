'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AccordionStyle = require('./AccordionStyle');

var _AccordionStyle2 = _interopRequireDefault(_AccordionStyle);

var _NestedStyle = require('./NestedStyle');

var _NestedStyle2 = _interopRequireDefault(_NestedStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockList = function BlockList(_ref) {
  var style = _ref.style,
      collection = _ref.collection,
      onRemove = _ref.onRemove,
      text = _ref.text;

  // if (!collection.length) { return null; }

  var Component = style === 'accordion' ? _AccordionStyle2.default : _NestedStyle2.default;

  return _react2.default.createElement(Component, {
    dataSource: collection,
    onRemove: onRemove,
    text: text
  });
};

BlockList.defaultProps = {
  collection: []
};

exports.default = BlockList;
module.exports = exports['default'];