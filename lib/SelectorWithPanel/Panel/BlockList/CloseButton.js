'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CloseButton = function CloseButton(_ref) {
  var noTip = _ref.noTip,
      reserved = _ref.reserved,
      selected = _ref.selected,
      text = _ref.text,
      onClick = _ref.onClick;

  if (noTip) {
    return null;
  }
  var tipClassNames = (0, _classnames2.default)(['label', 'pull-right', { 'label-default': !selected, 'label-success': selected }]);

  if (reserved) {
    return _react2.default.createElement(
      'span',
      { className: tipClassNames },
      text.rightNested
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
};

exports.default = CloseButton;
module.exports = exports['default'];