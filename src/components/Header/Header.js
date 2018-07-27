import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <Link to="/">main</Link>
        <Link to="/second">second</Link>
      </header>
    );
  }
}

export default Header;
