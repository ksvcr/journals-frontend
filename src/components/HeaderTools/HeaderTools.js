import React, { Component } from 'react';
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

  render() {
    return (
      <div className="header-tools">
        <div className="header-tools__item">
          <Menu items={ this.langLinks } type="horizontal" />
        </div>
        <div className="header-tools__item">
          <Menu items={ this.journalLink } type="horizontal" />
        </div>
        <div className="header-tools__item header-tools__item_right">
          <Button type="link" href="/publish">
            Опубликовать статью
          </Button>
        </div>
      </div>
    );
  }
}

export default HeaderTools;
