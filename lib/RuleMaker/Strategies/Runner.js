"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Runner = function () {
  function Runner(activeStrategies, _ref) {
    var selected = _ref.selected,
        ancestors = _ref.ancestors;

    _classCallCheck(this, Runner);

    this.activeStrategies = activeStrategies || [];
    this.selected = selected || [];
    this.ancestors = ancestors || [];
  }

  _createClass(Runner, [{
    key: "buildSingle",
    value: function buildSingle(r) {
      var _this = this;

      return this.activeStrategies.reduce(function (memo, s) {
        return memo.terminated ? memo : Object.assign({}, memo, s.f({ record: r, selected: _this.selected, ancestors: _this.ancestors }));
      }, r);
    }
  }, {
    key: "build",
    value: function build(dataSource) {
      var _this2 = this;

      return dataSource.map(function (r) {
        return _this2.buildSingle(r);
      });
    }
  }]);

  return Runner;
}();

var RunnerWrapper = {
  enabledStrategies: [],

  register: function register(key, f) {
    RunnerWrapper.enabledStrategies.push({ key: key, f: f });
  },
  prepare: function prepare(sKeys, _ref2) {
    var selected = _ref2.selected,
        ancestors = _ref2.ancestors;

    var activeStrategies = RunnerWrapper.enabledStrategies.filter(function (s) {
      return sKeys.includes(s.key);
    });

    return new Runner(activeStrategies, { selected: selected, ancestors: ancestors });
  }
};

exports.default = RunnerWrapper;
module.exports = exports["default"];