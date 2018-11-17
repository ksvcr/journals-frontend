import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

import './image-media.scss';

class ImageMedia extends Component {
  handleDropFile = files => {
    const { onChange } = this.props;
    onChange(files);
  };
  
  render() {
    const { data } = this.props;
    return (
      <div className="image-media">
        <Dropzone
          className="image-media__dropzone"
          accept="image/*"
          multiple={ true }
          onDrop={ this.handleDropFile }
        >
          Перетащите сюда изображения
        </Dropzone>
        { data.title }
      </div>
    );
  }
}

export default ImageMedia;
