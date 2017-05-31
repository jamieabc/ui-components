'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Runner = require('./Runner');

var _Runner2 = _interopRequireDefault(_Runner);

var _SHelper = require('./SHelper');

var _SHelper2 = _interopRequireDefault(_SHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SBasic(_ref) {
  var record = _ref.record,
      selected = _ref.selected;

  var selectedStatus = _SHelper2.default.selectedStatus(selected, record);

  if (!selectedStatus) {
    return _SHelper2.default.noChange;
  }

  return _SHelper2.default.change(record, { selected: selectedStatus });
}

_Runner2.default.register('basic', SBasic);

exports.default = SBasic;
module.exports = exports['default'];