import React, { Component } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';

import Icon from '~/components/Icon/Icon';

import './image-media-tool.scss';
import './assets/picture-small.svg';

class ImageMediaTool extends Component {
  handleImageBlockAdd = (event) => {
    event.stopPropagation();
    const { getEditorState, setEditorState } = this.props;

    const editorState = getEditorState();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image-list',
      'MUTABLE',
      { images: [] }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity }
    );

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        'image-list'
      )
    );
  };

  render() {
    return (
      <button type="button" className="image-media-tool editor-button" onClick={ this.handleImageBlockAdd }>
        Загрузить фото
        <Icon name="picture-small" className="image-media-tool__icon editor-button__icon" />
      </button>
    );
  }
}

export default ImageMediaTool;
