import React, { Component } from 'react';

import './assets/download.svg';
import './image-media.scss';

class ImageMedia extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="image-media">
        <div className="image-media__item">
          <div className="image-media__box">
            <img className="image-media__image"
                 src={ data.file }
                 alt="" />
          </div>
          <div className="image-media__description">
            <div className="image-media__title">
              { data.title }
            </div>
            <div className="image-media__additional">
              { data.additional }
            </div>
            <div className="image-media__footer">
              { data.doi &&
                <div className="image-media__doi">
                  DOI: <a href={ data.doi } className="image-media__doi-link">{ data.doi  }</a>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageMedia;
