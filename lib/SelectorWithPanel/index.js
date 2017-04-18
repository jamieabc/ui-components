'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flatten = require('lodash/array/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _Node = require('./Schema/Node');

var _Node2 = _interopRequireDefault(_Node);

var _Selector = require('./Selector');

var _Selector2 = _interopRequireDefault(_Selector);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _Merger = require('../utils/Merger');

var _Merger2 = _interopRequireDefault(_Merger);

var _Rejecter = require('../utils/Rejecter');

var _Rejecter2 = _interopRequireDefault(_Rejecter);

var _ObjectArray = require('../utils/ObjectArray');

var _ObjectArray2 = _interopRequireDefault(_ObjectArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectorWithPanel = function (_Component) {
  _inherits(SelectorWithPanel, _Component);

  function SelectorWithPanel(props) {
    _classCallCheck(this, SelectorWithPanel);

    var _this = _possibleConstructorReturn(this, (SelectorWithPanel.__proto__ || Object.getPrototypeOf(SelectorWithPanel)).call(this, props));

    _this.handleQuery = _this.handleQuery.bind(_this);
    _this.handleSelect = _this.handleSelect.bind(_this);
    _this.handleUnselect = _this.handleUnselect.bind(_this);
    _this.handleUpload = _this.handleUpload.bind(_this);
    _this.handleToggle = _this.handleToggle.bind(_this);
    _this.handleUnSelectAll = _this.handleUnSelectAll.bind(_this);

    _this.findRecord = function (id) {
      var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataSource';
      return (0, _flatten2.default)([src]).reduce(function (memo, s) {
        if (memo.index > -1) {
          return memo;
        }
        var i = _this.props[s].findIndex(function (r) {
          return r[_this.props.idKey] === id;
        });

        return { index: i, record: _this.props[s][i] };
      }, { index: -1, record: null });
    };
    _this.findRecords = function (ids) {
      var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dataSource';

      var records = ids.map(function (id) {
        var _this$findRecord = _this.findRecord(id, src),
            record = _this$findRecord.record;

        return record;
      });

      return records;
    };

    _this.isSelected = function (id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!id || id.length === 0) {
        return false;
      }

      if (!options.strict) {
        var ancestorSelected = _this.props.ancestors.some(function (r) {
          return _ObjectArray2.default.includes(_this.props.selected.concat(_this.props.reserved), function (o) {
            return o[_this.props.idKey] === r[_this.props.idKey] && o.selected;
          });
        });
        if (ancestorSelected) {
          return ancestorSelected;
        }
      }

      var itemSelected = (0, _flatten2.default)([id]).every(function (id) {
        return _ObjectArray2.default.includes(_this.props.selected.concat(_this.props.reserved), function (r) {
          return r[_this.props.idKey] === id && r.selected;
        });
      });
      return itemSelected;
    };

    _this.withAncestors = function (segment) {
      var reversedSeq = [].concat(_this.props.ancestors).reverse();

      return reversedSeq.reduce(function (memo, node) {
        return Object.assign({}, node, { children: (0, _flatten2.default)([memo]) });
      }, segment);
    };
    return _this;
  }

  _createClass(SelectorWithPanel, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { idKey: this.props.idKey };
    }
  }, {
    key: 'handleExpand',
    value: function handleExpand(parent_id) {
      var _this2 = this;

      var newAncestors = function () {
        var _findRecord = _this2.findRecord(parent_id, 'ancestors'),
            index = _findRecord.index;

        if (index > -1) {
          return _this2.props.ancestors.slice(0, index + 1);
        }

        var _findRecord2 = _this2.findRecord(parent_id, 'dataSource'),
            record = _findRecord2.record;

        if (record) {
          return _this2.props.ancestors.concat(record);
        }

        return [];
      }();

      this.props.onOverrideAncestors(newAncestors);
    }
  }, {
    key: 'handleQuery',
    value: function handleQuery(params) {
      // params.parent_id could be null, by which means navigate to the top lv
      if (params.hasOwnProperty('parent_id')) {
        this.handleExpand(params.parent_id);
      }

      this.props.onQuery(Object.assign({}, this.props.query, params));
    }
  }, {
    key: 'handleToggle',
    value: function handleToggle(ids, beforeSelected) {
      if (beforeSelected) {
        this.handleUnselect(ids);
      } else {
        this.handleSelect(ids);
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(id) {
      // no need to do type cast, node.id is required to be a string
      var records = this.findRecords((0, _flatten2.default)([id]));
      var decoratedRecords = records.map(function (r) {
        return Object.assign({}, r, { selected: true });
      });

      var nextSelected = _Merger2.default.run(this.props.selected, this.withAncestors(decoratedRecords), { idKey: this.props.idKey, overrideKey: 'selected' });
      this.props.onOverrideSelected(nextSelected);
    }
  }, {
    key: 'handleUnselect',
    value: function handleUnselect(id) {
      var _this3 = this;

      // no need to do type cast, node.id is required to be a string
      var nextSelected = _Rejecter2.default.run(this.props.selected, function (r) {
        var isolated = !r.selected && (!r.children || r.children.length === 0);
        return (0, _flatten2.default)([id]).includes(r[_this3.props.idKey]) || isolated;
      }, { childKey: 'children', idKey: this.props.idKey });
      this.props.onOverrideSelected(nextSelected);
    }
  }, {
    key: 'handleUpload',
    value: function handleUpload(_ref) {
      var currentTarget = _ref.currentTarget;

      this.props.onUpload(currentTarget.files[0]);
    }
  }, {
    key: 'handleUnSelectAll',
    value: function handleUnSelectAll(callback) {
      var _this4 = this;

      return function () {
        return _this4.props.onUnselectAllConfirm(callback);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'row-gapless' },
        _react2.default.createElement(_Selector2.default, {
          text: this.props.text,

          progressBar: this.props.progressBar,

          dataSource: this.props.dataSource,
          ancestors: this.props.ancestors,
          query: this.props.query,

          onToggle: this.handleToggle,
          onQuery: this.handleQuery,
          onUpload: this.handleUpload,

          isSelected: this.isSelected
        }),
        _react2.default.createElement(_Panel2.default, {
          text: this.props.text,

          selected: this.props.selected,
          reserved: this.props.reserved,

          onUnselectAll: this.handleUnSelectAll,
          onUnselect: this.handleUnselect
        })
      );
    }
  }]);

  return SelectorWithPanel;
}(_react.Component);

