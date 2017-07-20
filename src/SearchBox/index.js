import React, { Component, PropTypes } from 'react';
import isUndefined from 'lodash/isUndefined';
import debounce from 'lodash/debounce';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: props.keyword
    };

    this.clearKeywordField = () => {
      this.setState({keyword: ''});
      this.props.handleQueryChange({keyword: ''});
    };

    this.handleChange = (e) => {
      this.setState({keyword: e.target.value});
    };
  }

  componentDidMount() {
    $(this.refs.keywordField).off('keyup').on('keyup', debounce((e) => {
      this.props.handleQueryChange({keyword: e.target.value});
    }, 1000));
  }

  componentWillReceiveProps(nextProps) {
    if (!isUndefined(nextProps.keyword) && nextProps.keyword !== this.state.keyword) {
      this.setState({keyword: nextProps.keyword});
    }
  }

  componentWillUnmount() {
    $(this.refs.keywordField).off('keyup');
  }

  render() {
    const closeButtonStyle = {display: this.state.keyword ? 'block' : 'none'};
    return (
      <div {...t(this.props.tagName)} className="has-feedback form-group">
        <input
          ref="keywordField"
          type="search"
          className="form-control"
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          value={this.state.keyword || ''}
        />
        <button type="button" className="btn form-control-feedback" onClick={this.clearKeywordField} style={closeButtonStyle}>
          <i className="fa fa-times"></i>
        </button>
      </div>
    );
  }
}

SearchBox.propTypes = {
  tagName: PropTypes.string,
  handleQueryChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  keyword: PropTypes.string
};

SearchBox.defaultProps = {
  tagName: ''
};

export default SearchBox;
