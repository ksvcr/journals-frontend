import React, { Component } from 'react';
import { Fragment } from 'prosemirror-model';
import CommandButton from './CommandButton';
import * as EditorCommands from '../utils/EditorCommands';
import FontSizeCommandMenuButton from './FontSizeCommandMenuButton';

const {
  H1, H2, H3, H4,
  HISTORY_REDO, HISTORY_UNDO,
  STRONG, EM, UNDERLINE, STRIKE,
  TEXT_ALIGN_CENTER, TEXT_ALIGN_JUSTIFY, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT,
  TEXT_COLOR, TEXT_HIGHLIGHT,
  LINK_SET_URL, LINK_REMOVE, IMAGE_LIST } = EditorCommands;

class EditorToolbar extends Component {
  render() {
    const { editorState, editorView, dispatchTransaction } = this.props;
    return (
      <div className="editor-toolbar">
        <FontSizeCommandMenuButton
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView } />
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

        <CommandButton
          command={ TEXT_COLOR }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="text color"
        />
        <CommandButton
          command={ TEXT_HIGHLIGHT }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="text HIGHLIGHT"
        />

        <CommandButton
          command={ LINK_SET_URL }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="set url"
        />

        <CommandButton
          command={ LINK_REMOVE }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="remove url"
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

        <CommandButton
          command={ IMAGE_LIST }
          dispatch={ dispatchTransaction }
          editorState={ editorState }
          editorView={ editorView }
          title="image list"
        />
      </div>
    );
  }
}

export default EditorToolbar;
