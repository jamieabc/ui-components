import React, { PropTypes } from 'react';
import classNames from 'classnames';

import nodeSchema from '../Schema/Node';
import LinkOrText from './LinkOrText';

const SelectorBreadcrumb = (props, context) =>{
  const homeActive = props.path.length > 0;

  const home = (
    <li
      className={classNames(['bc__fullview', { active: homeActive }])}
    >
      <LinkOrText
        onClick={() => homeActive && props.onClick({ parent_id: null })}
        r={{ name: <i className="fa fa-home"></i>, clickable: homeActive }}
      />
    </li>
  );

  const others = props.path.map((r, i) => {
    const lastOne = i === (props.path.length - 1);

    return (
      <li
        key={i}
        className={classNames({ active: !lastOne })}
        title={r.name}
      >
        <LinkOrText
          onClick={() => !lastOne && props.onClick({ parent_id: r[context.idKey] })}
          r={{ name: r.name, clickable: !lastOne }}
        />
      </li>
    );
  })

  return (
    <ol className="breadcrumb">
      {home}
      {others}
    </ol>
  );
}

SelectorBreadcrumb.propTypes = {
  path: PropTypes.arrayOf(nodeSchema),
  onClick: PropTypes.func
}

SelectorBreadcrumb.defaultProps = {
  path: []
};

SelectorBreadcrumb.contextTypes = {
  idKey: PropTypes.string
};

export default SelectorBreadcrumb;
