import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';
import Button from '~/components/Button/Button';

import './header-tools.scss';

class HeaderTools extends Component {
  get langLinks() {
    return [
      {
        title: 'Rus',
        href: '/rus'
      },
      {
        title: 'Eng',
        href: '/eng'
      }
    ];
  };

  get journalLink() {
    return [{
      title: 'Наши журналы',
      href: '/journals'
    }];
  };

  get hasPublishAccess() {
    const { userRole } = this.props;
    const roles = ['AUTHOR', 'REVIEWER'];
    return Boolean(~roles.indexOf(userRole));
  }

  render() {
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
              Опубликовать статью
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

export default connect(
  mapStateToProps
)(HeaderTools);
