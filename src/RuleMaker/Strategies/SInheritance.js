import Runner from './Runner';
import Helpers from './SHelper';

function SInheritance({ record, selected, ancestors }) {
  const selectedStatus = (r) => Helpers.selectedStatus(selected, r);

  const ancestorStatus = ancestors.map(selectedStatus).filter(Boolean);

  // there is no selected ancestor
  if (ancestorStatus.length === 0) { return Helpers.noChange; }
  const disabled = ['included', 'excluded'].filter((k) => ancestorStatus.includes(k));

  return Helpers.change(record, { disabled });
}

Runner.register('inheritance', SInheritance);

export default SInheritance;
