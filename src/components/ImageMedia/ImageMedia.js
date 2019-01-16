import React, { Component } from 'react';

import Icon from '~/components/Icon/Icon';

import './assets/download.svg';
import './image-media.scss';

class ImageMedia extends Component {
  renderItem = (item, index=0) => {
    return (
      <div className="image-media__item" key={ index }>
        <div className="image-media__box">
          <img className="image-media__image"
               src={ item.preview }
               alt="" />
        </div>
        <div className="image-media__description">
          <div className="image-media__title">
            { item.title }
          </div>
          <div className="image-media__additional">
            { item.additional }
          </div>
          <div className="image-media__footer">
            <div className="image-media__doi">
              DOI: <a href="/" className="image-media__doi-link">https://doi.org/10.18454/IRJ.2016.44.041</a>
            </div>
            <a className="image-media__download" href="/">
              <Icon className="image-media__icon" name="download"/>
              TIFF
            </a>
          </div>
        </div>
      </div>
    )
  };

  renderItems = () => {
    const { data } = this.props;
    return data.images.map((item, index) => this.renderItem(item, index));
  };

  render() {
    const { data } = this.props;

    return (
      <div className="image-media">
        {
          data.images ? this.renderItems() : this.renderItem(data)
        }
      </div>
    );
  }
}

export default ImageMedia;