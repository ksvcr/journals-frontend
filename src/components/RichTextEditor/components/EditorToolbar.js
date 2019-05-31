import React, { Component } from 'react';
import { Fragment } from 'prosemirror-model';
import CommandButton from './CommandButton';

import * as EditorCommands from '../utils/EditorCommands';

const {
  H1, H2, H3, H4,
  HISTORY_REDO,
  HISTORY_UNDO } = EditorCommands;

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
    const { editorState, editorView, dispatchTransaction } = this.props;
    return (
      <div className="editor-toolbar">
        <button type="button" onClick={ this.handleInsert }/>
        <CommandButton
          command={ H1 }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="H1"
        />
        <CommandButton
          command={ H2 }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="H2"
        />

        <CommandButton
          command={ HISTORY_UNDO }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="UNDO"
        />
        <CommandButton
          command={ HISTORY_REDO }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="Redo"
        />
      </div>
    );
  }
}

export default EditorToolbar;
