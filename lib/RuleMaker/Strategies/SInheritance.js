'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Runner = require('./Runner');

var _Runner2 = _interopRequireDefault(_Runner);

var _SHelper = require('./SHelper');

var _SHelper2 = _interopRequireDefault(_SHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SInheritance(_ref) {
  var record = _ref.record,
      selected = _ref.selected,
      ancestors = _ref.ancestors;

  var selectedStatus = function selectedStatus(r) {
    return _SHelper2.default.selectedStatus(selected, r);
  };

  var ancestorStatus = ancestors.map(selectedStatus).filter(Boolean);

  // there is no selected ancestor
  if (ancestorStatus.length === 0) {
    return _SHelper2.default.noChange;
  }
  var disabled = ancestorStatus.includes('excluded') ? ['included', 'excluded'] : ['included'];

  return _SHelper2.default.terminate(record, { disabled: disabled });
}

_Runner2.default.register('inheritance', SInheritance);

exports.default = SInheritance;
module.exports = exports['default'];