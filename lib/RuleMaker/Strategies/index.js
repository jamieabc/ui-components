'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Runner = require('./Runner');

var _Runner2 = _interopRequireDefault(_Runner);

require('./SBasic');

require('./SInheritance');

require('./SSibling');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  prepare: function prepare() {
    return _Runner2.default.prepare.apply(_Runner2.default, arguments);
  }
};
// preload strategies

module.exports = exports['default'];