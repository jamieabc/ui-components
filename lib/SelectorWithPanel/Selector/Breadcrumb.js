'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Node = require('../Schema/Node');

var _Node2 = _interopRequireDefault(_Node);

var _LinkOrText = require('./LinkOrText');

var _LinkOrText2 = _interopRequireDefault(_LinkOrText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectorBreadcrumb = function SelectorBreadcrumb(props, context) {
  var homeActive = props.path.length > 0;

  var home = _react2.default.createElement(
    'li',
    {
      className: (0, _classnames2.default)(['bc__fullview', { active: homeActive }])
    },
    _react2.default.createElement(_LinkOrText2.default, {
      onClick: function onClick() {
        return homeActive && props.onClick({ parent_id: null });
      },
      r: { name: _react2.default.createElement('i', { className: 'fa fa-home' }), clickable: homeActive }
    })
  );

  var others = props.path.map(function (r, i) {
    var lastOne = i === props.path.length - 1;

    return _react2.default.createElement(
      'li',
      {
        key: i,
        className: (0, _classnames2.default)({ active: !lastOne }),
        title: r.name
      },
      _react2.default.createElement(_LinkOrText2.default, {
        onClick: function onClick() {
          return !lastOne && props.onClick({ parent_id: r[context.idKey] });
        },
        r: { name: r.name, clickable: !lastOne }
      })
    );
  });

  return _react2.default.createElement(
    'ol',
    { className: 'breadcrumb' },
    home,
    others
  );
};

SelectorBreadcrumb.propTypes = {
  path: _react.PropTypes.arrayOf(_Node2.default),
  onClick: _react.PropTypes.func
};

SelectorBreadcrumb.defaultProps = {
  path: []
};

SelectorBreadcrumb.contextTypes = {
  idKey: _react.PropTypes.string
};

exports.default = SelectorBreadcrumb;
module.exports = exports['default'];