import React, { Component, createElement } from 'react';

export default function (WrappedComponent, config) {
  return class onClickOutside extends Component {
    state = {
      showBox: false
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
      this.setState({ showBox: true });
      command.execute(editorState, dispatch, editorView, event, this.renderBox);
    };

    componentDidMount() {
      const instance = this.getInstance();
      instance._execute = this._execute;
    }

    renderBox = ({ onChange }) => {
      console.log('render');
      return this.state.showBox ? <div onClick={ onChange.bind(null, '#eee') }>jopa</div> : null
    };

    getRef = ref => (this.instanceRef = ref);

    /**
     * Pass-through render
     */
    render() {
      const props = {
        ...this.props,
        renderBox: this.renderBox
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
