import React, { Component } from 'react';
import { DOMSerializer } from 'prosemirror-model';
import CustomEditorView from '../utils/CustomEditorView';
import CustomNodeView from '../utils/CustomNodeView';

import ImageMediaEditor from '~/components/RichTextEditor/components/ImageMediaEditor/ImageMediaEditor';

const AUTO_FOCUS_DELAY = 350;

function bindNodeView(NodeView) {
  return (node, view, getPos, decorations) => {
    return new NodeView(node, view, getPos, decorations);
  };
}

class ImageListNodeView extends CustomNodeView {
  createDOMElement() {
    return document.createElement('span');
  }

  update(node, decorations) {
    super.update(node, decorations);
    return true;
  }

  remove = () => {
    const { editorView } = this.props;
    let tr = editorView.state.tr;
    const { from, to } = tr.selection;
    tr = tr.delete(from, to);
    editorView.dispatch(tr);
  };

  changeAttrs = (attrs) => {
    const { getPos, editorView } = this.props;
    const pos = getPos();
    let tr = editorView.state.tr;
    const { selection } = editorView.state;
    tr = tr.setNodeMarkup(pos, null, attrs);
    tr = tr.setSelection(selection);
    editorView.dispatch(tr);
  };

  renderReactComponent() {
    const { node } = this.props;
    const { attrs } = node;
    return <ImageMediaEditor data={ attrs } onChange={ this.changeAttrs } onRemove={ this.remove } />
  }
}

const DEFAULT_NODE_VIEWS = Object.freeze({
  'image-list': ImageListNodeView,
});

class Editor extends Component {
  componentDidMount() {
    const { id, editorState, dispatchTransaction } = this.props;
    const editorNode = document.getElementById(id);

    if (editorNode) {
      const schema = editorState.schema;
      const boundNodeViews = {};
      const { nodes } = schema;
      const effectiveNodeViews = { ...DEFAULT_NODE_VIEWS };

      Object.keys(effectiveNodeViews).forEach(nodeName => {
        const nodeView = effectiveNodeViews[nodeName];
        // Only valid and supported node views should be used.
        if (nodes[nodeName]) {
          boundNodeViews[nodeName] = bindNodeView(nodeView);
        }
      });

      // Reference: http://prosemirror.net/examples/basic/
      this._editorView = new CustomEditorView(editorNode, {
        clipboardSerializer: DOMSerializer.fromSchema(schema),
        dispatchTransaction,
        editable: this._isEditable,
        nodeViews: boundNodeViews,
        state: editorState
      });
    }
  }

  componentDidUpdate(prevProps) {
    const view = this._editorView;
    if (view) {
      const prevSchema = prevProps.editorState.schema;
      const currSchema = this.props.editorState.schema;
      if (prevSchema !== currSchema) {
        // schema should never change.
        // TODO: re-create the editor view if schema changed.
        console.error('editor schema changed.');
      }

      const {
        runtime,
        editorState,
        placeholder,
        readOnly,
        disabled,
        onReady
      } = this.props;

      const state = editorState;
      view.runtime = runtime;
      view.placeholder = placeholder;
      view.readOnly = !!readOnly;
      view.disabled = !!disabled;
      view.updateState(state);

      onReady && onReady(view);

      this._autoFocusTimer && clearTimeout(this._autoFocusTimer);
      this._autoFocusTimer =
        !prevProps.autoFocus && this.props.autoFocus
          ? setTimeout(this.focus, AUTO_FOCUS_DELAY)
          : 0;
    }
  }

  componentWillUnmount() {
    this._autoFocusTimer && clearTimeout(this._autoFocusTimer);
    this._editorView && this._editorView.destroy();
    this._editorView = null;
  }

  _onBlur = () => {
    const { onBlur } = this.props;
    const view = this._editorView;
    if (view && !view.disabled && !view.readOnly && onBlur) {
      onBlur();
    }
  };

  focus = () => {
    const view = this._editorView;
    if (view && !view.disabled && !view.readOnly) {
      view.focus();
    }
  };

  _isEditable = () => {
    const { disabled, readOnly } = this.props;
    return !!this._editorView && !readOnly && !disabled;
  };

  render() {
    const { id } = this.props;
    return (
      <div className="rich-text-editor"
           id={ id }
           onBlur={ this._onBlur } />
    );
  }
}

export default Editor;
