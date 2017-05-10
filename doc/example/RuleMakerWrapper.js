import React, { Component } from 'react';
import i18n from 'i18next';

import RuleMaker from 'ui-components/lib/RuleMaker';

const DATA_SOURCE = [
  { id: 1, name: 'China', x: 'HARD', expandable: true },
  { id: 2, name: 'U.S.', x: 'NORMAL' },
  { id: 3, name: 'Europe', x: 'EASY' },
  { id: 11, parent_id: 1, name: 'Anhui' },
  { id: 12, parent_id: 1, name: 'Hebei' },
  { id: 13, parent_id: 1, name: 'Shanxi' },
  { id: 14, parent_id: 1, name: 'Shandong', expandable: true },
  { id: 15, parent_id: 1, name: 'Beijing', expandable: true },
  { id: 16, parent_id: 1, name: 'Tianjin' },
  { id: 17, parent_id: 1, name: 'Henan' },
  { id: 18, parent_id: 1, name: 'Hainan' },
  { id: 19, parent_id: 1, name: 'Jiangxi' },
  { id: 10, parent_id: 1, name: 'Shanxi' },
  { id: 101, parent_id: 1, name: 'Chengdu' },
  { id: 102, parent_id: 1, name: 'Chongqing' },
  { id: 103, parent_id: 1, name: 'Yunan' },
  { id: 104, parent_id: 1, name: 'Guangxi' },
  { id: 141, parent_id: 14, name: 'Blueshit' },
  { id: 151, parent_id: 15, name: 'Geekpark' },
];

class RuleMakerWrapper.js extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: [],
      dataSource: DATA_SOURCE.filter(r => !r.parent_id),
      query: {
        keyword: null,
        offset: 0,
        limit: 10,
        order: 'name,asc',
        total: 0,
        except_ids: []
      },
      ancestors: [],
      columns: [
        { name: 'name', title: i18n.t('common:::NameX'), expandable: true },
        { name: 'id', title: i18n.t('common:::IDX'),
          render: (ignored, r) => `${r.platformID}-${r.id}` },
        { name: 'x', title: i18n.t('common:::XY') }
      ]
    };

    this.handleOverrideSelected = this.handleOverrideSelected.bind(this);
    this.handleOverrideAncestors = this.handleOverrideAncestors.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleUnselectAllConfirm = this.handleUnselectAllConfirm.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
  }

  buildQuery(params) {
    const prevState = this.state

    return Object.assign({}, prevState.query, params);
  }

  getColumns(parent_id) {
    if (parent_id) {
      return [{ name: 'name', title: i18n.t('common:::NameX'), expandable: true }]
    }

    return [
      { name: 'name', title: i18n.t('common:::NameX'), expandable: true },
      { name: 'id', title: i18n.t('common:::IDX'),
        render: (ignored, r) => `${r.platformID}-${r.id}` },
      { name: 'x', title: i18n.t('common:::XY') }
    ]
  }

  handleUnselectAllConfirm(...args) {
    this.setState({ selected: [] })
  }

  handleOverrideSelected(nextSelected) {
    this.setState({ selected: nextSelected });
  }

  handleOverrideAncestors(nextAncestors) {
    this.setState({ ancestors: nextAncestors });
  }

  handleQuery(params) {
    console.log(params);
    if (params.hasOwnProperty('parent_id')) {
      /* eslint-disable eqeqeq */
      const dataSource = DATA_SOURCE.filter(r => r.parent_id == params.parent_id);
      const columns = this.getColumns(params.parent_id);
      const query = this.buildQuery({ total: dataSource.length });
      /* eslint-enable eqeqeq */
      return this.setState({ dataSource, columns, query })
    }

    if (params.hasOwnProperty('offset')) {
      this.setState((prevState) => {
        const dataSource = prevState.dataSource.slice(params.offset, params.offset + 10);
        return { dataSource }
      });
    }

    this.setState((prevState) => {
      const nextQuery = Object.assign({}, prevState.query, params);
      return Object.assign({}, prevState, { query: nextQuery });
    });
  }

  render() {
    return (
      <RuleMaker
        text={{
          leftTitle: i18n.t("placement:::form::Custom Categories"),
          leftEmpty: i18n.t("placement:::form::No Records"),
          rightTitle: i18n.t("placement:::form::Selected Custom Categories"),
          rightEmpty: i18n.t("placement:::form::Any Custom Category"),
          placeholder: i18n.t("placement:::form::Search Categories"),
        }}

        columns={this.state.columns}
        ancestors={this.state.ancestors}
        query={this.state.query}
        dataSource={this.state.dataSource}
        selected={this.state.selected}
        strategies={['basic', 'inheritance', 'sibling']}

        onQuery={this.handleQuery}
        onOverrideSelected={this.handleOverrideSelected}
        onOverrideAncestors={this.handleOverrideAncestors}
        onUnselectAllConfirm={this.handleUnselectAllConfirm}
      />
    );
  }
}

export default RuleMakerWrapper.js;
