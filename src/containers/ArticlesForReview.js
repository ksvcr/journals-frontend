import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class ArticlesForReview extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    return Promise.all([
      this.handleRequest()
    ]);
  };

  handleRequest = (params={}) => {
    const { articlesParams, fetchArticles } = this.props;
    return fetchArticles(null, { ...articlesParams, ...params, current_reviewer: 10 });
  };

  render() {
    return (
      <article className="page__content">
        <h1 className="page__title">Статьи на рецензию</h1>
      </article>
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
)(ArticlesForReview);
