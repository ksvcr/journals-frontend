import React, { Component } from 'react';

import ImageMediaEditor from '~/components/ImageMediaEditor/ImageMediaEditor';
import { EditorState } from 'draft-js';

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

  get entity() {
    const { contentState, block } = this.props;
    return contentState.getEntity(
      block.getEntityAt(0)
    );
  }

  render() {
    const data = this.entity.getData();
    const type = this.entity.getType();
    switch(type){
      case 'image-list':
        return <ImageMediaEditor data={ data } onChange={ this.handleChange }
                                 onInteract={ this.handleInteract } onCancelInteract={ this.handleInteractCancel } />;
      default:
        return null;
    }
  }
};

export default AtomicBlock;
