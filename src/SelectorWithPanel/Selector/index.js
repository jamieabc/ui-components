import React, { PropTypes } from 'react';
import i18n from 'i18next';
import SearchBox from 'ui-components/lib/SearchBox';
import DataTable, { Pagination } from 'ui-components/lib/DataTable';
import Helpers from '../../utils/Helpers';
import classNames from 'classnames';

import Breadcrumb from './Breadcrumb';
import LinkOrText from './LinkOrText';
import nodeSchema from '../Schema/Node';

function columns(props, context) {
  const allChecked = props.dataSource.length > 0 &&
                     props.dataSource.every(d => props.isSelected(d[context.idKey]));
  const ancestorChecked = allChecked && props.dataSource.length > 0 &&
                          props.dataSource.every(d => !props.isSelected(d[context.idKey], { strict: true }));

  return [
    {
      name: 'checkbox',
      width: 30,
      sortable: false,
      textAlign: 'center',
      title: (
        <CheckBox
          checked={allChecked}
          disabled={ancestorChecked}
          onClick={() => !ancestorChecked && props.onToggle(props.dataSource.map(e => e[context.idKey]), allChecked)}
        />
      ),
      render: (ignored, r) => {
        const selected = props.isSelected(r[context.idKey]);
        const disabled = selected && !props.isSelected(r[context.idKey], { strict: true });

        // disable the checkbox when its ancestor selected
        return (
          <CheckBox
            checked={selected}
            disabled={disabled}
            onClick={() => !disabled && props.onToggle(r[context.idKey], selected)}
          />
        )
      }
    },
    {
      name: 'name', title: i18n.t('common:::Name'),
      render: (ignored, r) => <LinkOrText r={r} onClick={() => props.onQuery({ parent_id: r[context.idKey] })} />
    },
    { name: 'prop_id', title: 'ID', defaultWidth: 100, textAlign: 'center' }
  ];
}

const CheckBox = ({ checked, onClick, disabled }) => {
  const cls = classNames('fa fa-check-circle fa-lg',
                         { 'text-success': checked, 'disabled': disabled });
  return (
    <i className={cls} onClick={onClick} />
  );
}

const Selector = (props, context) => {
  return (
    <div className="panel panel-default pick-panel col-xs-6">
      <div className="panel-heading">
        <button className="btn btn-default btn-fileUpload btn-sm pull-right h5__pull-right">
          {i18n.t('common:::Update List')}
          <input type="file" onChange={props.onUpload} onClick={(e) => e.target.value = null} />
          {props.progressBar}
        </button>

        <strong>{props.text.leftTitle}</strong>
      </div>

      <div className="panel-body">
        <SearchBox
          keyword={props.query.keyword}
          placeholder={props.text.placeholder}
          handleQueryChange={props.onQuery}
        />
      </div>

      <Breadcrumb path={props.ancestors} onClick={props.onQuery} />

      <div className="item-to-pick">
        <DataTable
          dataSource={props.dataSource}
          columns={columns(props, context)}
          sortInfo={Helpers.arrayifySort(props.query.order)}
          pager={false}
          onPageChange={props.onQuery}
          selectable={false}
          style={{ height: 30 * 10 + 36 }}
          wrapperClassName="table-bordered"
          emptyText={props.text.leftEmpty}
          scrollbarSize={0}
          focusable={false}
        />
      </div>

      <div className="panel-footer text-right">
        <Pagination
          offset={props.query.offset}
          limit={props.query.limit}
          total={props.query.total}
          onPageChange={props.onQuery}
          pageSizes={false}
        />
      </div>
    </div>
  );
};

Selector.CheckBox = CheckBox;
Selector.LinkOrText = LinkOrText;

Selector.propTypes = {
  text: PropTypes.shape({
    leftTitle: PropTypes.string,
    leftEmpty: PropTypes.string,
    placeholder: PropTypes.string,
  }),

  progressBar: PropTypes.node,
  dataSource: PropTypes.arrayOf(nodeSchema),
  ancestors: PropTypes.arrayOf(nodeSchema),

  query: PropTypes.shape({
    keyword: PropTypes.string,
    offset: PropTypes.number,
    limit: PropTypes.number,
    total: PropTypes.number,
    order: PropTypes.string,
  }),

  onToggle: PropTypes.func,
  onQuery: PropTypes.func,
  onUpload: PropTypes.func,
  isSelected: PropTypes.func
};

Selector.defaultProps = {
  ancestors: [],
  dataSource: [],

  text: {},
  query: {
    keyword: null,
    offset: 0,
    limit: 10,
    total: 0,
    order: 'name,asc',
  }
};

Selector.contextTypes = {
  idKey: PropTypes.string
};

export default Selector;
