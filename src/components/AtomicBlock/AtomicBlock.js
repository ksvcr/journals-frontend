import React, { Component } from 'react';

import ImageMediaEditor from '~/components/ImageMediaEditor/ImageMediaEditor';
import TableEditor from '~/components/TableEditorWrapper/TableEditorWrapper';
import { EditorState } from 'draft-js';
import { removeRange } from '~/services/customDraftUtils';

class AtomicBlock extends Component {
  handleChange = (data) => {
    const { contentState, block, blockProps } = this.props;
    const { pluginEditor } = blockProps;
    const { getEditorState, setEditorState } = pluginEditor;
    const editorState = getEditorState();
    const selection = editorState.getSelection();

    blockProps.onInteractChange(false);

    contentState.replaceEntityData(
      block.getEntityAt(0),
      data
    );
    setEditorState(EditorState.forceSelection(editorState, selection));
  };

  handleInteract = () => {
    const { blockProps } = this.props;
    blockProps.onInteractChange(true);
  };

  handleInteractCancel = () => {
    const { blockProps } = this.props;
    blockProps.onInteractChange(false);
  };

  handleRemove = () => {
    const { block, blockProps } = this.props;
    removeRange(block, blockProps);
  };

  get entity() {
    const { contentState, block } = this.props;
    return contentState.getEntity(
      block.getEntityAt(0)
    );
  }

  render() {
    const data = this.entity.getData();
    const type = this.entity.getType();
    console.log(this.props);
    switch(type){
      case 'image-list':
        return <ImageMediaEditor data={ data } onChange={ this.handleChange } onRemove={ this.handleRemove }
                                 onInteract={ this.handleInteract } onCancelInteract={ this.handleInteractCancel } />;

      case 'block-table':
        return <TableEditor data={ data } editorProps={ this.props }
                            onChange={ this.handleChange } onRemove={ this.handleRemove } />;
      default:
        return null;
    }
  }
}

export default AtomicBlock;
