import React, { Component, PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';

class InvalidWarning extends Component {
  render () {
    const { errorMessages } = this.props;
    if (!isEmpty(errorMessages)) {
      return (
        <OverlayTrigger
          placement="right"
          overlay={
            <Tooltip id="1">
              {isArray(errorMessages) ? errorMessages.join(', ') : errorMessages}
            </Tooltip>}
        >
          <i className={`fa fa-exclamation-triangle fa-lg text-danger ${this.props.iconClassName || ''}`}/>
        </OverlayTrigger>
      );
    }
    return false;
  }
}

InvalidWarning.propTypes = {
  errorMessages: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  iconClassName: PropTypes.string
};

export default InvalidWarning;
