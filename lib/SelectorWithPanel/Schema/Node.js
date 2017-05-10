'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

exports.default = _react.PropTypes.shape({
  id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  prop_id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  parent_id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  name: _react.PropTypes.string,
  value: _react.PropTypes.string,
  children: _react.PropTypes.array,
  selected: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.bool])
});
module.exports = exports['default'];