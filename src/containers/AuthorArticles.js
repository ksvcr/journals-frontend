import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import AuthorArticleList from '~/components/AuthorArticleList/AuthorArticleList';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import SearchPanel from '~/components/SearchPanel/SearchPanel';

import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class AuthorArticles extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params={}) => {
    const { siteId, articlesParams, userId, fetchArticles } = this.props;
    return fetchArticles(siteId, { ...articlesParams, ...params, author: userId });
  };

  get searchTargets() {
    const { t } = this.props;
    return [
      {
        value: "title",
        title: t('search_in_titles')
      }
    ];
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">
          { t('my_articles') }
        </h1>

        <div className="page__tools">
          <form className="form">
            <div className="form__field">
              <label htmlFor="sites-list" className="form__label">
                { t('for_journals') }
              </label>
              <SiteSelect id="sites-list" onChange={ this.handleRequest } />
            </div>
            <div className="form__field">
              <label className="form__label">
                { t('article_search') }
              </label>
              <SearchPanel targets={ this.searchTargets } onChange={ this.handleRequest } />
            </div>
          </form>
        </div>

        <AuthorArticleList onUpdateRequest={ this.handleRequest } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { sites, user } = state;
  return {
    userId: user.data.id,
    siteId: sites.current,
    articlesParams: getArticlesParams(state)
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles
};

AuthorArticles = withNamespaces()(AuthorArticles);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorArticles);
