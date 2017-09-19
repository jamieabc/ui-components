'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _differenceBy = require('lodash/differenceBy');

var _differenceBy2 = _interopRequireDefault(_differenceBy);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// props.expanded & props.onSelect is brought by BsAccordion
var Row = function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Row);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Row.__proto__ || Object.getPrototypeOf(Row)).call.apply(_ref, [this].concat(args))), _this), _this.resizeIframe = function () {
      _this.refs.iframe.resize();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Row, [{
    key: 'render',
    value: function render() {
      var props = this.props;
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
          { 'in': props.expanded, onEntered: this.resizeIframe },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_AutoResizeIframe2.default, { ref: 'iframe', src: r.detailSrc })
          )
        )
      );
    }
  }]);

  return Row;
}(_react.Component);

var Accordion = function (_Component2) {
  _inherits(Accordion, _Component2);

  function Accordion() {
    _classCallCheck(this, Accordion);

    var _this2 = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this));

    _this2.handleSelect = function (key) {
      _this2.setState({ activeKey: key });
    };

    _this2.state = {
      activeKey: null
    };
    return _this2;
  }

  _createClass(Accordion, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var newActiveKey = function () {
        if (nextProps.dataSource.length <= _this3.props.dataSource.length) {
          return null;
        }
        var newItems = (0, _differenceBy2.default)(nextProps.dataSource, _this3.props.dataSource, _this3.context.idKey);
        return newItems[0] ? newItems[0][_this3.context.idKey] : null;
      }();
      if (newActiveKey && this.state.activeKey !== newActiveKey) {
        this.setState({ activeKey: newActiveKey });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'picked-items picked-items__height-breadcrumb' },
        _react2.default.createElement(
          _Accordion2.default,
          { onSelect: this.handleSelect, activeKey: this.state.activeKey },
          this.props.dataSource.map(function (r) {
            var key = r[_this4.context.idKey];
            return _react2.default.createElement(Row, { eventKey: key, r: r, key: key, onRemove: function onRemove() {
                _this4.props.onRemove(key);
              } });
          })
        )
      );
    }
  }]);

  return Accordion;
}(_react.Component);

Accordion.contextTypes = {
  idKey: _propTypes2.default.string
};

exports.default = Accordion;
module.exports = exports['default'];