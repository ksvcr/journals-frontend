import React, { Component, Fragment } from 'react';
import Menu from '~/components/Menu/Menu';

class ArticlePublish extends Component {
  get menuItems() {
    return [
      {
        title: 'Мои статью',
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

  render() {
    return (
      <Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <h1 className="page__title">Опубликовать статью</h1>
        </article>
      </Fragment>
    );
  }
}

export default ArticlePublish;
