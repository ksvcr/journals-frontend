import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import nanoid from 'nanoid';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';
import ToolTip from '~/components/ToolTip/ToolTip';
import MetaInfoForm from '~/components/RichTextEditor/components/MetaInfoForm/MetaInfoForm';
import ImageDropPlaceholder from '~/components/ImageDropPlaceholder/ImageDropPlaceholder';

import formatBytes from '~/utils/formatBytes';
import fileToBase64 from '~/utils/fileToBase64';

import './assets/edit.svg';
import './assets/cancel.svg';
import './image-media-editor.scss';

class ImageMediaEditor extends Component {
  constructor(props) {
    super(props);
    this.meta = {};
  }

  state = {
    showForm: false
  };

  handleFormOpen = (event) => {
    const { dataset } = event.currentTarget;
    const { id } = dataset;

    this.setState({
      showForm: id
    });
  };

  handleFormClose = () => {
    this.setState({
      showForm: false
    });
  };

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

  handleMetaChange = (id, formData) => {
    const { data, onChange } = this.props;
    const newData = {
      ...data,
      images: data.images.map(item => {
        return item.id === id ? { ...item, ...formData } : item;
      })
    };
    this.handleFormClose();
    onChange(newData);
  };

  handleItemRemove = (event) => {
    const { data, onChange } = this.props;
    const { id } = event.currentTarget.dataset;
    const newData = {
      ...data,
      images: data.images.filter(item => item.id !== id)
    };

    onChange(newData);
  };

  renderImageItems = () => {
    const { t, data } = this.props;
    const { showForm } = this.state;
    return data.images.map(item => (
      <div className="image-media-editor__item" key={ item.id }>
        <div className="image-media-editor__zone">
          <ToolTip
            className="tooltip"
            position="right-start"
            open={ showForm === item.id }
            onRequestClose={ this.handleFormClose }
            html={
              <MetaInfoForm
                id={ item.id }
                onSubmit={ this.handleMetaChange }
                data={ item }
              />
            }
          >
            <button type="button" className="image-media-editor__button"
                    data-id={ item.id } onClick={ this.handleFormOpen }>
              <div className="image-media-editor__view">
                <img
                  className="image-media-editor__image"
                  src={ item.preview }
                  alt=""
                />
                <div className="image-media-editor__box">
                  <Icon name="edit" className="image-media-editor__edit-icon" />
                  { t('edit') }
                </div>
              </div>
            </button>
          </ToolTip>
        </div>
        <div className="image-media-editor__info">
          <div className="image-media-editor__title">{ item.title }</div>
          <div className="image-media-editor__size">
            { `${formatBytes(item.size, 0)}, ${item.name.split('.').pop()}` }
          </div>
          <button type="button" data-id={ item.id } className="image-media-editor__remove-button"
                  onClick={ this.handleItemRemove }>
            <Icon name="cancel"  className="image-media-editor__remove-icon" />
          </button>
        </div>
      </div>
    ));
  };

  render() {
    const { data, onRemove, t } = this.props;
    return (
      <div className="image-media-editor" contentEditable={ false }>
        <div className="image-media-editor__top">
          <button type="button" onClick={ onRemove } className="image-media-editor__remove-button">
            <Icon name="cancel"  className="image-media-editor__remove-icon" />
            { t('delete') }
          </button>
        </div>
        <Dropzone
          className="image-media-editor__dropzone"
          accept="image/*"
          multiple={ true }
          onDrop={ this.handleDropFile }
        >
          <ImageDropPlaceholder />
        </Dropzone>

        { data.images.length > 0 && (
          <div className="image-media-editor__holder">
            <div className="image-media-editor__list">
              { this.renderImageItems() }
            </div>
          </div>
        ) }
      </div>
    );
  }
}

ImageMediaEditor = withNamespaces()(ImageMediaEditor);


export default ImageMediaEditor;


