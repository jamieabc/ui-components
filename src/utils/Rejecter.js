// DFS
import isArray from 'lodash/isArray';
import flatten from 'lodash/flatten';
import isEqual from 'lodash/isEqual';

class Rejecter {
  constructor(options = {}) {
    this.idKey = options.idKey;
    this.childKey = options.childKey;
  }

  typeWarning() {
    throw new Error('Type violation! Rejecter.runSingleItem(<Array>, <single level Array>, <Object>)');
  }

  identical(a, b) {
    const args = [a, b];
    const fIndex = args.findIndex(e => typeof(e) === 'function');

    if (fIndex > -1) {
      const f = args[fIndex];
      const item = args[1 - fIndex];
      return f(item);
    }

    if (this.idKey && a.hasOwnProperty(this.idKey) && b.hasOwnProperty(this.idKey)) {
      return a[this.idKey] === b[this.idKey];
    }

    return a === b;
  }

  runSingleItem(collection, item) {
    if (!isArray(collection) || isArray(item)) { this.typeWarning(); }

    return collection.reduce((memo, single) => {
      if (this.identical(item, single)) {
        return memo.filter((r) => !this.identical(r, single) );
      }

      const children = single[this.childKey];
      if (children) {
        const newSingle = Object.assign({}, single, { [this.childKey]: this.runSingleItem(children, item) });
        const currentIndex = memo.findIndex(r => this.identical(r, single));
        return Object.assign([], memo, { [currentIndex]: newSingle })
      }

      return memo;
    }, collection);
  }

  run(collection, itemOrList) {
    const result = flatten([itemOrList]).reduce((memo, item) => {
      return this.runSingleItem(memo, item);
    }, collection);

    if (isEqual(result, collection)) { return collection; }

    return this.run(result, itemOrList);
  }
}

function factory(options = {}) {
  return new Rejecter(options);
}

factory.run = (collection, item, options={}) => {
  return factory(options).run(collection, item);
}

export default factory;
