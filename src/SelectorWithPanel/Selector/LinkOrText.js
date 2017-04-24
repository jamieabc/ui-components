import React from 'react';

const LinkOrText = ({ r, onClick }) => {
  if (!r.expandable && !r.clickable) { return <span>{r.name}</span>; }

  return (
    <a onClick={onClick}>{r.name}</a>
  );
};

export default LinkOrText;
