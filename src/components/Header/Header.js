import React, { Component } from 'react';

import Logo from '../Logo/Logo';
import HeaderTools from '../HeaderTools/HeaderTools';
import UserPanel from '../UserPanel/UserPanel';

import './header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__holder">
          <Logo />
          <HeaderTools />
          <UserPanel />
        </div>
      </header>
    );
  }
}

export default Header;
