'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _iframeResizer = require('iframe-resizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoResizeIframe = function (_Component) {
  _inherits(AutoResizeIframe, _Component);

  function AutoResizeIframe(props) {
    _classCallCheck(this, AutoResizeIframe);

    var _this = _possibleConstructorReturn(this, (AutoResizeIframe.__proto__ || Object.getPrototypeOf(AutoResizeIframe)).call(this, props));

    _this.id = 'auto-resize-iframe-' + Math.floor(Math.random() * 10000);
    return _this;
  }

  _createClass(AutoResizeIframe, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var instances = (0, _iframeResizer.iframeResizer)({
        checkOrigin: false,
        initCallback: function initCallback(iframe) {
          iframe.style.height = 0; // Chrome & FF cannot calcuate hidden iframe height correctly
        },
        resizedCallback: function resizedCallback(_ref) {
          var iframe = _ref.iframe,
              height = _ref.height,
              width = _ref.width,
              type = _ref.type;

          iframe.style.height = Number.parseInt(height, 10) + 20 + 'px';
        }
      }, '#' + this.id);

      this.instance = instances[0];
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.show && nextProps.show) {
        this.instance.iFrameResizer.resize();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.instance.iFrameResizer.close();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('iframe', { ref: 'iframe', id: this.id, className: 'panel-body', src: this.props.src, scrolling: 'no' });
    }
  }]);

  return AutoResizeIframe;
}(_react.Component);

exports.default = AutoResizeIframe;
module.exports = exports['default'];