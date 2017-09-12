import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BsAccordion from 'react-bootstrap/lib/Accordion';
import Collapse from 'react-bootstrap/lib/Collapse';
import CloseButton from './CloseButton';
import AutoResizeIframe from '../../../AutoResizeIframe';

// props.expanded & props.onSelect is brought by BsAccordion
const Row = (props) => {
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

      <Collapse in={props.expanded}>
        <div>
          <AutoResizeIframe show={props.expanded} src={r.detailSrc} />
        </div>
      </Collapse>
    </div>
  )
}

const Accordion = (props, context) => {
  return (
    <div className="picked-items picked-items__height-breadcrumb">
      <BsAccordion>
        {props.dataSource.map((r, i) => <Row eventKey={i} r={r} key={i} onRemove={() => { props.onRemove(r[context.idKey]) }} />)}
      </BsAccordion>
    </div>
  );
}

Accordion.contextTypes = {
  idKey: PropTypes.string
};

export default Accordion;
