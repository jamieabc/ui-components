import React, { Component } from 'react';
import { iframeResizer } from 'iframe-resizer';

class AutoResizeIframe extends Component {
  constructor(props) {
    super(props);

    this.id = `auto-resize-iframe-${Math.floor(Math.random() * 10000)}`;
  }

  componentDidMount() {
    const instances = iframeResizer({
      checkOrigin: false,
      initCallback(iframe) {
        iframe.style.height = 0; // Chrome & FF cannot calcuate hidden iframe height correctly
      },
      resizedCallback({ iframe, height, width, type }) {
        iframe.style.height = `${Number.parseInt(height, 10) + 20}px`;
      }
    }, `#${this.id}`)

    this.instance = instances[0];
  }

  resize() {
    this.instance.iFrameResizer.resize();
  }

  componentWillUnmount() {
    this.instance.iFrameResizer.close();
  }

  render() {
    return (
      <iframe ref="iframe" id={this.id} className="panel-body" src={this.props.src} scrolling="no" />
    )
  }
}

export default AutoResizeIframe;
