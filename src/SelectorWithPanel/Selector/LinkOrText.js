import React from 'react';

const LinkOrText = ({ r, name, onClick }) => {
  const keyName = name || 'name';

  if (!r.expandable && !r.clickable) { return <span>{r[keyName]}</span>; }

  return (
    <a onClick={onClick}>{r[keyName]}</a>
  );
};

export default LinkOrText;
