import React, { Component } from 'react';

import Menu from '~/components/Menu/Menu';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import ArticleForm from '~/components/ArticleForm/ArticleForm';

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
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <ArticleTopTools />
          <h1 className="page__title">Опубликовать статью</h1>
          <ArticleForm />
        </article>
      </React.Fragment>
    );
  }
}

export default ArticlePublish;
