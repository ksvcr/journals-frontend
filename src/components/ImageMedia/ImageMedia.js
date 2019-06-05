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
                 src={ data.preview }
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
              <div className="image-media__doi">
                DOI: <a href="/" className="image-media__doi-link">https://doi.org/10.18454/IRJ.2016.44.041</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageMedia;
