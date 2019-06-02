import React, { Component } from 'react';
import { Fragment } from 'prosemirror-model';
import CommandButton from './CommandButton';
import CommandWithPopup from './CommandWithPopup';
import * as EditorCommands from '../utils/EditorCommands';

const CommandButtonWithPopup = CommandWithPopup(CommandButton);

const {
  H1, H2, H3, H4,
  HISTORY_REDO, HISTORY_UNDO,
  STRONG, EM, UNDERLINE, STRIKE,
  TEXT_ALIGN_CENTER, TEXT_ALIGN_JUSTIFY, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT,
  TEXT_COLOR } = EditorCommands;

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
          command={ H3 }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="H3"
        />
        <CommandButton
          command={ H4 }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="H4"
        />

        <CommandButton
          command={ STRONG }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="B"
        />

        <CommandButton
          command={ EM }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="I"
        />

        <CommandButton
          command={ UNDERLINE }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="U"
        />

        <CommandButton
          command={ STRIKE }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="S"
        />

        <CommandButton
          command={ TEXT_ALIGN_CENTER }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="Align center"
        />

        <CommandButton
          command={ TEXT_ALIGN_JUSTIFY }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="Align JUSTIFY"
        />

        <CommandButton
          command={ TEXT_ALIGN_LEFT }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="Align LEFT"
        />

        <CommandButton
          command={ TEXT_ALIGN_RIGHT }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="Align RIGHT"
        />

        <CommandButtonWithPopup
          command={ TEXT_COLOR }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="Align color"
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
