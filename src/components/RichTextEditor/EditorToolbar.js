import React, { Component } from 'react';
import { Fragment } from 'prosemirror-model';

class EditorToolbar extends Component {
  handleInsert = () => {
    const { editorState,  dispatchTransaction } = this.props;
    let { tr, schema } = editorState;
    const { selection } = tr;
    if (!selection) {
      return tr;
    }
    const { from, to } = selection;
    if (from !== to) {
      return tr;
    }

    const custom = schema.nodes['customNode'];
    const node = custom.create({}, null, null);
    const frag = Fragment.from(node);

    tr = tr.insert(from, frag);

    dispatchTransaction(tr)
  };

  render() {
    return (
      <div className="editor-toolbar">
        <button type="button" onClick={ this.handleInsert }/>
      </div>
    );
  }
}

export default EditorToolbar;
