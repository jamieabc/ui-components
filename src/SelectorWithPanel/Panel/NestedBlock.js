import React, { PropTypes } from 'react';
import classNames from 'classnames';
import i18n from 'i18next';

import nodeSchema from '../Schema/Node';

function build(rows, props) {
  return rows.map((r, i) => (
    <Row
      r={r}
      key={r.name + i}
      reserved={r.reserved}
      noTip={props.noTip}
      onClick={() => props.onRemove(r[props.idKey])}
    >
      {r.children && r.children.length > 0 ? build(r.children, Object.assign({}, props, { noTip: r.reserved })) : null }
    </Row>
  ));
}

const Row = ({ r, onClick, children, reserved, noTip }) => {
  const klassNames = classNames(['callout', 'text-hidden', { 'callout-success': r.selected, 'text-success': r.selected, 'callout-default': !r.selected }]);
  const tipClassNames = classNames(['label', 'pull-right', { 'label-default': !r.selected, 'label-success': r.selected }]);

  const btn = (() => {
    if (noTip) { return null; }

    if (reserved) {
      return (
        <span className={tipClassNames}>
          {i18n.t('placement:::form::category::Placement Group-Level Setting')}
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
