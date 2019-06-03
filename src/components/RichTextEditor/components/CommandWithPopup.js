import React, { Component, createElement } from 'react';

export default function (WrappedComponent, params) {
  return class CommandWithPopup extends Component {
    state = {
      isRenderedBox: false
    };
    /**
     * Access the WrappedComponent's instance.
     */
    getInstance() {
      if (!WrappedComponent.prototype.isReactComponent) {
        return this;
      }
      const ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    }

    _execute = (value, event) => {
      const { command, editorState, dispatch, editorView } = this.props;
      command.execute(editorState, dispatch, editorView, event, this.renderBox);
    };

    componentDidMount() {
      const instance = this.getInstance();
      instance._execute = this._execute;
    }

    renderBox = (props) => {
      const Content = params.content;
      this.box = <Content { ...props } />;
      this.setState({ isRenderedBox: true });
    };

    getRef = ref => (this.instanceRef = ref);

    /**
     * Pass-through render
     */
    render() {
      const { isRenderedBox } = this.state;

      const props = {
        ...this.props,
        box: isRenderedBox ? this.box : null
      };

      if (WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }

      return createElement(WrappedComponent, props);
    }
  };
}
