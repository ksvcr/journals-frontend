import React, { PureComponent } from 'react';
import nanoid from 'nanoid';

import createEmptyEditorState from '../utils/createEmptyEditorState';

import Editor from './Editor';
import EditorToolbar from './EditorToolbar';

import './styles.scss';

const EMPTY_EDITOR_STATE = createEmptyEditorState();

class RichTextEditor extends PureComponent {
  constructor() {
    super();
    this._id = nanoid();

    this.state = {
      contentHeight: NaN,
      contentOverflowHidden: false,
      editorView: null,
    };
  }

  _dispatchTransaction = (tr) => {
    const { onChange, editorState, readOnly } = this.props;
    if (readOnly === true) {
      return;
    }

    if (onChange) {
      const nextState = (editorState || EMPTY_EDITOR_STATE).apply(tr);
      onChange(nextState);
    }
  };

  _onReady = (editorView) => {
    if (editorView !== this.state.editorView) {
      this.setState({ editorView });
      const { onReady } = this.props;
      onReady && onReady(editorView);
    }
  };

  render() {
    const { editorView } = this.state;
    let { editorState } = this.props;

    editorState = editorState || EMPTY_EDITOR_STATE;

    return (
      <div>
        <EditorToolbar editorState={ editorState }
                       editorView={ editorView }
                       dispatchTransaction={ this._dispatchTransaction } />
        <Editor id={ this._id }
                editorView={ editorView }
                dispatchTransaction={ this._dispatchTransaction }
                onReady={ this._onReady }
                editorState={ editorState } />
      </div>
    );
  }
}

export default RichTextEditor;
