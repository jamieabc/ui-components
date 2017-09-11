import React from 'react';
import classNames from 'classnames';
import CloseButton from './CloseButton';

const Row = ({ r, onClick, children, reserved, noTip, text }) => {
  const klassNames = classNames(['callout', 'text-hidden',
                                 { 'callout-success': [true, 'included'].includes(r.selected),
                                   'text-success': [true, 'included'].includes(r.selected),
                                   'callout-danger': r.selected === 'excluded',
                                   'text-danger': r.selected === 'excluded',
                                   'callout-default': !r.selected }]);
  const closeButtonProps = { noTip, reserved, selected: r.selected, text, onClick };

  return (
    <div className={klassNames}>
      <CloseButton {...closeButtonProps} />
      {r.name}
      {children}
    </div>
  );
}

export default Row;
