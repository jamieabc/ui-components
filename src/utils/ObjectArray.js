import flatten from 'lodash/flatten';

// src: array of objects
function flattenWith(src, keyName) {
  if (!keyName) { throw new Error('2nd argument is required'); }

  const children = flatten(src.map(c => c[keyName])).filter(Boolean);
  if (!children || children.length === 0) { return src; }

  const srcWithoutChildren = src.map(s =>
                                     Object.assign({}, s, { [keyName]: [] })
                                    );

  return flattenWith(srcWithoutChildren.concat(children), keyName);
}

function _query(op) {
  return (collection, validate) => {
    const flattenCollection = flattenWith(collection, 'children');
    return flattenCollection[op](r => validate(r));
  }
}

const ArrayHelper = {
  flattenWith,

  includes: _query('some'),
  filter: _query('filter'),
  find: _query('find')
};

export default ArrayHelper;
