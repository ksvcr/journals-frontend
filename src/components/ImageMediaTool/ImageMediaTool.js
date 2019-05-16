import React, { Component } from 'react';
import { AtomicBlockUtils, EditorState } from 'draft-js';
import { withNamespaces } from 'react-i18next';

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
    const { t } = this.props;
    return (
      <button type="button" className="image-media-tool editor-button" onClick={ this.handleImageBlockAdd }>
        { t('upload_photo') }
        <Icon name="picture-small" className="image-media-tool__icon editor-button__icon" />
      </button>
    );
  }
}

ImageMediaTool = withNamespaces()(ImageMediaTool);

export default ImageMediaTool;
