import flatten from 'lodash/array/flatten';

const ArrayHelper = {
  // src: array of objects
  flattenWith(src, keyName) {
    if (!keyName) { throw new Error('2nd argument is required'); }

    const children = flatten(src.map(c => c[keyName])).filter(Boolean);
    if (!children || children.length === 0) { return src; }

    const srcWithoutChildren = src.map(s =>
      Object.assign({}, s, { [keyName]: [] })
    );

    return ArrayHelper.flattenWith(srcWithoutChildren.concat(children),
                                   keyName);
  },

  // TODO: generalize
  includes(collection, validate) {
    const flattenCollection = ArrayHelper.flattenWith(collection, 'children');
    return flattenCollection.some(r => validate(r));
  }
};

export default ArrayHelper;
