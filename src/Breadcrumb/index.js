import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import { t } from '../utils/Helpers';

const BreadcrumbItem = (props) => (
  <li {...props}>{props.children}</li>
);

const HomeLink = (props) => {
  if (props.text) {
    return props.children ? <Link to="/" title={props.title || props.text}>{props.text}</Link> : <span title={props.title || props.text}>{props.text}</span>
  }
  return <Link to="/"><i className="fa fa-home"></i></Link>;
};

const HomeBreadcrumb = (props) => {
  return (
    <BreadcrumbItem className={props.text ? 'bc__fullview' : 'bc__home'}>
      <HomeLink text={props.text} children={props.children} title={props.title}/>
    </BreadcrumbItem>
  );
};

const Breadcrumb = (props) => (
  <ol className="breadcrumb" {...t(props.tagName)}>
    {
      props.showHome &&
      <HomeBreadcrumb
        text={props.text}
        title={props.title}
        children={props.children}
      />
    }
    {props.children}
  </ol>
);

Breadcrumb.BreadcrumbItem = BreadcrumbItem;

Breadcrumb.propTypes = {
  tagName: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  showHome: PropTypes.bool
};

Breadcrumb.defaultProps = {
  tagName: '',
  showHome: true
}

export default Breadcrumb;
