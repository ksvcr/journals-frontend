import React, {Component} from 'react';

import './image-media.scss';

class ImageMedia extends Component {
  renderItems = () => {
    const { data } = this.props;
    return data.images.map((item, index) => (
      <div className="image-media__item" key={ index }>
        <img className="image-media__image" src={ item.preview } alt=""/>
      </div>
    ) )
  };

  render() {
    return (
      <div className="image-media">
        <div className="image-media__list">
          { this.renderItems() }
        </div>
      </div>
    );
  }
}

export default ImageMedia;
