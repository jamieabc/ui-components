'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _NestedBlock = require('./NestedBlock');

var _NestedBlock2 = _interopRequireDefault(_NestedBlock);

var _Node = require('../Schema/Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderBlocks(collection, onRemove) {
  if (!collection.length) {
    return null;
  }

  return _react2.default.createElement(_NestedBlock2.default, {
    dataSource: collection,
    onRemove: onRemove
  });
}

var SelectedPanel = function SelectedPanel(props, context) {
  var decoratedReserved = props.reserved.map(function (r) {
    return Object.assign({}, r, { reserved: true });
  });
  var collection = decoratedReserved.concat(props.selected);
  var selectedBlocks = renderBlocks(collection, props.onUnselect);
  var emptyText = function () {
    if (selectedBlocks) {
      return null;
    }

    return _react2.default.createElement(
      'div',
      { className: 'panel-body picked-items picked-items__height-breadcrumb' },
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
    _i18next2.default.t('placement:::form::category::Remove All')
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
    selectedBlocks
  );
};

SelectedPanel.propTypes = {
  text: _react.PropTypes.shape({
    rightEmpty: _react.PropTypes.string,
    rightTitle: _react.PropTypes.string
  }),

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
  idKey: _react.PropTypes.string
};

exports.default = SelectedPanel;
module.exports = exports['default'];