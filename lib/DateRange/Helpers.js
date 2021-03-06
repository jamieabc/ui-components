'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_momentTimezone2.default.tz.link('Asia/Chongqing|Asia/Beijing');

exports.default = {
  getUnixOffset: function getUnixOffset(value, tzName) {
    switch (value.rangeType) {
      case 'custom':
        var time = _momentTimezone2.default.tz(tzName).valueOf();
        return {
          start_at: value.start_at || time,
          end_at: value.end_at || time
        };
      case 'today':
        return {
          start_at: _momentTimezone2.default.tz(tzName).startOf('day').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).startOf('hour').add(1, 'hours').valueOf()
        };
      case 'yesterday':
        return {
          start_at: _momentTimezone2.default.tz(tzName).subtract(1, 'days').startOf('day').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).subtract(1, 'days').endOf('day').valueOf()
        };
      case 'this_week':
        return {
          start_at: _momentTimezone2.default.tz(tzName).startOf('week').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).startOf('hour').add(1, 'hours').valueOf()
        };
      case 'last_week':
        return {
          start_at: _momentTimezone2.default.tz(tzName).subtract(7, 'days').startOf('week').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).subtract(7, 'days').endOf('week').valueOf()
        };
      case 'last7':
        return {
          start_at: _momentTimezone2.default.tz(tzName).subtract(7, 'days').startOf('day').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).subtract(1, 'days').endOf('day').valueOf()
        };
      case 'last14':
        return {
          start_at: _momentTimezone2.default.tz(tzName).subtract(14, 'days').startOf('day').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).subtract(1, 'days').endOf('day').valueOf()
        };
      case 'this_month':
        return {
          start_at: _momentTimezone2.default.tz(tzName).startOf('month').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).startOf('hour').add(1, 'hours').valueOf()
        };
      case 'last_month':
        return {
          start_at: _momentTimezone2.default.tz(tzName).startOf('month').subtract(1, 'days').startOf('month').valueOf(),
          end_at: _momentTimezone2.default.tz(tzName).startOf('month').subtract(1, 'days').endOf('month').valueOf()
        };
      case 'all_time':
        return { start_at: undefined, end_at: undefined };
      default:
    }
  },
  humanizeDateRange: function humanizeDateRange(value, tzName, dateFormat, optionsText) {
    var start_at = void 0;
    var end_at = void 0;
    switch (value.rangeType) {
      case 'custom':
        if (value.start_at && value.end_at) {
          start_at = _momentTimezone2.default.tz(value.start_at, tzName).format(dateFormat);
          end_at = _momentTimezone2.default.tz(value.end_at, tzName).format(dateFormat);
          return start_at + ' - ' + end_at;
        }
        return optionsText['custom'];
      case 'today':
        start_at = _momentTimezone2.default.tz(tzName).format(dateFormat);
        return optionsText['today'] + ' : ' + start_at;
      case 'yesterday':
        start_at = _momentTimezone2.default.tz(tzName).subtract(1, 'days').format(dateFormat);
        return optionsText['yesterday'] + ' : ' + start_at;
      case 'this_week':
        return optionsText['this_week'];
      case 'last_week':
        return optionsText['last_week'];
      case 'last7':
        return optionsText['last7'];
      case 'last14':
        return optionsText['last14'];
      case 'this_month':
        return optionsText['this_month'];
      case 'last_month':
        return optionsText['last_month'];
      case 'all_time':
        return optionsText['all_time'];
      default:
    }
  }
};
module.exports = exports['default'];