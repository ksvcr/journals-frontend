import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import Menu from '~/components/Menu/Menu';
import Button from '~/components/Button/Button';

import i18n from '~/services/i18n';

import './header-tools.scss';

class HeaderTools extends Component {
  get langLinks() {
    return [
      {
        title: 'Rus',
        handler: () => i18n.changeLanguage('ru')
      },
      {
        title: 'Eng',
        handler: () => i18n.changeLanguage('en')
      }
    ];
  };

  get journalLink() {
    const { t } = this.props;

    return [{
      title: t('our_journals'),
      href: '/journals',
      native: true
    }];
  };

  get hasPublishAccess() {
    const { userRole } = this.props;
    const roles = ['AUTHOR', 'REVIEWER'];
    return Boolean(~roles.indexOf(userRole));
  }

  render() {
    const { t } = this.props;
    return (
      <div className="header-tools">
        <div className="header-tools__item">
          <Menu items={ this.langLinks } type="horizontal" />
        </div>
        <div className="header-tools__item">
          <Menu items={ this.journalLink } type="horizontal" />
        </div>
        { this.hasPublishAccess &&
          <div className="header-tools__item header-tools__item_right">
            <Button type="link" href="/article">
              { t('publish_article') }
            </Button>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    userRole: user.data.role
  };
}

HeaderTools = withNamespaces()(HeaderTools);

export default connect(
  mapStateToProps
)(HeaderTools);
