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
    const {t} = this.props;
    return [
      {
        title: t('articles_in_work'),
        href: '/'
      },
      {
        title: t('statistics'),
        href: '/stats'
      },
      ...this.defaultItems
    ];
  }

  get authorItems() {
    const {t} = this.props;
    return [
      {
        title: t('my_articles'),
        href: '/'
      },
      {
        title: t('my_discounts'),
        href: '/discounts'
      },
      ...this.defaultItems
    ];
  }

  get reviewerItems() {
    const {t} = this.props;
    return [
      ...this.authorItems,
      {
        title: t('articles_for_review'),
        href: '/articles-for-review'
      }
    ];
  }

  get redactorItems() {
    const {t} = this.props;
    return [
      {
        title: t('my_articles'),
        href: '/'
      },
      {
        title: t('users'),
        href: '/users'
      },
      ...this.defaultItems,
      {
        title: t('articles_for_review'),
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
