import React, { Component } from 'react';
import { connect } from 'react-redux';

import Menu from '~/components/Menu/Menu';
import AuthorArticleList from '~/components/AuthorArticleList/AuthorArticleList';

import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class RedactorArticles extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params={}) => {
    const { articlesParams, fetchArticles } = this.props;
    return fetchArticles(null, { ...articlesParams, ...params });
  };

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

  render() {
    return (
      <React.Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>

        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>
          <AuthorArticleList onUpdateRequest={ this.handleRequest } />
        </article>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    articlesParams: getArticlesParams(state)
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorArticles);
