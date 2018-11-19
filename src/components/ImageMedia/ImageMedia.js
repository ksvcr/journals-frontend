import React, { Component } from 'react';

import Dropzone from 'react-dropzone';
import nanoid from 'nanoid';

import Icon from '~/components/Icon/Icon';
import ToolTip from '~/components/ToolTip/ToolTip';
import ImageMediaForm from '~/components/ImageMediaForm/ImageMediaForm';
import ImageDropPlaceholder from '~/components/ImageDropPlaceholder/ImageDropPlaceholder';

import formatBytes from '~/utils/formatBytes';

import './assets/edit.svg';
import './image-media.scss';

class ImageMedia extends Component {
  handleDropFile = files => {
    const { data, onChange } = this.props;
    const newImages = files.map(file => {
      const objectURL = window.URL.createObjectURL(file);
      return {
        id: nanoid(),
        name: file.name,
        title: file.name,
        size: file.size,
        type: file.type,
        preview: objectURL
      }
    });

    const newData = { ...data,
      images: [ ...data.images, ...newImages ] };
    onChange(newData);
  };

  handleSubmit = (id, formData) => {
    const { data, onChange } = this.props;
    const newData = { ...data,
      images: data.images.map(item => {
        if (item.id !== id ) {
          return item;
        }
        return { ...item, ...formData }
      })
    };

    onChange(newData);
  };

  renderImageItems = () => {
    const { data, onInteract, onCancelInteract } = this.props;
    return data.images.map(item => (
      <div className="image-media__item"  key={ item.id }>
        <ToolTip className="tooltip" position="right-start" useContext={ true }
                 onShow={ onInteract } onRequestClose={ onCancelInteract }
                 html={ <ImageMediaForm id={ item.id }
                                        onChange={ this.handleSubmit }
                                        initialValues={ item } /> }>
          <button type="button" className="image-media__button" >
            <div className="image-media__view">
              <img className="image-media__image" src={ item.preview } alt=""/>
              <div className="image-media__box">
                <Icon name="edit" className="image-media__edit-icon" />
                Редактировать
              </div>
            </div>
            <div className="image-media__info">
              <div className="image-media__title">
                { item.title }
              </div>
              <div className="image-media__size">
                { `${formatBytes(item.size, 0)}, ${item.name.split('.').pop()}` }
              </div>
            </div>
          </button>
        </ToolTip>
      </div>

    ))
  };
  
  render() {
    const { data, onInteract, onCancelInteract } = this.props;
    return (
      <div className="image-media" >
        <Dropzone
          className="image-media__dropzone"
          accept="image/*"
          multiple={ true }
          onFileDialogCancel={ onCancelInteract }
          onClick={ onInteract }
          onDrop={ this.handleDropFile }
        >
          <ImageDropPlaceholder />
        </Dropzone>

        { data.images.length > 0 &&
          <div className="image-media__holder">
            <div className="image-media__list">
              { this.renderImageItems() }
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ImageMedia;
