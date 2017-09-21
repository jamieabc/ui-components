import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Accordion from './AccordionStyle';
import NestedBlock from './NestedStyle';

const BlockList = (
  { style, collection, onRemove, text }, // props
  { noBreadcrumb }                       // context
) => {
  const Component = style === 'accordion' ? Accordion : NestedBlock;
  const klassNames = classNames([
    'picked-items',
    { 'picked-items__height-breadcrumb': !noBreadcrumb,
      'picked-items__height-default'   : noBreadcrumb }
  ])

  return (
    <Component
      className={klassNames}
      dataSource={collection}
      onRemove={onRemove}
      text={text}
    />
  )
}

BlockList.defaultProps = {
  collection: []
}

BlockList.contextTypes = {
  noBreadcrumb: PropTypes.bool
};

export default BlockList;
