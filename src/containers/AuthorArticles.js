import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Menu from '~/components/Menu/Menu';
import AuthorArticleList from '~/components/AuthorArticleList/AuthorArticleList';
import AuthorArticleFilter from '~/components/AuthorArticleFilter/AuthorArticleFilter';

import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class AuthorArticles extends Component {
  componentDidMount() {
    this.handleArticlesInitialRequest();
  }

  componentDidUpdate() {
    this.handleArticlesInitialRequest();
  }

  handleArticlesInitialRequest = () => {
    const { needArticles } = this.props;
    if (needArticles) {
      this.handleArticlesRequest();
    }
  };

  handleArticlesRequest = (params={}) => {
    const { articlesParams, fetchArticles } = this.props;
    fetchArticles({ ...articlesParams, ...params });
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
      <Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>
          <AuthorArticleFilter onFilterChange={ this.handleArticlesRequest } />
          <AuthorArticleList onUpdateRequest={ this.handleArticlesRequest } />
        </article>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { articles, sites } = state;
  return {
    needArticles: !articles.isPending && !articles.isFulfilled && sites.isFulfilled,
    articlesParams: getArticlesParams(state)
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorArticles);
