import React, {Component} from 'react';
import logoImage from './logo.svg';

import './logo.scss';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <a href="/" className="logo__link">
          <img src={ logoImage } alt="логотип МНИЖ" className="logo__image"/>
        </a>
      </div>
    );
  }
}

export default Logo;
