'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Accordion = require('react-bootstrap/lib/Accordion');

var _Accordion2 = _interopRequireDefault(_Accordion);

var _Collapse = require('react-bootstrap/lib/Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var _CloseButton = require('./CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _AutoResizeIframe = require('../../../AutoResizeIframe');

var _AutoResizeIframe2 = _interopRequireDefault(_AutoResizeIframe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// props.expanded & props.onSelect is brought by BsAccordion
var Row = function Row(props) {
  var r = props.r;
  var klassNames = (0, _classnames2.default)(['panel', 'panel-callout', { 'panel-success': r.selected === 'included',
    'panel-danger': r.selected === 'excluded' }]);

  return _react2.default.createElement(
    'div',
    { className: klassNames },
    _react2.default.createElement(
      'div',
      { className: 'panel-heading folding' },
      _react2.default.createElement(_CloseButton2.default, { onClick: props.onRemove }),
      _react2.default.createElement(
        'a',
        { 'aria-expanded': props.expanded ? 'true' : 'false', onClick: function onClick(e) {
            return props.onSelect(props.eventKey, e);
          } },
        r.name
      )
    ),
    _react2.default.createElement(
      _Collapse2.default,
      { 'in': props.expanded },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_AutoResizeIframe2.default, { show: props.expanded, src: r.detailSrc })
      )
    )
  );
};

var Accordion = function Accordion(props, context) {
  return _react2.default.createElement(
    'div',
    { className: 'picked-items picked-items__height-breadcrumb' },
    _react2.default.createElement(
      _Accordion2.default,
      null,
      props.dataSource.map(function (r, i) {
        return _react2.default.createElement(Row, { eventKey: i, r: r, key: i, onRemove: function onRemove() {
            props.onRemove(r[context.idKey]);
          } });
      })
    )
  );
};

Accordion.contextTypes = {
  idKey: _propTypes2.default.string
};

exports.default = Accordion;
module.exports = exports['default'];