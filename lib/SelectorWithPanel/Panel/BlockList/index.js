'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AccordionStyle = require('./AccordionStyle');

var _AccordionStyle2 = _interopRequireDefault(_AccordionStyle);

var _NestedStyle = require('./NestedStyle');

var _NestedStyle2 = _interopRequireDefault(_NestedStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockList = function BlockList(_ref, // props
_ref2 // context
) {
  var style = _ref.style,
      collection = _ref.collection,
      onRemove = _ref.onRemove,
      text = _ref.text;
  var noBreadcrumb = _ref2.noBreadcrumb;

  var Component = style === 'accordion' ? _AccordionStyle2.default : _NestedStyle2.default;
  var klassNames = (0, _classnames2.default)(['picked-items', { 'picked-items__height-breadcrumb': !noBreadcrumb,
    'picked-items__height-default': noBreadcrumb }]);

  return _react2.default.createElement(Component, {
    className: klassNames,
    dataSource: collection,
    onRemove: onRemove,
    text: text
  });
};

BlockList.defaultProps = {
  collection: []
};

BlockList.contextTypes = {
  noBreadcrumb: _propTypes2.default.bool
};

exports.default = BlockList;
module.exports = exports['default'];