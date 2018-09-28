import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Menu from '~/components/Menu/Menu';
import AuthorArticleList from '~/components/AuthorArticleList/AuthorArticleList';
import AuthorArticleFilter from '~/components/AuthorArticleFilter/AuthorArticleFilter';

import * as articlesActions from '~/store/articles/actions';
import * as sitesActions from '~/store/sites/actions';
import { getArticlesParams } from '~/store/articles/selector';
import { getSitesArray } from '~/store/sites/selector';

class AuthorArticles extends Component {
  componentDidUpdate() {
    const { needArticles } = this.props;
    if (needArticles && this.defaultSite) {
      this.handleArticlesRequest(this.defaultSite);
    }
  }

  handleArticlesRequest = (siteId, params={}) => {
    const { articlesParams, fetchArticles } = this.props;
    fetchArticles(siteId, { ...articlesParams, ...params });
  };

  get defaultSite() {
    const { sitesArray } = this.props;
    return sitesArray[0] ? sitesArray[0].id : null;
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
    const { sitesArray } = this.props;

    return (
      <Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>
          <AuthorArticleFilter defaultSite={ this.defaultSite } sitesArray={ sitesArray }
                               onFilterChange={ this.handleArticlesRequest } />
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
    sitesArray: getSitesArray(state),
    articlesParams: getArticlesParams(state)
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