SelectorWithPanel.propTypes = {
  idKey: _react.PropTypes.string,

  text: _react.PropTypes.shape({
    leftTitle: _react.PropTypes.string,
    leftEmpty: _react.PropTypes.string,
    rightTitle: _react.PropTypes.string,
    rightEmpty: _react.PropTypes.string,
    placeholder: _react.PropTypes.string
  }),

  dataSource: _react.PropTypes.arrayOf(_Node2.default),
  selected: _react.PropTypes.arrayOf(_Node2.default),
  reserved: _react.PropTypes.arrayOf(_Node2.default),
  ancestors: _react.PropTypes.arrayOf(_Node2.default),
  progressBar: _react.PropTypes.node,

  query: _react.PropTypes.shape({
    keyword: _react.PropTypes.string,
    offset: _react.PropTypes.number,
    limit: _react.PropTypes.number,
    order: _react.PropTypes.string,
    total: _react.PropTypes.number,
    parent_id: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
  }),

  onUnselectAllConfirm: _react.PropTypes.func,
  onUpload: _react.PropTypes.func,
  onQuery: _react.PropTypes.func,
  onOverrideSelected: _react.PropTypes.func,
  onOverrideAncestors: _react.PropTypes.func
};

SelectorWithPanel.defaultProps = {
  idKey: 'prop_id',
  dataSource: [],
  selected: [],
  reserved: [],
  ancestors: []
};

SelectorWithPanel.childContextTypes = {
  idKey: _react.PropTypes.string
};

exports.default = SelectorWithPanel;
module.exports = exports['default'];