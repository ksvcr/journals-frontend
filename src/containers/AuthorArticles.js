import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import Menu from '~/components/Menu/Menu';
import AuthorArticleList from '~/components/AuthorArticleList/AuthorArticleList';
import AuthorArticleFilter from '~/components/AuthorArticleFilter/AuthorArticleFilter';

import * as articlesActions from '~/store/articles/actions';
import * as sitesActions from '~/store/sites/actions';
import {getSitesArray} from '~/store/sites/selector';

class AuthorArticles extends Component {
  componentDidMount() {
    const { fetchSites } = this.props;
    fetchSites();
  }

  componentDidUpdate() {
    const { sitesArray, isNeedArticles, fetchArticles } = this.props;
    const siteId = 1;
    if (isNeedArticles && siteId) {
      fetchArticles(siteId);
    }
  }

  handleSiteChange = (siteId) => {
    const { fetchArticles } = this.props;
    fetchArticles(siteId);
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
    const { sitesArray } = this.props;
    return (
      <Fragment>
        <aside className="page__sidebar">
          <Menu items={ this.menuItems } />
        </aside>
        <article className="page__content">
          <h1 className="page__title">Мои статьи</h1>
          <AuthorArticleFilter sitesArray={ sitesArray } onSiteChange={ this.handleSiteChange } />
          <AuthorArticleList />
        </article>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { articles } = state;
  return {
    sitesArray: getSitesArray(state),
    isNeedArticles: !articles.isPending && !articles.isFulfilled
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles,
  fetchSites: sitesActions.fetchSites
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorArticles);
