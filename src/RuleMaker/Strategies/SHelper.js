import { flattenWith } from '../../utils/ObjectArray';

const Helpers = {
  selectedStatus(selected, r, options={}) {
    const finder = (() => {
      if (!options.finder) { return (s) => s.id === r.id }

      return options.finder(r);
    })();
    const matchingRecord = flattenWith(selected, 'children').find(finder)

    return matchingRecord ? matchingRecord.selected : null;
  },

  excludeStatus(status) {
    return ['included', 'excluded'].filter(s => s !== status);
  },

  terminate(record, attrs) {
    return Helpers.change(record, Object.assign({}, attrs, { terminated: true }));
  },

  change(record, attrs) {
    if (!attrs.hasOwnProperty('disabled')) {
      return attrs;
    }

    const disabled = (() => {
      const original = record.disabled || [];
      const nextDisabled = original.concat(attrs.disabled || []);

      return nextDisabled.length === 0 ? null : nextDisabled;
    })();

    return Object.assign({}, attrs, { disabled });
  },

  noChange: {}
}

export default Helpers;
