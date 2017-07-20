'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Runner = require('./Runner');

var _Runner2 = _interopRequireDefault(_Runner);

var _SHelper = require('./SHelper');

var _SHelper2 = _interopRequireDefault(_SHelper);

var _ObjectArray = require('../../utils/ObjectArray');

var _ObjectArray2 = _interopRequireDefault(_ObjectArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// While this strategy is being applied,
// the RuleMaker could only be whitelist or blacklist, but not the combination.
// Note, it could be overridden by other strategies that calls Helpers.terminate
function SWhiteOrBlackOnly(_ref) {
  var record = _ref.record,
      selected = _ref.selected,
      ancestors = _ref.ancestors;

  if (selected.length === 0) {
    return _SHelper2.default.noChange;
  }

  var selectedStatus = _ObjectArray2.default.find(selected, function (r) {
    return r.selected;
  }).selected;
  var disabled = _SHelper2.default.excludeStatus(selectedStatus);

  return _SHelper2.default.change(record, { disabled: disabled });
}

_Runner2.default.register('whiteOrBlackOnly', SWhiteOrBlackOnly);

exports.default = SWhiteOrBlackOnly;
module.exports = exports['default'];