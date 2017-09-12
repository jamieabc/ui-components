'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

var _Helpers = require('../utils/Helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgressBar = function (_Component) {
  _inherits(ProgressBar, _Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

    _this.store = props.store;
    _this.state = { start: false, done: false };
    _this.getTemplate = _this.getTemplate.bind(_this);

    _this.onChange = function () {
      if (_this.store.getState(_this.props.id).done && !_this.state.done && _this.state.start) {
        _nprogress2.default.configure({ parent: '#' + _this.refs.wrapper.id });
        _nprogress2.default.done(_this.props.id);
        return setTimeout(function () {
          return _this.setState({ start: false, done: true });
        }, 500);
      }
      if (_this.store.getState(_this.props.id).start && !_this.state.start) {
        _nprogress2.default.configure({ parent: '#' + _this.refs.wrapper.id });
        return _this.setState({ start: true, done: false }, function () {
          return _nprogress2.default.start(_this.props.id);
        });
      }
    };
    return _this;
  }

  _createClass(ProgressBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.store.addChangeListener(this.onChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.id !== nextProps.id) {
        this.store.reset(nextProps.id);

        _nprogress2.default.configure({
          speed: 300,
          showSpinner: false,
          template: this.getTemplate(),
          minimum: 0.12
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.store.removeChangeListener(this.onChange);
    }
  }, {
    key: 'getTemplate',
    value: function getTemplate() {
      return ['<div class="bar progress-bar progress-bar-striped active" role="bar">', '<div class="peg"></div>', "</div>"].join('');
    }
  }, {
    key: 'render',
    value: function render() {
      var id = 'progress-' + this.props.id;

      return _react2.default.createElement('div', _extends({
        className: 'progress nprogress-custom-parent',
        ref: 'wrapper',
        style: { display: this.state.start ? 'block' : 'none' },
        id: id
      }, (0, _Helpers.t)(this.props.tagName)));
    }
  }]);

  return ProgressBar;
}(_react.Component);

ProgressBar.propTypes = {
  tagName: _react.PropTypes.string,
  id: _react.PropTypes.number
};

ProgressBar.defaultProps = {
  tagName: ''
};

exports.default = ProgressBar;
module.exports = exports['default'];