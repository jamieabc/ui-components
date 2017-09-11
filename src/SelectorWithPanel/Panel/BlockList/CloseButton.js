import React from 'react';
import classNames from 'classnames';

const CloseButton = ({ noTip, reserved, selected, text, onClick }) => {
  if (noTip) { return null; }
  const tipClassNames = classNames(['label', 'pull-right',
                                    { 'label-default': !selected, 'label-success': selected }]);

  if (reserved) {
    return (
      <span className={tipClassNames}>
        {text.rightNested}
      </span>
    )
  }

  return (
    <button
      type="button"
      className="close"
      aria-label="Delete"
    >
      <span onClick={onClick} aria-hidden="true">×</span>
    </button>
  );
}

export default CloseButton;
