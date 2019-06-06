import CustomNodeView from '~/components/RichTextEditor/utils/CustomNodeView';
import ImageMediaEditor from '~/components/RichTextEditor/components/ImageMediaEditor/ImageMediaEditor';
import React from 'react';

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

export default ImageListNodeView;
