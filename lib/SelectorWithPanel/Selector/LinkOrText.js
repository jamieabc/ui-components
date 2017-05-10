'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LinkOrText = function LinkOrText(_ref) {
  var r = _ref.r,
      name = _ref.name,
      onClick = _ref.onClick;

  var keyName = name || 'name';

  if (!r.expandable && !r.clickable) {
    return _react2.default.createElement(
      'span',
      null,
      r[keyName]
    );
  }

  return _react2.default.createElement(
    'a',
    { onClick: onClick },
    r[keyName]
  );
};

exports.default = LinkOrText;
module.exports = exports['default'];