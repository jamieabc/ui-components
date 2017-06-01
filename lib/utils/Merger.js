'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Merger = function () {
  function Merger() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Merger);

    this.idKey = options.idKey;
    this.overrideKey = options.overrideKey;
  }

  _createClass(Merger, [{
    key: 'isOverride',
    value: function isOverride(target, src) {
      if (src[this.overrideKey] === true) {
        return true;
      }

      return target[this.overrideKey] !== src[this.overrideKey];
    }
  }, {
    key: 'typeAccepted',
    value: function typeAccepted() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return args.reduce(function (memo, arg) {
        return memo && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object';
      }, true);
    }
  }, {
    key: 'getIndex',
    value: function getIndex(collection, item) {
      var _this = this;

      if (this.idKey) {
        return collection.findIndex(function (e) {
          return e[_this.idKey] === item[_this.idKey];
        });
      } else {
        if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
          throw new Error('please specify options.idKey while merging object array');
        }
        return collection.findIndex(function (e) {
          return e === item;
        });
      }
    }
  }, {
    key: 'run',
    value: function run(target, src) {
      var _this2 = this;

      if (!this.typeAccepted(target, src)) {
        return target;
      }

      if ((0, _isArray2.default)(target)) {
        return (0, _flatten2.default)([src]).reduce(function (memo, iSrc) {
          var index = _this2.getIndex(memo, iSrc);

          if (index !== -1) {
            return Object.assign([], memo, _defineProperty({}, index, _this2.run(memo[index], iSrc)));
          }

          return memo.concat([iSrc]);
        }, target);
      } else {
        // object
        return Object.keys(src).reduce(function (memo, key) {
          memo[key] = target[key] && !_this2.isOverride(target, src) ? _this2.run(target[key], src[key]) : src[key];
          return memo;
        }, {});
      }
    }
  }]);

  return Merger;
}();

function factory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new Merger(options);
}

factory.run = function (target, src) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return factory(options).run(target, src);
};

exports.default = factory;
module.exports = exports['default'];