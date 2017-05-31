import Runner from './Runner';
import Helpers from './SHelper';

function finder(r) {
  return (s) => s.parent_id === r.parent_id;
}

function SSibling({ record, selected, ancestors }) {
  const selectedStatus = Helpers.selectedStatus(selected, record, { finder });

  // there is no selected sibling
  if (!selectedStatus) { return Helpers.noChange; }
  const disabled = ['included', 'excluded'].filter((k) => k !== selectedStatus);

  return Helpers.change(record, { disabled });
}

Runner.register('sibling', SSibling);

export default SSibling;
