import React, { Component } from 'react';
import logoImage from './assets/logo.png';
import { Link } from 'react-router-dom';

import './logo.scss';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <Link to="/" className="logo__link">
          <img src={ logoImage } alt="логотип МНИЖ" className="logo__image"/>
        </Link>
      </div>
    );
  }
}

export default Logo;
