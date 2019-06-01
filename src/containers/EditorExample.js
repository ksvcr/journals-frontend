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
  customNode: customNodeView,
  heading: headingView
};

const customMarkType = {
  ...ProseMirrorDocument.markMap,
  underline: 'u',
  strike: strikeMark
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
        { jsonData && <ProseMirrorDocument document={ jsonData } typeMap={ customTypeMap } markMap={ customMarkType } /> }
      </div>
    );
  }
}

export default EditorExample;


function headingView(props) {
  const { level } = props.node.attrs;
  const tags = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4'
  };

  let args = [tags[level], { className: props.className }];

  if (props.node.content && props.node.content.length > 0) {
    args = args.concat(props.node.content.map(function(node) {
      const newProps = {
        ...props,
        document: node
      };

      return ProseMirrorDocument(newProps);
    }));
  }

  return React.createElement.apply(React, args);
}

function strikeMark(props) {
  return (
    <span style={ { textDecoration: 'line-through' } }>
      { props.children }
    </span>
  );
}
