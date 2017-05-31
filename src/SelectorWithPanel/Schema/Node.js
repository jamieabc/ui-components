import { PropTypes } from 'react';

export default PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prop_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parent_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.array,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
});
