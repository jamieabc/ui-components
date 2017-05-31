'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Runner = require('./Runner');

var _Runner2 = _interopRequireDefault(_Runner);

var _SHelper = require('./SHelper');

var _SHelper2 = _interopRequireDefault(_SHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function finder(r) {
  return function (s) {
    return s.parent_id === r.parent_id;
  };
}

function SSibling(_ref) {
  var record = _ref.record,
      selected = _ref.selected,
      ancestors = _ref.ancestors;

  var selectedStatus = _SHelper2.default.selectedStatus(selected, record, { finder: finder });

  // there is no selected sibling
  if (!selectedStatus) {
    return _SHelper2.default.noChange;
  }
  var disabled = ['included', 'excluded'].filter(function (k) {
    return k !== selectedStatus;
  });

  return _SHelper2.default.change(record, { disabled: disabled });
}

_Runner2.default.register('sibling', SSibling);

exports.default = SSibling;
module.exports = exports['default'];