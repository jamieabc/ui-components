'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ObjectArray = require('../../utils/ObjectArray');

var Helpers = {
  selectedStatus: function selectedStatus(selected, r) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var finder = function () {
      if (!options.finder) {
        return function (s) {
          return s.id === r.id;
        };
      }

      return options.finder(r);
    }();
    var matchingRecord = (0, _ObjectArray.flattenWith)(selected, 'children').find(finder);

    return matchingRecord ? matchingRecord.selected : null;
  },
  terminate: function terminate(record, attrs) {
    return Helpers.change(record, Object.assign({}, attrs, { terminated: true }));
  },
  change: function change(record, attrs) {
    if (!attrs.hasOwnProperty('disabled')) {
      return attrs;
    }

    var disabled = function () {
      var original = record.disabled || [];
      var nextDisabled = original.concat(attrs.disabled || []);

      return nextDisabled.length === 0 ? null : nextDisabled;
    }();

    return Object.assign({}, attrs, { disabled: disabled });
  },


  noChange: {}
};

exports.default = Helpers;
module.exports = exports['default'];