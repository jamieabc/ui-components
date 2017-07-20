import Runner from './Runner';
import Helpers from './SHelper';
import ObjectArray from '../../utils/ObjectArray';

// While this strategy is being applied,
// the RuleMaker could only be whitelist or blacklist, but not the combination.
// Note, it could be overridden by other strategies that calls Helpers.terminate
function SWhiteOrBlackOnly({ record, selected, ancestors }) {
  if (selected.length === 0) { return Helpers.noChange; }

  const selectedStatus = ObjectArray.find(selected, (r) => r.selected).selected;
  const disabled = Helpers.excludeStatus(selectedStatus);

  return Helpers.change(record, { disabled });
}

Runner.register('whiteOrBlackOnly', SWhiteOrBlackOnly);

export default SWhiteOrBlackOnly;
