import React, { Component } from 'react';

import RichTextEditor from '~/components/RichTextEditor/RichTextEditor'
import Renderer from '~/components/Renderer/Renderer'

class EditorExample extends Component {
  state = {
    jsonData: null
  };

  handleChange = (editorStateJson) => {
    this.setState({ jsonData: editorStateJson })
  };
  
  render() {
    const { jsonData } = this.state;
    return (
      <div>
        <RichTextEditor onChange={ this.handleChange } />
        <Renderer raw={ jsonData } />
      </div>
    );
  }
}

export default EditorExample;
