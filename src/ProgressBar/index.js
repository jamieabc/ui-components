import React, { Component, PropTypes } from 'react';
import NProgress from 'nprogress';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.store = props.store;
    this.state = { start: false, done: false };
    this.getTemplate = this.getTemplate.bind(this);

    this.onChange = () => {
      if (this.store.getState(this.props.id).done && !this.state.done && this.state.start) {
        NProgress.configure({ parent: `#${this.refs.wrapper.id}` });
        NProgress.done(this.props.id);
        return setTimeout(() => this.setState({ start: false, done: true }), 500);
      }
      if (this.store.getState(this.props.id).start && !this.state.start) {
        NProgress.configure({ parent: `#${this.refs.wrapper.id}` });
        return this.setState({ start: true, done: false },
                             () => NProgress.start(this.props.id));
      }
    };
  }

  componentDidMount() {
    this.store.addChangeListener(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.store.reset(nextProps.id);

      NProgress.configure({
        speed: 300,
        showSpinner: false,
        template: this.getTemplate(),
        minimum: 0.12
      });
    }
  }

  componentWillUnmount() {
    this.store.removeChangeListener(this.onChange);
  }

  getTemplate() {
    return [
      '<div class="bar progress-bar progress-bar-striped active" role="bar">',
      '<div class="peg"></div>',
      "</div>"
    ].join('');
  }

  render() {
    const id = `progress-${this.props.id}`;

    return (
      <div
        className="progress nprogress-custom-parent"
        ref="wrapper"
        style={{ display: this.state.start ? 'block' : 'none' }}
        id={id}
      >
      </div>
    );
  }
}

ProgressBar.propTypes = {
  id: PropTypes.number
};

export default ProgressBar;
