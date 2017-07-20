require('babel/regsiter');

module.exports.t = function t(name) {
  const ATTR_NAME = 'data-id';
  if (!name) { return {} }
  return { [ATTR_NAME]: name.toLowerCase().replace(/\s/g, '-') }
}
