import React, { PropTypes } from 'react';

import NestedBlock from './NestedBlock';
import nodeSchema from '../Schema/Node';

function renderBlocks(collection, onRemove, text) {
  if (!collection.length) { return null; }

  return (
    <NestedBlock
      dataSource={collection}
      onRemove={onRemove}
      text={text}
    />
  );
}

const SelectedPanel = (props, context) => {
  const decoratedReserved = props.reserved.map(r => Object.assign({}, r, { reserved: true }));
  const collection = decoratedReserved.concat(props.selected);
  const selectedBlocks = renderBlocks(collection, props.onUnselect, props.text);
  const emptyText = (() => {
    if (selectedBlocks) { return null; }

    return (
      <div className="panel-body picked-items picked-items__height-breadcrumb">
        {props.text.rightEmpty}
      </div>
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
      {selectedBlocks}
    </div>
  );
}

SelectedPanel.propTypes = {
  text: PropTypes.shape({
    rightEmpty: PropTypes.string,
    rightTitle: PropTypes.string,
    rightRemoveAll: PropTypes.string
  }),

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
  idKey: PropTypes.string
};

export default SelectedPanel;
