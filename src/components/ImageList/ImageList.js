import React, { Component } from 'react';

import './image-list.scss';

class ImageList extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="image-list">
        { data.title }
      </div>
    );
  }
}

export default ImageList;
