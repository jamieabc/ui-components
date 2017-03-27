import assign from 'lodash/object/assign';
import sortByOrder from 'lodash/collection/sortByOrder';
import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Helpers from '../utils/Helpers';
import DataTable, { Pagination } from '../DataTable';

// dialog for action, contain datatable
class ActionDialog extends Component{
  constructor(props) {
    super(props);
    this.state = {
      offset: props.offset,
      limit: props.limit,
      order: props.order
    };

    this.handlePageChange = (newQuery) => {
      const query = assign({}, this.state, newQuery);
      this.setState(query);
    };

    this.getData = (offset, limit, orderStr) => {
      const order = Helpers.arrayifySort(orderStr)[0];
      return sortByOrder(this.props.dataSource, order.name, order.dir).slice(offset, offset + limit);
    };
  }

  // 15*2: modal body padding
  // 45: head 25+10*2(padding)
  // 33: table head 32 + 1
  // 58: table pagination 56 + 2
  // 20: table margin bottom
  // 57: Warning 42 + 15 padding
  render() {
    const pageDataSource = this.getData(this.state.offset, this.state.limit, this.state.order);
    let maxHeight = 15 * 2 + 45 + 33 + (this.props.rowHeight || 31) * pageDataSource.length + 58 + 20;
    if (this.props.warning) {
      maxHeight += 57;
    }

    const scrollbarSize = (() => {
      if (!this.props.maxRowCount) { return 0; }

      return this.props.maxRowCount < pageDataSource.length ? 20 : 0;
    })();
    const rowCount = scrollbarSize > 0 ? this.props.maxRowCount : pageDataSource.length;

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        backdrop="static"
        animation={false}
        bsSize={this.props.bsSize}
        dialogClassName={this.props.dialogClassName}
      >
        <Modal.Header closeButton bsClass={this.props.headerClassName}>
          <Modal.Title bsClass={this.props.titleClassName}>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body bsClass={this.props.bodyClassName} style={assign({}, this.props.bodyStyle, {maxHeight: maxHeight})}>
          {this.props.warning}
          {this.props.childPosition === 'top' ? this.props.children : null}
          <div className="panel panel-default">
            <DataTable
              offset={this.state.offset}
              limit={this.state.limit}
              total={this.props.dataSource.length}
              dataSource={pageDataSource}
              onPageChange={this.handlePageChange}
              columns={this.props.columns}
              sortInfo={Helpers.arrayifySort(this.state.order)}
              selectable={false}
              resizableColumns={false}
              pager={false}
              style={{height: (this.props.rowHeight || 30) * rowCount + 30}}
              scrollbarSize={scrollbarSize}
              rowHeight={this.props.rowHeight}
            />
            {this.props.pager && (
               <div className="panel-footer text-right">
                 <Pagination
                    offset={this.state.offset}
                    limit={this.state.limit}
                    total={this.props.dataSource.length}
                    onPageChange={this.handlePageChange}
                    pageSizes={false}
                 />
               </div>)}
          </div>
          {this.props.childPosition === 'bottom' ? this.props.children : null}
        </Modal.Body>
        <Modal.Footer bsClass={this.props.footerClassName}>
          { this.props.hasCancelButton ? <Button data-dismiss="modal" onClick={this.props.onHide}>{this.props.cancelText}</Button> : null}
          <Button bsStyle="primary" data-dismiss="modal" onClick={this.props.onSubmit}>{this.props.submitText}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ActionDialog.propTypes = {
  show: PropTypes.bool.isRequired, // Trigger
  offset: PropTypes.number, // Offset params for calculate pagination staffs.
  limit: PropTypes.number, // Page size
  order: PropTypes.string, // Sort info
  title: PropTypes.node.isRequired, // Modal title
  warning: PropTypes.node, // Modal warning
  columns: PropTypes.array.isRequired, // Columns
  dataSource: PropTypes.array.isRequired, // Data
  onHide: PropTypes.func.isRequired, // Function for close dialog
  onSubmit: PropTypes.func.isRequired, // Function for click OK button
  cancelText: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  dialogClassName: PropTypes.string, // Modal dialogClassName
  bodyStyle: PropTypes.object, // Modal body style
  hasCancelButton: PropTypes.bool, // Set to false to remove Cancel Button
  headerClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  footerClassName: PropTypes.string,
  bsSize: PropTypes.string,
  rowHeight: PropTypes.number,
  childPosition: PropTypes.string,
  pager: PropTypes.bool,
  maxHeight: PropTypes.number
};

ActionDialog.defaultProps = {
  offset: 0,
  limit: 10,
  order: 'id,desc',
  warning: '',
  hasCancelButton: true,
  dialogClassName: '',
  headerClassName: 'modal-header',
  titleClassName: 'modal-title',
  bodyClassName: 'modal-body',
  footerClassName: 'modal-footer',
  bsSize: 'medium',
  bodyStyle: {},
  childPosition: 'top',
  pager: true
};

export default ActionDialog;
