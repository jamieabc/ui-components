'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('babel/regsiter');

module.exports.t = function t(name) {
  var ATTR_NAME = 'data-tid';
  if (!name) {
    return {};
  }
  return _defineProperty({}, ATTR_NAME, name.toLowerCase().replace(/\s/g, '-'));
};