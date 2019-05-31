import React, { Component } from 'react';

import RichTextEditor from '~/components/RichTextEditor'
import ProseMirrorDocument from 'react-prosemirror-document';


function customNodeView(props) {
  const { attrs } = props.node;
  return <div>
    { attrs.images.map(item => item.title) }
  </div>
}

const customTypeMap = {
  ...ProseMirrorDocument.typeMap,
  customNode: customNodeView
};

class EditorExample extends Component {
  state = {
    editorState: null,
    jsonData: null
  };

  handleChange = (editorState) => {
    console.log(editorState.doc.toJSON());
    this.setState({ editorState, jsonData: editorState.doc.toJSON() });
  };
  
  render() {
    const { editorState, jsonData } = this.state;
    return (
      <div>
        <RichTextEditor editorState={ editorState } onChange={ this.handleChange } />


        { jsonData && <ProseMirrorDocument document={ jsonData } typeMap={ customTypeMap } /> }
      </div>
    );
  }
}

export default EditorExample;
