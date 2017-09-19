import React, { Component } from 'react';
import differenceBy from 'lodash/differenceBy';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BsAccordion from 'react-bootstrap/lib/Accordion';
import Collapse from 'react-bootstrap/lib/Collapse';
import CloseButton from './CloseButton';
import AutoResizeIframe from '../../../AutoResizeIframe';

// props.expanded & props.onSelect is brought by BsAccordion
class Row extends Component {
  resizeIframe = () => {
    this.refs.iframe.resize();
  }

  render() {
    const props = this.props;
    const r = props.r;
    const klassNames = classNames([
      'panel', 'panel-callout',
      { 'panel-success': r.selected === 'included',
        'panel-danger': r.selected === 'excluded' }
    ])

    return (
      <div className={klassNames}>
        <div className="panel-heading folding">
          <CloseButton onClick={props.onRemove} />
          <a aria-expanded={props.expanded ? 'true' : 'false'} onClick={(e) => props.onSelect(props.eventKey, e)}>
            {r.name}
          </a>
        </div>

        <Collapse in={props.expanded} onEntered={this.resizeIframe}>
          <div>
            <AutoResizeIframe ref="iframe" src={r.detailSrc} />
          </div>
        </Collapse>
      </div>
    )
  }
}

class Accordion extends Component {
  constructor() {
    super();
    this.state = {
      activeKey: null
    };
  }

  handleSelect = key => {
    this.setState({activeKey: key});
  }

  componentWillReceiveProps(nextProps) {
    const newActiveKey = (() => {
      if (nextProps.dataSource.length <= this.props.dataSource.length) {
        return null;
      }
      const newItems = differenceBy(nextProps.dataSource, this.props.dataSource, this.context.idKey);
      return newItems[0] ? newItems[0][this.context.idKey] : null;
    })();
    if (newActiveKey && this.state.activeKey !== newActiveKey) {
      this.setState({activeKey: newActiveKey});
    }
  }

  render() {
    const style = this.props.dataSource.length ? {} : { display: 'none' };
    return (
        <div className="picked-items picked-items__height-breadcrumb" style={style}>
        <BsAccordion onSelect={this.handleSelect} activeKey={this.state.activeKey}>
          {this.props.dataSource.map((r) => {
            const key = r[this.context.idKey];
            return <Row eventKey={key} r={r} key={key} onRemove={() => { this.props.onRemove(key) }} />;
          })}
        </BsAccordion>
      </div>
    );
  }
}

Accordion.contextTypes = {
  idKey: PropTypes.string
};

export default Accordion;
