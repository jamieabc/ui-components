'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkOrText = function LinkOrText(_ref) {
  var r = _ref.r,
      onClick = _ref.onClick;

  if (!r.expandable && !r.clickable) {
    return _react2.default.createElement(
      'span',
      null,
      r.name
    );
  }

  return _react2.default.createElement(
    'a',
    { onClick: onClick },
    r.name
  );
};

exports.default = LinkOrText;
module.exports = exports['default'];