'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BlockList = require('./BlockList');

var _BlockList2 = _interopRequireDefault(_BlockList);

var _Node = require('../Schema/Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectedPanel = function SelectedPanel(props, context) {
  var decoratedReserved = props.reserved.map(function (r) {
    return Object.assign({}, r, { reserved: true });
  });
  var collection = decoratedReserved.concat(props.selected);
  var emptyText = function () {
    if (collection.length) {
      return null;
    }
    var klassNames = (0, _classnames2.default)(['panel-body', 'picked-items', { 'picked-items__height-breadcrumb': !context.noBreadcrumb,
      'picked-items__height-default': context.noBreadcrumb }]);

    return _react2.default.createElement(
      'div',
      { className: klassNames },
      props.text.rightEmpty
    );
  }();

  var removeAllBtn = props.selected.length ? _react2.default.createElement(
    'button',
    {
      onClick: props.onUnselectAll(function () {
        return props.onUnselect(props.selected.map(function (s) {
          return s[context.idKey];
        }));
      }),
      className: 'btn btn-default btn-sm pull-right'
    },
    props.text.rightRemoveAll
  ) : null;

  return _react2.default.createElement(
    'div',
    { className: 'panel panel-default pick-panel col-xs-6' },
    _react2.default.createElement(
      'div',
      { className: 'panel-heading' },
      removeAllBtn,
      _react2.default.createElement(
        'strong',
        null,
        props.text.rightTitle
      )
    ),
    emptyText,
    _react2.default.createElement(_BlockList2.default, {
      collection: collection,
      style: props.style,
      onRemove: props.onUnselect,
      text: props.text
    })
  );
};

SelectedPanel.propTypes = {
  text: _react.PropTypes.shape({
    rightEmpty: _react.PropTypes.string,
    rightTitle: _react.PropTypes.string,
    rightRemoveAll: _react.PropTypes.string
  }),
  style: _react.PropTypes.oneOf(['nested', 'accordion']),

  selected: _react.PropTypes.arrayOf(_Node2.default),
  reserved: _react.PropTypes.arrayOf(_Node2.default),
  onUnselectAll: _react.PropTypes.func,
  onUnselect: _react.PropTypes.func
};

SelectedPanel.defaultProps = {
  reserved: [],
  selected: [],
  text: {},
  onUnselectAll: function onUnselectAll(callback) {
    return callback;
  }
};

SelectedPanel.contextTypes = {
  idKey: _react.PropTypes.string,
  noBreadcrumb: _react.PropTypes.bool
};

exports.default = SelectedPanel;
module.exports = exports['default'];