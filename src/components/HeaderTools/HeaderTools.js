import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import Button from '../Button/Button';

import './header-tools.scss';

class HeaderTools extends Component {
  get langLinks() {
    return [
      {
        title: 'Rus'
      },
      {
        title: 'Eng'
      }
    ];
  };

  get journalLink() {
    return [{
      title: 'Наши журналы'
    }];
  };

  render() {
    return (
      <div className="header-tools">
        <div className="header-tools__item">
          <Menu items={ this.langLinks } />
        </div>
        <div className="header-tools__item">
          <Menu items={ this.journalLink } />
        </div>
        <div className="header-tools__item header-tools__item_right">
          <Button type="link">
            Опубликовать статью
          </Button>
        </div>
      </div>
    );
  }
}

export default HeaderTools;
