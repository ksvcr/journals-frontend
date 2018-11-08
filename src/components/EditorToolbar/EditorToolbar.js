import React from 'react';

import './editor-toolbar.scss';

function EditorToolbar(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent { ...this.props } />;
    }
  };
}

export default EditorToolbar;
