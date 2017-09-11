import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Selector from '../SelectorWithPanel';
import LinkOrText from '../SelectorWithPanel/Selector/LinkOrText';
import StrategyFactory from './Strategies';

const CheckBox = ({ checked, disabled, excluded, onChange }) => {
  const klassNames = classNames('fa fa-lg cursor-pointer',
                                { 'text-success': !excluded && checked, 'disabled': disabled,
                                  'text-danger': excluded && checked,
                                  'fa-check-circle': !excluded, 'fa-minus-circle': excluded });

  return <i onClick={onChange} className={klassNames}></i>
}

class RuleMaker extends Component {
  // TODO: The function is so massive...
  getColumns(columns, dataSource) {
    return (props) => {
      const factory = (name) => {
        const render = (ignored, r) => {
          const checked = r.selected === name;
          const disabled = r.disabled && r.disabled.includes(name);

          return (
            <CheckBox
              checked={checked}
              disabled={disabled}
              excluded={name === 'excluded'}
              onChange={() => !disabled && props.onToggle(r.id, checked, name)}
            />
          )
        };

        const isTitleChecked = dataSource.length > 0 && dataSource.every(s => s.selected === name);
        const isTitleDisabled = dataSource.every(s => s.disabled && s.disabled.includes(name));
        const onTitleChange = () => (
          !isTitleDisabled && props.onToggle(dataSource.map(r => r.id), isTitleChecked, name)
        );
        const title = (
          <CheckBox
            checked={isTitleChecked}
            disabled={isTitleDisabled}
            excluded={name === 'excluded'}
            onChange={onTitleChange}
          />
        );

        return {
          name,
          width: 30,
          sortable: false,
          textAlign: 'center',
          title,
          render
        }
      };

      const decoratedColumns = columns.map((c) => {
        if (!c.expandable) { return c; }

        return Object.assign({}, c,
                             { render: (ignored, r) => (
                               <LinkOrText
                                 r={r}
                                 name={c.name}
                                 onClick={() => props.onQuery({ parent_id: r.id })}
                               />)
                             });
      });

      return [factory('included'), factory('excluded')].concat(decoratedColumns);
    }
  }

  getDataSource() {
    const sRunner = StrategyFactory.prepare(this.props.strategies, this.props);
    return sRunner.build(this.props.dataSource);
  }

  render() {
    const dataSource = this.getDataSource();

    return (
      <Selector
        idKey="id"
        rowHeight={this.props.rowHeight}
        selectedPanelStyle={this.props.selectedPanelStyle}

        text={this.props.text}
        ancestors={this.props.ancestors}
        selected={this.props.selected}

        columnFactory={this.getColumns(this.props.columns, dataSource)}
        dataSource={dataSource}
        query={this.props.query}

        onInflate={this.props.onInflate}
        onUnselectAllConfirm={this.props.onUnselectAllConfirm}
        onQuery={this.props.onQuery}
        onOverrideSelected={this.props.onOverrideSelected}
        onOverrideAncestors={this.props.onOverrideAncestors}
      />)

  }
}

RuleMaker.CheckBox = CheckBox;

RuleMaker.propTypes = {
  text: Selector.propTypes.text,
  ancestors: Selector.propTypes.ancestors,
  onUnselectAllConfirm: Selector.propTypes.onUnselectAllConfirm,
  onQuery: Selector.propTypes.onQuery,
  onOverrideSelected: Selector.propTypes.onOverrideSelected,
  onOverrideAncestors: Selector.propTypes.onOverrideAncestors,
  onInflate: Selector.propTypes.onInflate,
  selectedPanelStyle: Selector.propTypes.selectedPanelStyle,

  strategies: PropTypes.array, // the order of this field matters
  columns: PropTypes.array, // datagrid format
  dataSource: PropTypes.array,
  query: PropTypes.object,

  selected: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selected: PropTypes.oneOf(['included', 'excluded', undefined, null]),
    children: PropTypes.array
  }))
}

RuleMaker.defaultProps = {
  columns: [],
  dataSource: [],
  selected: [],
  strategies: ['basic', 'inheritance'],
  selectedPanelStyle: 'nested'
}

export default RuleMaker;
