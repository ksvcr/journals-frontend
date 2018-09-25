import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Menu from '~/components/Menu/Menu';
import AuthorArticleList from '~/components/AuthorArticleList/AuthorArticleList';
import AuthorArticleFilter from '~/components/AuthorArticleFilter/AuthorArticleFilter';

import * as articlesActions from '~/store/articles/actions';
import * as sitesActions from '~/store/sites/actions';

class AuthorArticles extends Component {
  componentDidUpdate() {
    const { isNeedArticles, fetchArticles } = this.props;
    if (isNeedArticles) {
      fetchArticles();
    }
  }

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
    const { fetchArticles } = this.props;
    return (
      <Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>
          <AuthorArticleFilter onFilterChange={ fetchArticles } />
          <AuthorArticleList onUpdateRequest={ fetchArticles } />
        </article>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { articles, sites } = state;
  return {
    isNeedArticles: !articles.isPending && !articles.isFulfilled && sites.isFulfilled
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles,
  setCurrentSite: sitesActions.setCurrent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorArticles);
