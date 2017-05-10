import isArray from 'lodash/lang/isArray';
import flatten from 'lodash/array/flatten';

class Merger {
  constructor(options = {}) {
    this.idKey = options.idKey;
    this.overrideKey = options.overrideKey;
  }

  isOverride(target, src) {
    if (src[this.overrideKey] === true) { return true; }

    return target[this.overrideKey] !== src[this.overrideKey];
  }

  typeAccepted(...args) {
    return args.reduce((memo, arg) => (
      memo && (typeof(arg) === 'object')
    ), true);
  }

  getIndex(collection, item) {
    if (this.idKey) {
      return collection.findIndex((e) => e[this.idKey] === item[this.idKey]);
    } else {
      if (typeof(item) === 'object') {
        throw new Error('please specify options.idKey while merging object array');
      }
      return collection.findIndex((e) => e === item);
    }
  }

  run(target, src) {
    if (!this.typeAccepted(target, src)) { return target; }

    if (isArray(target)) {
      return flatten([src]).reduce((memo, iSrc) => {
        const index = this.getIndex(memo, iSrc);

        if (index !== -1) {
          return Object.assign([], memo, { [index]: this.run(memo[index], iSrc) });
        }

        return memo.concat([iSrc]);
      }, target);
    } else {
      // object
      return Object.keys(src).reduce((memo, key) => {
        memo[key] = (target[key] && !this.isOverride(target, src)) ?
          this.run(target[key], src[key]) :
          src[key];
        return memo;
      }, {});
    }
  }
}

function factory(options = {}) {
  return new Merger(options);
}

factory.run = (target, src, options={}) => {
  return factory(options).run(target, src);
}

export default factory;
