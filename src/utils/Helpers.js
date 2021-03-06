import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import round from 'lodash/round';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import assign from 'lodash/assign';
import compact from 'lodash/compact';

export default {
  getParamByName(name) {
    const _name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp(`[\\?&]${_name}=([^&#]*)`);
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  },

  stringifySort(orderArr) {
    return compact(map(orderArr, (obj) => {
      if (isEmpty(obj)) {
        return null;
      }
      if (obj.dir) {
        let dir;
        if (obj.dir === -1 || obj.dir === 'desc') {
          dir = 'desc';
        } else {
          dir = 'asc';
        }
        return `${obj.name},${dir}`;
      }
    })).join('|');
  },

  arrayifySort(orderStr) {
    return map(orderStr.split('|'), (str) => {
      const [name, dir] = str.split(',');
      return {name: name, dir: dir};
    });
  },

  numberWithCommas(num) {
    if (isNumber(num)) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    if (num == null) {
      return '0';
    }
    // decimal
    if (isString(num) && num.indexOf('.') > 0) {
      const [int, decimals] = num.split('.');
      return `${this.numberWithCommas(Number.parseInt(int, 10))}.${decimals}`;
    }

    return num;
  },

  currencyWithSymbol(currency) {
    return currency + ' $';
  },

  numberToPercentage(num) {
    if (isNumber(num)) {
      return round(num * 100, 3).toFixed(3) + '%';
    }
    if (num == null) {
      return '0.000%';
    }
    return num;
  },

  numberToCurrency(num, obj) {
    const currency = this.currencyWithSymbol(obj.currency);
    if (isNumber(num)) {
      num = obj.precision ? round(num, obj.precision).toFixed(obj.precision) : num.toString();
      const numArr = num.split('.');
      const suffix = numArr[1] ? '.' + numArr[1] : '';
      return currency + numArr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
    }
    if (num == null) {
      return currency + '0.00';
    }
    return num;
  },

  filterInt(value) {
    if (/^(-|\+)?([0-9]+|Infinity)$/.test(value)) {
      return Number(value);
    }
    return NaN;
  },

  objArrayStringToInt(objArray, key) {
    return map(objArray, (obj) => {
      let newObj = assign({}, obj);
      newObj[key] = this.filterInt(obj[key], 10) || obj[key];
      return newObj;
    });
  },

  t(name) {
    const ATTR_NAME = 'data-tid';

    if (!name) { return {} }

    return { [ATTR_NAME]: name.toLowerCase().replace(/\s/g, '-') }
  }
};
