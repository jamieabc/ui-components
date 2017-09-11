import React, { PropTypes } from 'react';
import Row from './Row';

import nodeSchema from '../../Schema/Node';

function build(rows, props) {
  return rows.map((r, i) => {
    const hasChildren = r.children && r.children.length > 0;
    const children = hasChildren ? build(r.children, Object.assign({}, props, { noTip: r.reserved })) : null;

    return (
      <Row
        r={r}
        text={props.text}
        key={r.name + i}
        reserved={r.reserved}
        noTip={props.noTip}
        onClick={() => props.onRemove(r[props.idKey])}
      >
        {children}
      </Row>
    )
  });
}

const NestedBlock = (props, context) => {
  return (
    <div className="picked-items picked-items__height-breadcrumb">
      {build(props.dataSource, Object.assign({ idKey: context.idKey }, props))}
    </div>
  );
}

NestedBlock.Row = Row;

NestedBlock.propTypes = {
  text: PropTypes.object,
  dataSource: PropTypes.arrayOf(nodeSchema),
  onRemove: PropTypes.func,
};

NestedBlock.defaultProps = {
  text: {},
  dataSource: []
};

NestedBlock.contextTypes = {
  idKey: PropTypes.string
};

export default NestedBlock;
