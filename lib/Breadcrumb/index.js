'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('react-router/lib/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Helpers = require('../utils/Helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadcrumbItem = function BreadcrumbItem(props) {
  return _react2.default.createElement(
    'li',
    props,
    props.children
  );
};

var HomeLink = function HomeLink(props) {
  if (props.text) {
    return props.children ? _react2.default.createElement(
      _Link2.default,
      { to: '/', title: props.title || props.text },
      props.text
    ) : _react2.default.createElement(
      'span',
      { title: props.title || props.text },
      props.text
    );
  }
  return _react2.default.createElement(
    _Link2.default,
    { to: '/' },
    _react2.default.createElement('i', { className: 'fa fa-home' })
  );
};

var HomeBreadcrumb = function HomeBreadcrumb(props) {
  return _react2.default.createElement(
    BreadcrumbItem,
    { className: props.text ? 'bc__fullview' : 'bc__home' },
    _react2.default.createElement(HomeLink, { text: props.text, children: props.children, title: props.title })
  );
};

var Breadcrumb = function Breadcrumb(props) {
  return _react2.default.createElement(
    'ol',
    _extends({ className: 'breadcrumb' }, (0, _Helpers.t)(props.tagName)),
    props.showHome && _react2.default.createElement(HomeBreadcrumb, {
      text: props.text,
      title: props.title,
      children: props.children
    }),
    props.children
  );
};

Breadcrumb.BreadcrumbItem = BreadcrumbItem;

Breadcrumb.propTypes = {
  tagName: _react.PropTypes.string,
  text: _react.PropTypes.string,
  title: _react.PropTypes.string,
  showHome: _react.PropTypes.bool
};

Breadcrumb.defaultProps = {
  tagName: '',
  showHome: true
};

exports.default = Breadcrumb;
module.exports = exports['default'];