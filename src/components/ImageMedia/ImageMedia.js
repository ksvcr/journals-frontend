import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

import './image-media.scss';

class ImageMedia extends Component {
  handleDropFile = files => {
    const { onChange } = this.props;
    onChange(files);
  };
  
  render() {
    const { data, onInteract } = this.props;
    return (
      <div className="image-media">
        <Dropzone
          className="image-media__dropzone"
          accept="image/*"
          multiple={ true }
          onClick={ onInteract }
          onDrop={ this.handleDropFile }
        >
          Перетащите сюда изображения
        </Dropzone>
        { data.images.map(item => (
          <div>{ item }</div>
        )) }
      </div>
    );
  }
}

export default ImageMedia;
