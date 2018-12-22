import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';

class MainMenu extends Component {
  get menuItems() {
    const { userRole } = this.props;

    const items = [
      {
        title: 'Мои статьи',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/second'
      },
      {
        title: 'Настройки',
        href: '/settings'
      }
    ];

    if (userRole === 'REVIEWER') {
      items.push({
        title: 'Статьи на рецензию',
        href: '/articles-for-review'
      });
    }

    return items;
  }

  render() {
    return (
      <Menu items={ this.menuItems } />
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    userRole: user.data.role
  };
}

export default connect(
  mapStateToProps,
)(MainMenu);
