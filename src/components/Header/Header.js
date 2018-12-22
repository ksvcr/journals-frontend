import React, { Component } from 'react';

import Logo from '~/components/Logo/Logo';
import HeaderTools from '~/components/HeaderTools/HeaderTools';
import UserPanel from '~/components/UserPanel/UserPanel';

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
