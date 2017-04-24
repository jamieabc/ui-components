import React, { Component, PropTypes } from 'react';
import flatten from 'lodash/array/flatten';

import nodeSchema from './Schema/Node';
import Selector from './Selector';
import Panel from './Panel';
import Merger from '../utils/Merger';
import Rejecter from '../utils/Rejecter';
import ObjectArray from '../utils/ObjectArray';

class SelectorWithPanel extends Component {
  constructor(props) {
    super(props);

    this.handleQuery = this.handleQuery.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleUnselect = this.handleUnselect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleUnSelectAll = this.handleUnSelectAll.bind(this);

    this.findRecord = (id, src = 'dataSource') => (
      flatten([src]).reduce((memo, s) => {
        if (memo.index > -1) { return memo; }
        const i = this.props[s].findIndex((r) => r[this.props.idKey] === id)

        return { index: i, record: this.props[s][i] }
      }, { index: -1, record: null })
    );
    this.findRecords = (ids, src = 'dataSource') => {
      const records = ids.map(id => {
        const { record } = this.findRecord(id, src);
        return record;
      })

      return records;
    };

    this.isSelected = (id, options={}) => {
      if (!id || id.length === 0) { return false; }

      if (!options.strict) {
        const ancestorSelected = this.props.ancestors.some(r =>
          ObjectArray.includes(this.props.selected.concat(this.props.reserved),
                               (o) => o[this.props.idKey] === r[this.props.idKey] && o.selected)
        );
        if (ancestorSelected) { return ancestorSelected; }
      }

      const itemSelected = flatten([id]).every(id =>
        ObjectArray.includes(this.props.selected.concat(this.props.reserved),
                             (r) => r[this.props.idKey] === id && r.selected)
      );
      return itemSelected;
    };

    this.withAncestors = (segment) => {
      const reversedSeq = [].concat(this.props.ancestors).reverse();

      return reversedSeq.reduce((memo, node) => (
        Object.assign({}, node, { children: flatten([memo]) })
      ), segment);
    };
  }

  getChildContext() {
    return { idKey: this.props.idKey };
  }

  handleExpand(parent_id) {
    const newAncestors = (() => {
      const { index } = this.findRecord(parent_id, 'ancestors');
      if (index > -1) { return this.props.ancestors.slice(0, index + 1); }

      const { record } = this.findRecord(parent_id, 'dataSource');
      if (record) { return this.props.ancestors.concat(record); }

      return [];
    })();

    this.props.onOverrideAncestors(newAncestors);
  }

  handleQuery(params) {
    // params.parent_id could be null, by which means navigate to the top lv
    if (params.hasOwnProperty('parent_id')) {
      this.handleExpand(params.parent_id);
    }

    this.props.onQuery(Object.assign({}, this.props.query, params));
  }

  handleToggle(ids, beforeSelected) {
    if (beforeSelected) {
      this.handleUnselect(ids);
    } else {
      this.handleSelect(ids);
    }
  }

  handleSelect(id) {
    // no need to do type cast, node.id is required to be a string
    const records = this.findRecords(flatten([id]));
    const decoratedRecords = records.map(r => (
      Object.assign({}, r, { selected: true })
    ));

    const nextSelected = Merger.run(this.props.selected,
                                    this.withAncestors(decoratedRecords),
                                    { idKey: this.props.idKey, overrideKey: 'selected' });
    this.props.onOverrideSelected(nextSelected);
  }

  handleUnselect(id) {
    // no need to do type cast, node.id is required to be a string
    const nextSelected = Rejecter.run(this.props.selected, (r) => {
      const isolated = !r.selected && (!r.children || r.children.length === 0);
      return flatten([id]).includes(r[this.props.idKey]) || isolated;
    }, { childKey: 'children', idKey: this.props.idKey });
    this.props.onOverrideSelected(nextSelected);
  }

  handleUpload({ currentTarget }) {
    this.props.onUpload(currentTarget.files[0]);
  }

  handleUnSelectAll(callback) {
    return () => this.props.onUnselectAllConfirm(callback)
  }

  render() {
    return (
      <div className="row-gapless">
        <Selector
          text={this.props.text}

          progressBar={this.props.progressBar}

          dataSource={this.props.dataSource}
          ancestors={this.props.ancestors}
          query={this.props.query}

          onToggle={this.handleToggle}
          onQuery={this.handleQuery}
          onUpload={this.handleUpload}

          isSelected={this.isSelected}
        />

        <Panel
          text={this.props.text}

          selected={this.props.selected}
          reserved={this.props.reserved}

          onUnselectAll={this.handleUnSelectAll}
          onUnselect={this.handleUnselect}
        />
      </div>
    );
  }
}

SelectorWithPanel.propTypes = {
  idKey: PropTypes.string,

  text: PropTypes.shape({
    leftTitle: PropTypes.string,
    leftEmpty: PropTypes.string,
    rightTitle: PropTypes.string,
    rightEmpty: PropTypes.string,
    placeholder: PropTypes.string,
  }),

  dataSource: PropTypes.arrayOf(nodeSchema),
  selected: PropTypes.arrayOf(nodeSchema),
  reserved: PropTypes.arrayOf(nodeSchema),
  ancestors: PropTypes.arrayOf(nodeSchema),
  progressBar: PropTypes.node,

  query: PropTypes.shape({
    keyword: PropTypes.string,
    offset: PropTypes.number,
    limit: PropTypes.number,
    order: PropTypes.string,
    total: PropTypes.number,
    parent_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),

  onUnselectAllConfirm: PropTypes.func,
  onUpload: PropTypes.func,
  onQuery: PropTypes.func,
  onOverrideSelected: PropTypes.func,
  onOverrideAncestors: PropTypes.func
};

SelectorWithPanel.defaultProps = {
  idKey: 'prop_id',
  dataSource: [],
  selected: [],
  reserved: [],
  ancestors: []
};

SelectorWithPanel.childContextTypes = {
  idKey: PropTypes.string
};

export default SelectorWithPanel;