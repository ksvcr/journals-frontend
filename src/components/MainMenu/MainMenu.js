import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import Menu from '~/components/Menu/Menu';

import './main-menu.scss';

class MainMenu extends Component {
  get defaultItems() {
    const { t } = this.props;

    return [
      {
        title: t('settings'),
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
        title: 'Пользователи',
        href: '/users'
      },
      ...this.defaultItems,
      {
        title: 'Статьи на рецензию',
        href: '/articles-for-review'
      }
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
      <div className="main-menu">
        <Menu items={ this.menuItems } />
      </div>
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

MainMenu = withNamespaces()(MainMenu);

export default connect(
  mapStateToProps,
)(MainMenu);
