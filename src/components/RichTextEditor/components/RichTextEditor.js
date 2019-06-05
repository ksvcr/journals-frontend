import React, { PureComponent } from 'react';
import nanoid from 'nanoid';

import createEmptyEditorState from '../utils/createEmptyEditorState';
import convertFromJSON from '../utils/convertFromJSON';

import Editor from './Editor/Editor';
import EditorToolbar from './EditorToolbar/EditorToolbar';
import ContentCounter from './ContentCounter/ContentCounter';

import './rich-text-editor.scss';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-gapcursor/style/gapcursor.css';

const EMPTY_EDITOR_STATE = createEmptyEditorState();

class RichTextEditor extends PureComponent {
  constructor(props) {
    super(props);
    this._id = nanoid();
    const { editorStateJson } = props;
    const editorState = editorStateJson ? convertFromJSON(editorStateJson) : EMPTY_EDITOR_STATE;

    this.state = {
      editorState,
      editorView: null,
    };
  }

  _dispatchTransaction = (tr) => {
    const { onChange } = this.props;
    const { editorState } = this.state;
    const nextState = editorState.apply(tr);
    this.setState({ editorState: nextState });

    if (onChange) {
      onChange(nextState.doc.toJSON());
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
    const { editorState, editorView } = this.state;

    return (
      <div className="rich-text-editor">
        <EditorToolbar editorState={ editorState }
                       editorView={ editorView }
                       dispatchTransaction={ this._dispatchTransaction } />
        <Editor id={ this._id }
                editorView={ editorView }
                dispatchTransaction={ this._dispatchTransaction }
                onReady={ this._onReady }
                editorState={ editorState } />
        <ContentCounter editorState={ editorState } />
      </div>
    );
  }
}

export default RichTextEditor;
