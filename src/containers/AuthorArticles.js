import React, {Component, Fragment} from 'react';
import Menu from '~/components/Menu/Menu';
import Select from '~/components/Select/Select';

class AuthorArticles extends Component {
  get menuItems() {
    return [
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
        href: '/'
      }
    ];
  }

  get journalsOptions() {
    return [
      {
        title: 'Международный научно-исследовательский',
        value: '1'
      },
      {
        title: 'Международный научно-исследовательский',
        value: '2'
      }
    ];
  }

  render() {
    return (
      <Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>
          <Select options={ this.journalsOptions } />
        </article>
      </Fragment>
    );
  }
}

export default AuthorArticles;
