import React, { PropTypes } from 'react';
import classNames from 'classnames';

import nodeSchema from '../Schema/Node';

function build(rows, props) {
  return rows.map((r, i) => (
    <Row
      r={r}
      text={props.text}
      key={r.name + i}
      reserved={r.reserved}
      noTip={props.noTip}
      onClick={() => props.onRemove(r[props.idKey])}
    >
      {r.children && r.children.length > 0 ? build(r.children, Object.assign({}, props, { noTip: r.reserved })) : null }
    </Row>
  ));
}

const Row = ({ r, onClick, children, reserved, noTip, text }) => {
  const klassNames = classNames(['callout', 'text-hidden',
                                 {
                                   'callout-success': [true, 'included'].includes(r.selected),
                                   'text-success': [true, 'included'].includes(r.selected),
                                   'callout-danger': r.selected === 'excluded',
                                   'text-danger': r.selected === 'excluded',
                                   'callout-default': !r.selected }]);
  const tipClassNames = classNames(['label', 'pull-right', { 'label-default': !r.selected, 'label-success': r.selected }]);

  const btn = (() => {
    if (noTip) { return null; }

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
  })();

  return (
    <div className={klassNames}>
      {btn}
      {r.name}
      {children}
    </div>
  );
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
  dataSource: []
};

NestedBlock.contextTypes = {
  idKey: PropTypes.string
};

export default NestedBlock;
