import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';

class MainMenu extends Component {
  get defaultItems() {
    return [
      {
        title: 'Настройки',
        href: '/settings'
      }
    ];
  }

  get correctorItems() {
    return [
      {
        title: 'Статьи в работе',
        href: '/'
      },
      {
        title: 'Статистика',
        href: '/stats'
      },
      ...this.defaultItems
    ];
  }

  get authorItems() {
    return [
      {
        title: 'Мои статьи',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/discounts'
      },
      ...this.defaultItems
    ];
  }

  get reviewerItems() {
    return [
      ...this.authorItems,
      {
        title: 'Статьи на рецензию',
        href: '/articles-for-review'
      }
    ];
  }

  get redactorItems() {
    return [
      {
        title: 'Мои статьи',
        href: '/'
      },
      {
        title: 'Выпуски',
        href: '/releases'
      },
      {
        title: 'Пользователи',
        href: '/users'
      },
      ...this.defaultItems
    ];
  }

  get menuItems() {
    const { userRole } = this.props;

    switch (userRole) {
      case 'AUTHOR':
        return this.authorItems;
      case 'REVIEWER':
        return this.reviewerItems;
      case 'REDACTOR':
        return this.redactorItems;
      case 'TRANSLATOR':
      case 'CORRECTOR':
        return this.correctorItems;
      default:
        return this.defaultItems;
    }
  }

  render() {
    return (
      <Menu items={ this.menuItems } />
    );
  }
}

function mapStateToProps(state) {
  const { user, router } = state;
  return {
    userRole: user.data.role,
    pathname: router.location.pathname
  };
}

export default connect(
  mapStateToProps,
)(MainMenu);
