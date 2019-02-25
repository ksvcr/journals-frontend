import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import nanoid from 'nanoid';

import Icon from '~/components/Icon/Icon';
import ToolTip from '~/components/ToolTip/ToolTip';
import MetaInfoForm from '~/components/MetaInfoForm/MetaInfoForm';
import ImageDropPlaceholder from '~/components/ImageDropPlaceholder/ImageDropPlaceholder';

import formatBytes from '~/utils/formatBytes';
import fileToBase64 from '~/utils/fileToBase64';

import './assets/edit.svg';
import './image-media-editor.scss';

class ImageMediaEditor extends Component {
  handleDropFile = files => {
    const { data, onChange } = this.props;
    const newImagesPromises = files.map(file => {
      return fileToBase64(file);
    });

    Promise.all(newImagesPromises).then(result => {
      const newImages = result.map((base64, index) => {
        const file = files[index];
        return {
          id: nanoid(),
          name: file.name,
          title: file.name,
          size: file.size,
          type: file.type,
          preview: base64
        };
      });

      const newData = {
        ...data,
        images: [...data.images, ...newImages]
      };
      onChange(newData);
    });
  };

  handleSubmit = (id, formData) => {
    const { data, onChange } = this.props;
    const newData = {
      ...data,
      images: data.images.map(item => {
        if (item.id !== id) {
          return item;
        }
        return { ...item, ...formData };
      })
    };

    onChange(newData);
  };

  renderImageItems = () => {
    const { data, onInteract, onCancelInteract } = this.props;
    return data.images.map(item => (
      <div className="image-media-editor__item" key={ item.id }>
        <ToolTip
          className="tooltip"
          position="right-start"
          useContext={ true }
          onShow={ onInteract }
          onRequestClose={ onCancelInteract }
          html={
            <MetaInfoForm
              id={ item.id }
              onChange={ this.handleSubmit }
              initialValues={ item }
            />
          }
        >
          <button type="button" className="image-media-editor__button">
            <div className="image-media-editor__view">
              <img
                className="image-media-editor__image"
                src={ item.preview }
                alt=""
              />
              <div className="image-media-editor__box">
                <Icon name="edit" className="image-media-editor__edit-icon" />
                Редактировать
              </div>
            </div>
            <div className="image-media-editor__info">
              <div className="image-media-editor__title">{item.title}</div>
              <div className="image-media-editor__size">
                {`${formatBytes(item.size, 0)}, ${item.name.split('.').pop()}`}
              </div>
            </div>
          </button>
        </ToolTip>
      </div>
    ));
  };

  render() {
    const { data, onInteract, onCancelInteract } = this.props;
    return (
      <div className="image-media-editor">
        <Dropzone
          className="image-media-editor__dropzone"
          accept="image/*"
          multiple={ true }
          onFileDialogCancel={ onCancelInteract }
          onClick={ onInteract }
          onDrop={ this.handleDropFile }
        >
          <ImageDropPlaceholder />
        </Dropzone>

        {data.images.length > 0 && (
          <div className="image-media-editor__holder">
            <div className="image-media-editor__list">
              {this.renderImageItems()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ImageMediaEditor;
