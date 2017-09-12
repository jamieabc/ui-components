'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Row = function Row(_ref) {
  var r = _ref.r,
      onClick = _ref.onClick,
      children = _ref.children,
      reserved = _ref.reserved,
      noTip = _ref.noTip,
      text = _ref.text;

  var klassNames = (0, _classnames2.default)(['callout', 'text-hidden', { 'callout-success': [true, 'included'].includes(r.selected),
    'text-success': [true, 'included'].includes(r.selected),
    'callout-danger': r.selected === 'excluded',
    'text-danger': r.selected === 'excluded',
    'callout-default': !r.selected }]);
  var closeButtonProps = { noTip: noTip, reserved: reserved, selected: r.selected, text: text, onClick: onClick };

  return _react2.default.createElement(
    'div',
    { className: klassNames },
    _react2.default.createElement(_CloseButton2.default, closeButtonProps),
    r.name,
    children
  );
};

exports.default = Row;
module.exports = exports['default'];