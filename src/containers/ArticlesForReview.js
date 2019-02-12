import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withNamespaces} from 'react-i18next';

import ArticlesForReviewList from '~/components/ArticlesForReviewList/ArticlesForReviewList';
import SiteSelect from '~/components/SiteSelect/SiteSelect';
import SearchPanel from '~/components/SearchPanel/SearchPanel';

import * as articlesActions from '~/store/articles/actions';
import * as reviewInvitesActions from '~/store/reviewInvites/actions';
import { getArticlesParams } from '~/store/articles/selector';

class ArticlesForReview extends Component {
  componentWillMount() {
    const { resetArticles } = this.props;
    resetArticles();
  }

  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    return Promise.all([
      this.handleRequest()
    ]);
  };

  handleRequest = (params={}) => {
    const { userId, articlesParams, fetchArticles, fetchReviewInvites } = this.props;
    return Promise.all([
      fetchArticles(null, { ...articlesParams, ...params, invited_reviewer: userId }),
      fetchReviewInvites({ reviewer: userId })
    ]);
  };

  get searchTargets() {
    const {t} = this.props;
    return [
      {
        value: 'title',
        title: t('search_in_titles')
      }
    ];
  }

  render() {
    const {t} = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">
          {t('articles_for_review')}
        </h1>

        <div className="page__tools">
          <form className="form">
            <div className="form__field">
              <label htmlFor="sites-list" className="form__label">Выбрать журнал</label>
              <SiteSelect id="sites-list" onChange={ this.handleRequest } />
            </div>
            <div className="form__field">
              <label className="form__label">
                {t('article_search')}
              </label>
              <SearchPanel targets={ this.searchTargets } onChange={ this.handleRequest } />
            </div>
          </form>
        </div>

        <ArticlesForReviewList onUpdateRequest={ this.handleRequest } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    articlesParams: getArticlesParams(state),
    userId: user.data.id
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles,
  resetArticles: articlesActions.resetArticles,
  fetchReviewInvites: reviewInvitesActions.fetchReviewInvites,
};

ArticlesForReview = withNamespaces()(ArticlesForReview);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesForReview);
