import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleTranslateForm from '~/components/ArticleTranslateForm/ArticleTranslateForm';
import * as articlesActions from '~/store/articles/actions';

class ArticleTranslate extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = () => {
    const { articleId, push, fetchArticle } = this.props;
    const promises = [];

    if (articleId !== undefined) {
      promises.push(fetchArticle(articleId).catch(() =>{ push('/') }));
    }

    return Promise.all(promises);
  };

  handleSubmit = (formData) => {
    const { articleId, articleData, createArticleTranslation } = this.props;
    let language_code = articleData.language === 'en' ? 'ru' : 'en';
    const data = { ...formData, language_code };

    createArticleTranslation(articleId, data);
  };

  render() {
    const { articleId, isFulfilled } = this.props;

    return (
      <React.Fragment>
        <h1 className="page__title">Перевод статьи</h1>

        { isFulfilled &&
          <ArticleTranslateForm id={ articleId }
                                onSubmit={ this.handleSubmit } />
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { articles } = state;
  const { match } = props;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;

  return {
    articleId,
    articleData: articles.isFulfilled && articles.data[articleId],
    isFulfilled: articles.isFulfilled
  };
}

const mapDispatchToProps = {
  fetchArticle: articlesActions.fetchArticle,
  createArticleTranslation: articlesActions.createArticleTranslation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleTranslate);
