import React, { Component } from 'react';

import RichTextEditor from '~/components/RichTextEditor/RichTextEditor'

class EditorExample extends Component {
  state = {
    editorState: null
  };

  handleChange = (editorState) => {
    console.log(JSON.stringify(editorState.doc.toJSON()));

    this.setState({ editorState });
  };
  
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <RichTextEditor editorState={ editorState } onChange={ this.handleChange } />
      </div>
    );
  }
}

export default EditorExample;
