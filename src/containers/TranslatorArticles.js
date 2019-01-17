import React, { Component } from 'react';
import { connect } from 'react-redux';

import TranslatorArticleList from '~/components/TranslatorArticleList/TranslatorArticleList';
import * as articlesActions from '~/store/articles/actions';
import { getArticlesParams } from '~/store/articles/selector';

class TranslatorArticles extends Component {
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
    return fetchArticles(null, { state_article: 'AWAIT_TRANSLATE', ...articlesParams, ...params });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="page__title">Статьи в работе</h1>
        <TranslatorArticleList onUpdateRequest={ this.handleRequest } />
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
)(TranslatorArticles);
