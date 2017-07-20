'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// src: array of objects
function flattenWith(src, keyName) {
  if (!keyName) {
    throw new Error('2nd argument is required');
  }

  var children = (0, _flatten2.default)(src.map(function (c) {
    return c[keyName];
  })).filter(Boolean);
  if (!children || children.length === 0) {
    return src;
  }

  var srcWithoutChildren = src.map(function (s) {
    return Object.assign({}, s, _defineProperty({}, keyName, []));
  });

  return flattenWith(srcWithoutChildren.concat(children), keyName);
}

function _query(op) {
  return function (collection, validate) {
    var flattenCollection = flattenWith(collection, 'children');
    return flattenCollection[op](function (r) {
      return validate(r);
    });
  };
}

var ArrayHelper = {
  flattenWith: flattenWith,

  includes: _query('some'),
  filter: _query('filter'),
  find: _query('find')
};

exports.default = ArrayHelper;
module.exports = exports['default'];