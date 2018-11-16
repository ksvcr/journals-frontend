import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

import './image-media.scss';

class ImageMedia extends Component {
  handleDropFile = files => {
    console.log(files);
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
          onDragEnter={ () => { console.log(11); } }
        >
          Перетащите сюда изображения
        </Dropzone>
        { data.title }
      </div>
    );
  }
}

export default ImageMedia;
