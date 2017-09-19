import React from 'react';
import Accordion from './AccordionStyle';
import NestedBlock from './NestedStyle';

const BlockList = ({ style, collection, onRemove, text }) => {
  // if (!collection.length) { return null; }

  const Component = style === 'accordion' ? Accordion : NestedBlock;

  return (
    <Component
      dataSource={collection}
      onRemove={onRemove}
      text={text}
    />
  )
}

BlockList.defaultProps = {
  collection: []
}

export default BlockList;
