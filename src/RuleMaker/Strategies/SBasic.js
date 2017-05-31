import Runner from './Runner';
import Helpers from './SHelper';

function SBasic({ record, selected }) {
  const selectedStatus = Helpers.selectedStatus(selected, record);

  if (!selectedStatus) { return Helpers.noChange; }

  return Helpers.change(record, { selected: selectedStatus });
}

Runner.register('basic', SBasic);

export default SBasic;
