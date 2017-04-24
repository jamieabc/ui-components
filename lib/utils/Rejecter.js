'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // DFS


var _isArray = require('lodash/lang/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _flatten = require('lodash/array/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _isEqual = require('lodash/lang/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rejecter = function () {
  function Rejecter() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Rejecter);

    this.idKey = options.idKey;
    this.childKey = options.childKey;
  }

  _createClass(Rejecter, [{
    key: 'typeWarning',
    value: function typeWarning() {
      throw new Error('Type violation! Rejecter.runSingleItem(<Array>, <single level Array>, <Object>)');
    }
  }, {
    key: 'identical',
    value: function identical(a, b) {
      var args = [a, b];
      var fIndex = args.findIndex(function (e) {
        return typeof e === 'function';
      });

      if (fIndex > -1) {
        var f = args[fIndex];
        var item = args[1 - fIndex];
        return f(item);
      }

      if (this.idKey && a.hasOwnProperty(this.idKey) && b.hasOwnProperty(this.idKey)) {
        return a[this.idKey] === b[this.idKey];
      }

      return a === b;
    }
  }, {
    key: 'runSingleItem',
    value: function runSingleItem(collection, item) {
      var _this = this;

      if (!(0, _isArray2.default)(collection) || (0, _isArray2.default)(item)) {
        this.typeWarning();
      }

      return collection.reduce(function (memo, single) {
        if (_this.identical(item, single)) {
          return memo.filter(function (r) {
            return !_this.identical(r, single);
          });
        }

        var children = single[_this.childKey];
        if (children) {
          var newSingle = Object.assign({}, single, _defineProperty({}, _this.childKey, _this.runSingleItem(children, item)));
          var currentIndex = memo.findIndex(function (r) {
            return _this.identical(r, single);
          });
          return Object.assign([], memo, _defineProperty({}, currentIndex, newSingle));
        }

        return memo;
      }, collection);
    }
  }, {
    key: 'run',
    value: function run(collection, itemOrList) {
      var _this2 = this;

      var result = (0, _flatten2.default)([itemOrList]).reduce(function (memo, item) {
        return _this2.runSingleItem(memo, item);
      }, collection);

      if ((0, _isEqual2.default)(result, collection)) {
        return collection;
      }

      return this.run(result, itemOrList);
    }
  }]);

  return Rejecter;
}();

function factory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new Rejecter(options);
}

factory.run = function (collection, item) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return factory(options).run(collection, item);
};

exports.default = factory;
module.exports = exports['default'];