'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  handleResizeH: function handleResizeH(topHeight, bottomHeight) {
    this.setState({
      preTopHeight: this.state.topHeight,
      preBottomHeight: this.state.bottomHeight,
      topHeight: topHeight,
      bottomHeight: bottomHeight,
      bottomOpened: bottomHeight > 0
    });
  },
  handleToggleH: function handleToggleH(visible) {
    var topHeight = this.initTopHeight,
        bottomHeight = 0;
    if (visible) {
      if (this.state.bottomHeight > 0) {
        bottomHeight = this.state.bottomHeight;
        topHeight = this.initTopHeight - this.state.bottomHeight;
      } else {
        bottomHeight = this.initbottomHeight;
        topHeight = this.initTopHeight - this.initbottomHeight;
      }
    }
    this.handleResizeH(topHeight, bottomHeight);
  },
  handleResizeV: function handleResizeV(leftWidth, rightWidth) {
    this.setState({
      preLeftWidth: this.state.leftWidth,
      preRightWidth: this.state.rightWidth,
      leftWidth: leftWidth,
      rightWidth: rightWidth,
      leftOpened: leftWidth > 0,
      rightOpened: rightWidth > 0
    });
  },
  handleToggleV: function handleToggleV(visible) {
    if (this.hiddenSide === 'right') {
      this.setState({
        preLeftWidth: this.state.leftWidth,
        preRightWidth: this.state.rightWidth,
        leftWidth: visible ? this.initLeftWidth : this.initLeftWidth + this.initRightWidth + this.initResizerVerticalWidth,
        rightWidth: visible ? this.initRightWidth : 0,
        rightOpened: visible,
        leftOpened: true
      });
    } else {
      this.setState({
        preLeftWidth: this.state.leftWidth,
        preRightWidth: this.state.rightWidth,
        leftWidth: visible ? this.initLeftWidth : 0,
        rightWidth: visible ? this.initRightWidth : this.initLeftWidth + this.initRightWidth,
        leftOpened: visible,
        rightOpened: true
      });
    }
  },
  bindWindowResizeHEvent: function bindWindowResizeHEvent(eventScope) {
    var _this = this;

    $(window).off('resize.' + eventScope).on('resize.' + eventScope, (0, _debounce2.default)(function () {
      // Update height with new DOM height
      _this.initTopHeight = _this.getInitTopHeight();
      _this.initBottomHeight = _this.getInitBottomHeight();
      _this.handleToggleH(_this.state.bottomOpened);
    }, 88));
  },
  bindWindowResizeVEvent: function bindWindowResizeVEvent(eventScope) {
    var _this2 = this;

    $(window).off('resize.' + eventScope).on('resize.' + eventScope, (0, _debounce2.default)(function () {
      // Update width with new DOM width
      _this2.initLeftWidth = _this2.getInitLeftWidth();
      _this2.initRightWidth = _this2.getInitRightWidth();
      if (_this2.hiddenSide === 'right') {
        _this2.handleToggleV(_this2.state.rightOpened);
      } else {
        _this2.handleToggleV(_this2.state.leftOpened);
      }
    }, 88));
  },
  unBindWindowResizeEvent: function unBindWindowResizeEvent(eventScope) {
    $(window).off('resize.' + eventScope);
  }
};
module.exports = exports['default'];