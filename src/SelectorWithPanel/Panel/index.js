import React, { PropTypes } from 'react';
import classNames from 'classnames';

import BlockList from './BlockList';
import nodeSchema from '../Schema/Node';

const SelectedPanel = (props, context) => {
  const decoratedReserved = props.reserved.map(r => Object.assign({}, r, { reserved: true }));
  const collection = decoratedReserved.concat(props.selected);
  const emptyText = (() => {
    if (collection.length) { return null; }
    const klassNames = classNames([
      'panel-body', 'picked-items',
      { 'picked-items__height-breadcrumb': !context.noBreadcrumb,
        'picked-items__height-default'   : context.noBreadcrumb }
    ]);

    return (
      <div className={klassNames}>{props.text.rightEmpty}</div>
    );
  })();

  const removeAllBtn = props.selected.length ?
                       (
                         <button
                           onClick={props.onUnselectAll(() => props.onUnselect(props.selected.map(s => s[context.idKey])))}
                           className="btn btn-default btn-sm pull-right"
                         >
                           {props.text.rightRemoveAll}
                         </button>
                       ) : null;

  return (
    <div className="panel panel-default pick-panel col-xs-6">
      <div className="panel-heading">
        {removeAllBtn}
        <strong>{props.text.rightTitle}</strong>
      </div>

      {emptyText}

      <BlockList
        collection={collection}
        style={props.style}
        onRemove={props.onUnselect}
        text={props.text}
      />
    </div>
  );
}

SelectedPanel.propTypes = {
  text: PropTypes.shape({
    rightEmpty: PropTypes.string,
    rightTitle: PropTypes.string,
    rightRemoveAll: PropTypes.string
  }),
  style: PropTypes.oneOf(['nested', 'accordion']),

  selected: PropTypes.arrayOf(nodeSchema),
  reserved: PropTypes.arrayOf(nodeSchema),
  onUnselectAll: PropTypes.func,
  onUnselect: PropTypes.func
};

SelectedPanel.defaultProps = {
  reserved: [],
  selected: [],
  text: {},
  onUnselectAll: (callback) => callback
};

SelectedPanel.contextTypes = {
  idKey: PropTypes.string,
  noBreadcrumb: PropTypes.bool
};

export default SelectedPanel;
